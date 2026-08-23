import { ZodError } from 'zod';

export class HttpError extends Error {
  constructor(status, code, message, details) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

export function errorHandler(error, req, res, _next) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'The submitted data is invalid.',
        details: error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      },
      requestId: req.id,
    });
  }

  if (error instanceof HttpError) {
    return res.status(error.status).json({
      error: { code: error.code, message: error.message, details: error.details },
      requestId: req.id,
    });
  }

  if (error?.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: { code: 'INVALID_JSON', message: 'The request body contains invalid JSON.' },
      requestId: req.id,
    });
  }

  req.log?.error({ err: error }, 'Unhandled request error');
  return res.status(500).json({
    error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred.' },
    requestId: req.id,
  });
}
