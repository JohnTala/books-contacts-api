const router = require('express').Router();

// Import individual route modules
const booksRoutes = require('./bookRoute');
const contactsRoutes = require('./contactRoute');
const oAuthRoutes = require('./oAuth-Route');

/**
 * #swagger.tags = ['Root']
 * #swagger.description = 'Welcome to Books & Contacts API'
 * #swagger.responses[200] = { description: 'API is running' }
 */
router.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Books & Contacts API. Use /books, /contacts, and /auth endpoints.' 
  });
});

// --------------------
// Mount individual routes with Swagger tags
// --------------------

/**
 * #swagger.tags = ['Books']
 * #swagger.description = 'Routes for managing books'
 */
router.use('/books', booksRoutes);

/**
 * #swagger.tags = ['Contacts']
 * #swagger.description = 'Routes for managing contacts'
 */
router.use('/contacts', contactsRoutes);

/**
 * #swagger.tags = ['Auth']
 * #swagger.description = 'Routes for GitHub OAuth login/logout and current user info'
 */
router.use('/auth', oAuthRoutes);

module.exports = router;
