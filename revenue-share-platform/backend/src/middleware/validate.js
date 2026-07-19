import { body, param, validationResult } from 'express-validator';
import { PASSWORD_MIN_LENGTH } from '../utils/password.js';

export const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
      details: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

export const idParamRule = [
  param('id').isInt({ min: 1 }).withMessage('A valid numeric id is required'),
];

export const registerRules = [
  body('email').isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('password')
    .isLength({ min: PASSWORD_MIN_LENGTH })
    .withMessage(`Password must be at least ${PASSWORD_MIN_LENGTH} characters long`),
  body('fullName').trim().isLength({ min: 1, max: 255 }).withMessage('Full name is required'),
];

export const loginRules = [
  body('email').isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

export const forgotPasswordRules = [
  body('email').isEmail().withMessage('A valid email is required').normalizeEmail(),
];

export const resetPasswordRules = [
  body('token').isLength({ min: 32, max: 128 }).withMessage('A valid token is required'),
  body('password')
    .isLength({ min: PASSWORD_MIN_LENGTH })
    .withMessage(`Password must be at least ${PASSWORD_MIN_LENGTH} characters long`),
];

export const inviteRules = [
  body('email').isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('fullName').trim().isLength({ min: 1, max: 255 }).withMessage('Full name is required'),
];

export const partnerRules = [
  body('name').trim().isLength({ min: 1, max: 255 }).withMessage('Partner name is required'),
  body('email').isEmail().withMessage('A valid partner email is required').normalizeEmail(),
  body('phone').optional({ values: 'falsy' }).isLength({ max: 50 }),
  body('company').optional({ values: 'falsy' }).isLength({ max: 255 }),
  body('type').optional({ values: 'falsy' }).isLength({ max: 100 }),
];

export const partnerUpdateRules = [
  body('name').optional().trim().isLength({ min: 1, max: 255 }),
  body('email').optional().isEmail().withMessage('A valid partner email is required').normalizeEmail(),
  body('phone').optional({ values: 'falsy' }).isLength({ max: 50 }),
];

const percentageRule = (field) =>
  body(field)
    .isFloat({ min: 0, max: 100 })
    .withMessage(`${field} must be a percentage between 0 and 100`);

export const contractRules = [
  body('partnerId').isInt({ min: 1 }).withMessage('A valid partnerId is required'),
  body('title').trim().isLength({ min: 1, max: 255 }).withMessage('Contract title is required'),
  body('startDate').isISO8601().withMessage('startDate must be a valid date'),
  body('endDate').optional({ values: 'falsy' }).isISO8601().withMessage('endDate must be a valid date'),
  percentageRule('revenueSharePercentage'),
  body('minimumPayout')
    .optional({ values: 'falsy' })
    .isFloat({ min: 0 })
    .withMessage('minimumPayout must be zero or positive'),
  body('endDate').custom((endDate, { req }) => {
    if (endDate && req.body.startDate && new Date(endDate) < new Date(req.body.startDate)) {
      throw new Error('endDate must be on or after startDate');
    }
    return true;
  }),
];

export const revenueRules = [
  body('contractId').isInt({ min: 1 }).withMessage('A valid contractId is required'),
  body('periodStart').isISO8601().withMessage('periodStart must be a valid date'),
  body('periodEnd').isISO8601().withMessage('periodEnd must be a valid date'),
  body('totalRevenue').isFloat({ min: 0 }).withMessage('totalRevenue must be zero or positive'),
  body('sharePercentage')
    .optional({ values: 'null' })
    .isFloat({ min: 0, max: 100 })
    .withMessage('sharePercentage must be between 0 and 100'),
  body('shareAmount')
    .optional({ values: 'null' })
    .isFloat({ min: 0 })
    .withMessage('shareAmount must be zero or positive'),
  body('periodEnd').custom((periodEnd, { req }) => {
    if (periodEnd && req.body.periodStart && new Date(periodEnd) < new Date(req.body.periodStart)) {
      throw new Error('periodEnd must be on or after periodStart');
    }
    return true;
  }),
];

export const kpiRules = [
  body('contractId').isInt({ min: 1 }).withMessage('A valid contractId is required'),
  body('name').trim().isLength({ min: 1, max: 255 }).withMessage('KPI name is required'),
  body('targetValue').isFloat().withMessage('targetValue must be a number'),
  body('actualValue').optional({ values: 'null' }).isFloat().withMessage('actualValue must be a number'),
];

export const kpiValueRules = [
  body('value').isFloat().withMessage('value must be a number'),
];

export const legalDocumentRules = [
  body('contractId').isInt({ min: 1 }).withMessage('A valid contractId is required'),
  body('documentName')
    .customSanitizer((value, { req }) => value ?? req.body.title)
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Document name/title is required'),
  body('expiryDate').optional({ values: 'falsy' }).isISO8601().withMessage('expiryDate must be a valid date'),
];
