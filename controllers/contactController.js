const Contact = require('../models/Contact');

// GET all contacts
// #swagger.tags = ['Contacts']
const getAll = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// GET single contact
// #swagger.tags = ['Contacts']
const getSingle = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// POST new contact
// #swagger.tags = ['Contacts']
// #swagger.parameters['contact'] = { in: 'body', description: 'Contact info', required: true, schema: { $ref: '#/definitions/Contact' } }
const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message || 'Invalid data' });
  }
};

// PUT update contact
// #swagger.tags = ['Contacts']
const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message || 'Invalid data' });
  }
};

// DELETE contact
// #swagger.tags = ['Contacts']
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
