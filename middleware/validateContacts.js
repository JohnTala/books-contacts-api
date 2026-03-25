const { body, validationResult } = require('express-validator');

const validateContactRules = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required'),
  body('email')
    .isEmail()
    .withMessage('Valid email is required'),
  body('favoriteColor')
    .trim()
    .notEmpty()
    .withMessage('Favorite color is required'),
  body('birthday')
    .isISO8601()
    .toDate()
    .withMessage('Birthday must be a valid date'),
];

const validateContact = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

module.exports = { validateContactRules, validateContact };
