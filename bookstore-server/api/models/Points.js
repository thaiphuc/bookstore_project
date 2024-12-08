const mongoose = require('mongoose');
const { Schema } = mongoose;

const pointSchema = new Schema({
  userEmail: {
    type: String,
    required: true
  },
  point: {
    type: Number,
    default: 0,
    required: true
  },
  voucher: {
    type: [String]
  },
});

const Point = mongoose.model('Point', pointSchema);

module.exports = Point;
