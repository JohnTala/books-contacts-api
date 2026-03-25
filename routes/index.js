const router = require('express').Router();

// Import individual route modules
const booksRoutes = require('./bookRoute');
const contactsRoutes = require('./contactRoute');

/**
 * #swagger.tags = ['Root']
 * #swagger.description = 'Welcome to Books API'
 * #swagger.responses[200] = { description: 'API is running' }
 */
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to Books API and Contacts API. Use /books and /contacts to get all books and contacts.' });
});
// Mount the routes
router.use('/books', booksRoutes);
router.use('/contacts', contactsRoutes);

module.exports = router;
