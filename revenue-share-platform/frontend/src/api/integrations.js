import { base44 } from './base44Client';

/**
 * Base44 Core integrations. Wrapped as thin functions so nothing is evaluated
 * at import time (the surface is resolved lazily on first call).
 */
export const Core = base44.integrations?.Core;

export const InvokeLLM = (...args) => base44.integrations.Core.InvokeLLM(...args);
export const SendEmail = (...args) => base44.integrations.Core.SendEmail(...args);
export const UploadFile = (...args) => base44.integrations.Core.UploadFile(...args);
export const GenerateImage = (...args) =>
  base44.integrations.Core.GenerateImage(...args);
export const ExtractDataFromUploadedFile = (...args) =>
  base44.integrations.Core.ExtractDataFromUploadedFile(...args);
