/**
 * Loads the OpenAPI contract (backend/openapi.yaml) so it can be served as
 * JSON and rendered as interactive docs. The YAML file is the source of truth.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { load } from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const OPENAPI_PATH = path.resolve(__dirname, '../openapi.yaml');

export const loadOpenApiSpec = () => load(fs.readFileSync(OPENAPI_PATH, 'utf8'));

// Parsed once at import; a malformed contract fails fast on startup.
export const openApiSpec = loadOpenApiSpec();
