const router = require('express').Router();
const contactController = require('../controllers/contactController');
const { validateContactRules, validateContact } = require('../middleware/validateContacts');

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

// POST new contact
/**
 * #swagger.tags = ['Contacts']
 * #swagger.path = '/contacts'
 * #swagger.method = 'post'
 * #swagger.parameters['contact'] = { in: 'body', description: 'Contact info', required: true, schema: { $ref: '#/definitions/Contact' } }
 */
router.post('/', validateContactRules, validateContact, contactController.createContact);

// PUT update contact
/**
 * #swagger.tags = ['Contacts']
 * #swagger.path = '/contacts/{id}'
 * #swagger.method = 'put'
 * #swagger.parameters['contact'] = { in: 'body', description: 'Updated contact info', required: true, schema: { $ref: '#/definitions/Contact' } }
 */
router.put('/:id', validateContactRules, validateContact, contactController.updateContact);

// DELETE contact
/**
 * #swagger.tags = ['Contacts']
 * #swagger.path = '/contacts/{id}'
 * #swagger.method = 'delete'
 */
router.delete('/:id', contactController.deleteContact);

module.exports = router;
