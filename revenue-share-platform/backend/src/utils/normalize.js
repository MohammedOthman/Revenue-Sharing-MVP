// Update endpoints accept both camelCase (JS clients) and snake_case
// (matching the DB columns); models whitelist snake_case keys.
export const toSnakeCaseKeys = (updates = {}) => {
  const normalized = {};
  for (const [key, value] of Object.entries(updates)) {
    const snake = key.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
    normalized[snake] = value;
  }
  return normalized;
};
