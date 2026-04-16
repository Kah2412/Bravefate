const bookService = require('../services/bookService');

exports.fetchBooks = async (req, res) => {
  try {
    const { search, category } = req.query;
    const books = await bookService.getBooks({ search: search || '', category: category || '' });
    res.json({ books });
  } catch (error) {
    console.error('Fetch books error:', error);
    res.status(500).json({ message: 'Unable to load books' });
  }
};

exports.fetchCategories = async (req, res) => {
  try {
    const categories = bookService.getBookCategories();
    res.json({ categories });
  } catch (error) {
    console.error('Fetch categories error:', error);
    res.status(500).json({ message: 'Unable to load categories' });
  }
};
