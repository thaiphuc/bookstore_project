const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
    bookItemId: String,
    title: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
    },
    recipe: String,
    image: String, 
    price: Number,
    quantity: Number,
    email: {
        type: String,
        trim: true,
        required: true,
    }
});

const Carts = mongoose.model('Cart', cartSchema);

module.exports = Carts;