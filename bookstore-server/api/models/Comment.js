const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  bookName: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;