const router = require('express').Router();
const contactController = require('../controllers/contactController');
const { validateContactRules, validateContact } = require('../middleware/validateContacts');
const isAuthenticated = require('../middleware/isAuthenticated'); // <-- added authentication middleware

// --------------------
// Routes with Swagger comments
// --------------------

// GET all contacts
/**
 * #swagger.tags = ['Contacts']
 * #swagger.path = '/contacts'
 * #swagger.method = 'get'
 */
router.get('/', contactController.getAll);

// GET single contact
/**
 * #swagger.tags = ['Contacts']
 * #swagger.path = '/contacts/{id}'
 * #swagger.method = 'get'
 */
router.get('/:id', contactController.getSingle);

// POST new contact (protected route)
/**
 * #swagger.tags = ['Contacts']
 * #swagger.path = '/contacts'
 * #swagger.method = 'post'
 * #swagger.parameters['contact'] = { in: 'body', description: 'Contact info', required: true, schema: { $ref: '#/definitions/Contact' } }
 */
router.post('/', isAuthenticated, validateContactRules, validateContact, contactController.createContact);

// PUT update contact (protected route)
/**
 * #swagger.tags = ['Contacts']
 * #swagger.path = '/contacts/{id}'
 * #swagger.method = 'put'
 * #swagger.parameters['contact'] = { in: 'body', description: 'Updated contact info', required: true, schema: { $ref: '#/definitions/Contact' } }
 */
router.put('/:id', isAuthenticated, validateContactRules, validateContact, contactController.updateContact);

// DELETE contact (protected route)
/**
 * #swagger.tags = ['Contacts']
 * #swagger.path = '/contacts/{id}'
 * #swagger.method = 'delete'
 */
router.delete('/:id', isAuthenticated, contactController.deleteContact);

module.exports = router;
