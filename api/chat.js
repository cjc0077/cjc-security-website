// Vercel serverless function: POST /api/chat
// Body: { messages: [{ role: 'user'|'assistant', content: string }, ...] }
// Returns: { reply: string, model: string } or { error: { code, message } }
import { createClient, resolveModel } from '../lib/orchestrator.js';
import { SYSTEM_PROMPT } from '../lib/system-prompt.js';

const MAX_TURNS = 10;
const MAX_CHARS = 600;

export function validateMessages(body) {
  const messages = body && Array.isArray(body.messages) ? body.messages : null;
  if (!messages || messages.length === 0) return { error: 'messages must be a non-empty array' };
  const cleaned = [];
  for (const m of messages.slice(-MAX_TURNS)) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant') || typeof m.content !== 'string') {
      return { error: 'each message needs role "user" or "assistant" and string content' };
    }
    const content = m.content.trim().slice(0, MAX_CHARS);
    if (content) cleaned.push({ role: m.role, content });
  }
  if (!cleaned.length || cleaned[cleaned.length - 1].role !== 'user') {
    return { error: 'the last message must be from the user' };
  }
  return { messages: cleaned };
}

function sendError(res, status, code, message, retryAfter) {
  if (retryAfter) res.setHeader('Retry-After', retryAfter);
  res.status(status).json({ error: { code, message } });
}

export function createHandler({ getClient = createClient, env = process.env } = {}) {
  return async function handler(req, res) {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return sendError(res, 405, 'method_not_allowed', 'Use POST');
    }
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch { return sendError(res, 400, 'invalid_json', 'Body must be JSON'); }
    }
    const v = validateMessages(body);
    if (v.error) return sendError(res, 400, 'invalid_request', v.error);

    let client;
    try { client = getClient(env); } catch (err) {
      console.error('[api/chat] configuration error:', err.code || err.message);
      return sendError(res, 503, 'not_configured', 'Assistant is not configured');
    }

    const model = resolveModel(env);
    try {
      const completion = await client.chat.completions.create({
        model,
        max_completion_tokens: 400,
        temperature: 0.3,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...v.messages],
      });
      const reply = completion.choices?.[0]?.message?.content?.trim();
      if (!reply) return sendError(res, 502, 'empty_reply', 'No reply from model');
      return res.status(200).json({ reply, model: completion.model });
    } catch (err) {
      const status = err?.status;
      const retryAfter = err?.headers?.get?.('retry-after') ?? err?.headers?.['retry-after'];
      // Log status/type only — never the request headers or key.
      console.error('[api/chat] orchestrator error:', status ?? 'network', err?.error?.type ?? err?.name);
      if (status === 429) return sendError(res, 429, 'rate_limited', 'Assistant is busy, try again shortly', retryAfter);
      if (status === 401) return sendError(res, 503, 'not_configured', 'Assistant is not configured');
      if (status === 400 || status === 402) return sendError(res, 503, 'model_unavailable', 'Assistant model is unavailable');
      return sendError(res, 502, 'upstream_error', 'Assistant is temporarily unavailable');
    }
  };
}

export default createHandler();
