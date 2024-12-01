const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationSchema = new Schema({
  userEmail: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, { timestamps: true }); 

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
