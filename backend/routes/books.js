const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.get('/', bookController.fetchBooks);
router.get('/categories', bookController.fetchCategories);

module.exports = router;
