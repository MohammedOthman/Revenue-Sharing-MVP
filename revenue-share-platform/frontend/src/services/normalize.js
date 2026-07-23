/**
 * Base44 records use `id`, `created_date`, `updated_date`. Some UI written
 * against a Mongo-style shape expects `_id` / `createdAt`. Bridge both so
 * components can rely on either without per-call plumbing.
 */
export const normalizeRecord = (record) => {
  if (!record || typeof record !== 'object') return record;
  return {
    ...record,
    _id: record.id ?? record._id,
    createdAt: record.created_date ?? record.createdAt,
    updatedAt: record.updated_date ?? record.updatedAt,
  };
};

export const normalizeList = (records) =>
  Array.isArray(records) ? records.map(normalizeRecord) : [];
