/**
 * Minimal RFC 4180 CSV serializer. Fields containing a comma, double quote, CR,
 * or LF are wrapped in double quotes with embedded quotes doubled; null and
 * undefined become empty. Pure and unit-testable.
 */
export const escapeCsvField = (value) => {
  if (value === null || value === undefined) return '';
  const s = String(value);
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

/**
 * Serialize rows to CSV text.
 * @param rows array of plain objects
 * @param columns array of { key, header } — header defaults to key
 */
export const toCsv = (rows, columns) => {
  const cols = columns.map((c) => (typeof c === 'string' ? { key: c, header: c } : { header: c.key, ...c }));
  const header = cols.map((c) => escapeCsvField(c.header)).join(',');
  const lines = (rows || []).map((row) => cols.map((c) => escapeCsvField(row[c.key])).join(','));
  return [header, ...lines].join('\r\n');
};
