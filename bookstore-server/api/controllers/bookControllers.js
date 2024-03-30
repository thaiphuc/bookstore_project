const Book = require("../models/Book");

// get all Book items
const getAllBookItems = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// post a Book item
const postBookItem = async (req, res) => {
  const newBook = req.body;
  try {
    const result = await Book.create(newBook);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a Book item
const deleteBook = async (req, res) => {
  const bookId = req.params.id;
  // console.log(bookId);

  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    // console.log(deletedBook);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book Item Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// find a single Book item
const singleBookItem = async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await Book.findById(bookId);
    // console.log(Book);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a Book item
const updateBookItem = async (req, res) => {
  const bookId = req.params.id;
  console.log(bookId);
  const { _id, name, description, category, author, publisher, price, quantity, publishYear ,createdAt } =
    req.body;
  // console.log(req.body)
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { name, description, category, author, publisher, price, quantity, publishYear },
      { new: true, runValidators: true }
    );

    console.log(updatedBook);

    if (!updatedBook) {
      return res.status(404).json({ message: "updated Item not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBookItems,
  postBookItem,
  deleteBook,
  singleBookItem,
  updateBookItem,
};
