const { body, validationResult } = require('express-validator');

// Validation rules for creating/updating a Book
const validateBookRules = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 2 }).withMessage('Title must be at least 2 characters long'),

  body('author')
    .notEmpty().withMessage('Author is required')
    .isLength({ min: 2 }).withMessage('Author must be at least 2 characters long'),

  body('publishedYear')
    .notEmpty().withMessage('Published year is required')
    .isInt({ min: 0 }).withMessage('Published year must be a valid number'),

  body('genre')
    .notEmpty().withMessage('Genre is required'),

  body('pages')
    .optional()
    .isInt({ min: 1 }).withMessage('Pages must be a positive integer'),

  body('rating')
    .notEmpty().withMessage('Rating is required')
    .isFloat({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),

  body('publisher')   // <-- NEW FIELD
    .notEmpty().withMessage('Publisher is required')
    .isLength({ min: 2 }).withMessage('Publisher must be at least 2 characters long')
];

// Validation error handler
const validateBook = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

module.exports = { validateBookRules, validateBook };
