const express = require('express');
const router = express.Router();
// Import your middleware
const User = require('../models/User');
const Book = require('../models/Book');
const Order = require('../models/Orders'); 

// middleware
const verifyToken = require('../middlewares/verifyToken')
const verifyAdmin = require('../middlewares/verifyAdmin')

router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.countDocuments();
    const bookItems = await Book.countDocuments();
    const orders = await Order.countDocuments();

    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: '$totalPrice'
          }
        }
      }
    ]);

    const revenue = result.length > 0 ? result[0].totalRevenue : 0;

    res.json({
      users,
      bookItems,
      orders,
      revenue
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



module.exports = router;
