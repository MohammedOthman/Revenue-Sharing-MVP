import { body, validationResult } from 'express-validator';

/**
 * Centralized request-schema validation for write endpoints (roadmap Phase 2).
 * Rules mirror the OpenAPI contract's required fields; optional fields stay
 * optional so valid client payloads are never rejected. Runs after auth and
 * before the controller, so invalid requests never reach the database.
 */
export const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

// --- Auth ---
export const registerRules = [
  body('email').isEmail().withMessage('A valid email is required'),
  body('password').isString().isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
];

export const loginRules = [
  body('email').isEmail().withMessage('A valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// --- Partners ---
export const partnerCreateRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('A valid email is required'),
];

export const partnerUpdateRules = [
  body('email').optional().isEmail().withMessage('A valid email is required'),
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
];

// --- Contracts ---
export const contractCreateRules = [
  body('partnerId').notEmpty().withMessage('Partner is required'),
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('startDate').notEmpty().withMessage('Start date is required'),
  body('revenueSharePercentage').isFloat({ min: 0, max: 100 }).withMessage('Revenue share must be 0–100'),
];

export const contractUpdateRules = [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('revenueSharePercentage').optional().isFloat({ min: 0, max: 100 }).withMessage('Revenue share must be 0–100'),
];

// --- Revenue shares ---
export const revenueCreateRules = [
  body('contractId').notEmpty().withMessage('Contract is required'),
  body('periodStart').notEmpty().withMessage('Period start is required'),
  body('periodEnd').notEmpty().withMessage('Period end is required'),
  body('totalRevenue').isFloat({ min: 0 }).withMessage('Total revenue must be a non-negative number'),
  body('sharePercentage').isFloat({ min: 0, max: 100 }).withMessage('Share percentage must be 0–100'),
  // shareAmount is derived server-side (FR-12) and intentionally not required.
];

// --- KPIs ---
export const kpiCreateRules = [
  body('contractId').notEmpty().withMessage('Contract is required'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('targetValue').isFloat().withMessage('Target value must be a number'),
];

// --- Legal documents ---
export const documentCreateRules = [
  body('contractId').notEmpty().withMessage('Contract is required'),
  body('documentType').trim().notEmpty().withMessage('Document type is required'),
  body('documentName').trim().notEmpty().withMessage('Document name is required'),
];

// --- Amendments ---
export const amendmentCreateRules = [
  body('contractId').notEmpty().withMessage('Contract is required'),
];
