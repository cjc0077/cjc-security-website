// Perplexity Orchestrator API client (OpenAI-compatible Chat Completions).
// Docs: https://docs.perplexity.ai/docs/orchestrator/quickstart.md
import OpenAI from 'openai';

export const ORCHESTRATOR_BASE_URL = 'https://api.perplexity.ai/orchestrator/v1';

// Default model comes from the published Orchestrator catalog. Confirm it is in
// your key's catalog with `npm run models`, and override with PERPLEXITY_MODEL.
export const DEFAULT_MODEL = 'perplexity/glm-5.3-flash';

export function resolveModel(env = process.env) {
  return (env.PERPLEXITY_MODEL || DEFAULT_MODEL).trim();
}

export function createClient(env = process.env) {
  const apiKey = env.PERPLEXITY_API_KEY;
  if (!apiKey) {
    const err = new Error('PERPLEXITY_API_KEY is not set');
    err.status = 500;
    err.code = 'missing_api_key';
    throw err;
  }
  // maxRetries: 0 — the Orchestrator already fails over between deployments;
  // we surface 429 + Retry-After to the caller instead of retrying blindly.
  return new OpenAI({ apiKey, baseURL: ORCHESTRATOR_BASE_URL, maxRetries: 0, timeout: 30_000 });
}
