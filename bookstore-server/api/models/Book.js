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

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;