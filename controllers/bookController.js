const Book = require('../models/Book');

// GET all books
// #swagger.tags = ['Books']
const getAll = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// GET single book
// #swagger.tags = ['Books']
const getSingle = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// POST new book
// #swagger.tags = ['Books']
// #swagger.parameters['book'] = { in: 'body', description: 'Book info', required: true, schema: { $ref: '#/definitions/Book' } }
const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message || 'Invalid data' });
  }
};

// PUT update book
// #swagger.tags = ['Books']
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message || 'Invalid data' });
  }
};

// DELETE book
// #swagger.tags = ['Books']
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = { getAll, getSingle, createBook, updateBook, deleteBook };
