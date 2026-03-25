const router = require('express').Router();

// Import individual route modules
const booksRoutes = require('./bookRoute');
const contactsRoutes = require('./contactRoute');

// Mount the routes
router.use('/books', booksRoutes);
router.use('/contacts', contactsRoutes);

module.exports = router;
