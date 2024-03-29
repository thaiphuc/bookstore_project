const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
    },
    description: String,
    image: String, 
    category: {
        type: [String],
        required: true
    },
    author: {
        type: [String],
        required: true
    },
    publisher: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    publishYear: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

bookSchema.pre('save', function (next) {
    if (this.price < 0) {
      const error = new Error('Price cannot be negative.');
      return next(error);
    }
    if (this.quantity < 0) {
      const error = new Error('Quantity cannot be negative.');
      return next(error);
    }
    if (this.publishYear < 0) {
      const error = new Error('Publish year cannot be negative.');
      return next(error);
    }
    next();
  });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;