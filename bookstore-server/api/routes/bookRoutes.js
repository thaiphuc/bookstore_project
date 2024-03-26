const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

const bookController = require('../controllers/bookControllers')

const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');


// get all Book items
router.get('/', bookController.getAllBookItems);

// post a Book item
router.post('/', verifyToken, verifyAdmin, bookController.postBookItem);

// delete a Book item
router.delete('/:id',verifyToken, verifyAdmin, bookController.deleteBook);

// get a single Book item
router.get('/:id', bookController.singleBookItem);

// update a Book item
router.patch('/:id',verifyToken, verifyAdmin, bookController.updateBookItem);


// get all Book items

// router.get('/', async (req, res) => {
//     try {
//         const books = await Book.find({});
//         res.status(200).json(books);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

module.exports = router;