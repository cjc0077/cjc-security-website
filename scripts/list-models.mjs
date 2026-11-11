// Lists the model slugs your PERPLEXITY_API_KEY can use (catalog = allowlist).
import { createClient } from '../lib/orchestrator.js';
const client = createClient();
const page = await client.models.list();
for (const m of page.data) console.log(m.id);
