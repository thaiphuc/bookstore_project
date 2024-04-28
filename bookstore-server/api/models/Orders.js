const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userEmail: {
        type: String,
        required: true
    },
  userName:{
    type: String,
    required: true
    },
  items: [
    {
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true
      },
      image: {
        type: String
      }
    }
  ],
  paymentStatus: {
    type: String,
    enum: ['Đã thanh toán', 'Chờ thanh toán'],
  },
  status: {
    type: String,
    enum: ['Chờ duyệt', 'Đã duyệt', 'Đã hủy'],
  },
  totalPrice: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});



const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
