const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String, 
    email: {
        type: String,
        trim: true,
        unique: true,
        minlength: 3,
    },
    photoURL: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    phone: String,
    address: String,
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;