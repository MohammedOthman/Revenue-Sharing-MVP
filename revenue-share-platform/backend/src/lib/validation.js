import { z } from 'zod';

export const recordIdSchema = z.uuid();
export const recordVersionSchema = z.number().int().positive();

export function parseRecordId(value) {
  return recordIdSchema.parse(value);
}

export function parseOptionalRecordVersion(value) {
  return recordVersionSchema.optional().parse(value);
}
