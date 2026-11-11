// Minimal real request. Prints only HTTP status and response shape — never the key.
import { createClient, resolveModel } from '../lib/orchestrator.js';
const client = createClient();
try {
  const { data, response } = await client.chat.completions
    .create({ model: resolveModel(), max_completion_tokens: 16, messages: [{ role: 'user', content: 'Reply with OK.' }] })
    .withResponse();
  console.log('HTTP', response.status, '| model:', data.model, '| choices:', data.choices.length,
    '| usage keys:', Object.keys(data.usage || {}).join(','));
} catch (err) {
  console.log('HTTP', err.status ?? 'network error', err.status === 429 ? `| Retry-After: ${err.headers?.get?.('retry-after')}` : '');
  process.exitCode = 1;
}
