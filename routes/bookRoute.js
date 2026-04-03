const router = require('express').Router();
const bookController = require('../controllers/bookController');
const { validateBookRules, validateBook } = require('../middleware/validateBooks');
const isAuthenticated = require('../middleware/isAuthenticated'); 

// --------------------
// Routes with Swagger comments
// --------------------

// GET all books
/**
 * #swagger.tags = ['Books']
 * #swagger.path = '/books'
 * #swagger.method = 'get'
 */
router.get('/', bookController.getAll);

// GET single book
/**
 * #swagger.tags = ['Books']
 * #swagger.path = '/books/{id}'
 * #swagger.method = 'get'
 */
router.get('/:id', bookController.getSingle);

// POST new book (protected route)
/**
 * #swagger.tags = ['Books']
 * #swagger.path = '/books'
 * #swagger.method = 'post'
 * #swagger.parameters['book'] = { in: 'body', description: 'Book info', required: true, schema: { $ref: '#/definitions/Book' } }
 */
router.post('/', isAuthenticated, validateBookRules, validateBook, bookController.createBook);

// PUT update book (protected route)
/**
 * #swagger.tags = ['Books']
 * #swagger.path = '/books/{id}'
 * #swagger.method = 'put'
 * #swagger.parameters['book'] = { in: 'body', description: 'Updated book info', required: true, schema: { $ref: '#/definitions/Book' } }
 */
router.put('/:id', isAuthenticated, validateBookRules, validateBook, bookController.updateBook);

// DELETE book (protected route)
/**
 * #swagger.tags = ['Books']
 * #swagger.path = '/books/{id}'
 * #swagger.method = 'delete'
 */
router.delete('/:id', isAuthenticated, bookController.deleteBook);

module.exports = router;
