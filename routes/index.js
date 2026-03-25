const router = require('express').Router();

// Import individual route modules
const booksRoutes = require('./books');
const contactsRoutes = require('./contacts');

// Mount the routes
router.use('/books', booksRoutes);
router.use('/contacts', contactsRoutes);

module.exports = router;
