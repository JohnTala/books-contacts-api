const { body, validationResult } = require('express-validator');

const validateBookRules= [
  body('title').notEmpty().withMessage('Title is required').isLength({ min: 2 }),
  body('author').notEmpty().withMessage('Author is required'),
  body('publishedYear').isInt({ min: 0 }).withMessage('Year must be a valid number'),
  body('genre').notEmpty().withMessage('Genre is required'),
  body('rating').notEmpty().withMessage('Rating is required').isFloat({ min: 1, max: 5 })
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
