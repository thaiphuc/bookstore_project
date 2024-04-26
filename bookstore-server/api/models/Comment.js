const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  avatar: String,
  comment: {
    type: String,
    required: true,
  },
  bookId: {
    type: String,
    required: true,
  },
  parentId: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;