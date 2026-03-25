const router = require('express').Router();
const bookController = require('../controllers/bookController');
const { validateBookRules, validateBook } = require('../middleware/validateBooks');

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

// POST new book
/**
 * #swagger.tags = ['Books']
 * #swagger.path = '/books'
 * #swagger.method = 'post'
 * #swagger.parameters['book'] = { in: 'body', description: 'Book info', required: true, schema: { $ref: '#/definitions/Book' } }
 */
router.post('/', validateBookRules, validateBook, bookController.createBook);

// PUT update book
/**
 * #swagger.tags = ['Books']
 * #swagger.path = '/books/{id}'
 * #swagger.method = 'put'
 * #swagger.parameters['book'] = { in: 'body', description: 'Updated book info', required: true, schema: { $ref: '#/definitions/Book' } }
 */
router.put('/:id', validateBookRules, validateBook, bookController.updateBook);

// DELETE book
/**
 * #swagger.tags = ['Books']
 * #swagger.path = '/books/{id}'
 * #swagger.method = 'delete'
 */
router.delete('/:id', bookController.deleteBook);

module.exports = router;
