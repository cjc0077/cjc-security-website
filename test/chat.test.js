import test from 'node:test';
import assert from 'node:assert/strict';
import { createHandler, validateMessages } from '../api/chat.js';

function mockRes() {
  return { statusCode: 0, headers: {}, body: null,
    status(c) { this.statusCode = c; return this; },
    json(b) { this.body = b; return this; },
    setHeader(k, v) { this.headers[k.toLowerCase()] = v; } };
}
const req = (body, method = 'POST') => ({ method, body });
const user = [{ role: 'user', content: 'What services do you offer?' }];

test('rejects non-POST', async () => {
  const res = mockRes(); await createHandler()(req(null, 'GET'), res);
  assert.equal(res.statusCode, 405);
});

test('validates messages', () => {
  assert.ok(validateMessages({}).error);
  assert.ok(validateMessages({ messages: [{ role: 'system', content: 'x' }] }).error);
  assert.ok(validateMessages({ messages: [{ role: 'assistant', content: 'hi' }] }).error);
  assert.equal(validateMessages({ messages: [{ role: 'user', content: 'a'.repeat(5000) }] }).messages[0].content.length, 600);
});

test('missing key returns 503 without calling upstream', async () => {
  const res = mockRes(); await createHandler({ env: {} })(req({ messages: user }), res);
  assert.equal(res.statusCode, 503);
  assert.equal(res.body.error.code, 'not_configured');
});

test('sends system prompt + model and returns reply', async () => {
  let sent;
  const client = { chat: { completions: { create: async (p) => { sent = p;
    return { model: p.model, choices: [{ message: { content: ' Hello ' } }] }; } } } };
  const res = mockRes();
  await createHandler({ getClient: () => client, env: { PERPLEXITY_MODEL: 'perplexity/kimi-k3' } })(req({ messages: user }), res);
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { reply: 'Hello', model: 'perplexity/kimi-k3' });
  assert.equal(sent.messages[0].role, 'system');
  assert.equal(sent.model, 'perplexity/kimi-k3');
});

test('passes through 429 Retry-After', async () => {
  const err = Object.assign(new Error('busy'), { status: 429, headers: new Headers({ 'retry-after': '7' }) });
  const client = { chat: { completions: { create: async () => { throw err; } } } };
  const res = mockRes(); await createHandler({ getClient: () => client, env: {} })(req({ messages: user }), res);
  assert.equal(res.statusCode, 429);
  assert.equal(res.headers['retry-after'], '7');
});
