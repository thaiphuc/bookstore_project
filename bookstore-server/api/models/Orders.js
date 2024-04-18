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
  status: {
    type: String,
    enum: ['Đã thanh toán', 'Chờ thanh toán'],
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

// // Method để cập nhật tổng giá trị đơn hàng
// orderSchema.methods.updateTotalPrice = function() {
//   this.totalPrice = this.items.reduce((total, item) => total + item.price * item.quantity, 0);
//   return this.totalPrice;
// };

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
