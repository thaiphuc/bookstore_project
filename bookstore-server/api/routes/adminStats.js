const express = require('express');
const router = express.Router();
// Import your middleware
const User = require('../models/User');
const Book = require('../models/Book');
const Payment = require('../models/Payments'); 

// middleware
const verifyToken = require('../middlewares/verifyToken')
const verifyAdmin = require('../middlewares/verifyAdmin')

router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.countDocuments();
    const bookItems = await Book.countDocuments();
    const orders = await Payment.countDocuments();

    const result = await Payment.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: '$price'
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
