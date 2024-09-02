const express = require('express');
const router = express.Router();
// Import your middleware
const User = require('../models/User');
const Book = require('../models/Book');
const Order = require('../models/Orders'); 

// middleware
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

// router.get('/', async (req, res) => {
//   try {
//     const result = await Order.aggregate([
//       {
//         $unwind: '$items' 
//       },
//       {
//         $group: {
//           _id: '$items.name', 
//           quantity: { $sum: '$items.quantity' }, 
//           revenue: { $sum: '$items.price' }
//         }
//       },
//       {
//         $project: {
//           _id: 0,
//           book: '$_id',
//           quantity: '$quantity',
//           revenue: '$revenue'
//         }
//       }
//     ]);

//     res.json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

router.get('/', async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const result = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          }
        }
      },
      {
        $unwind: '$items'
      },
      {
        $group: {
          _id: {
            name: '$items.name',
            day: { $dayOfMonth: '$createdAt' },
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' }
          },
          quantity: { $sum: '$items.quantity' },
          revenue: { $sum: '$items.price' }
        }
      },
      {
        $project: {
          _id: 0,
          book: '$_id.name',
          date: {
            $concat: [
              { $toString: '$_id.day' }, '/',
              { $toString: '$_id.month' }, '/',
              { $toString: '$_id.year' }
            ]
          },
          quantity: '$quantity',
          revenue: '$revenue'
        }
      },
      {
        $sort: {
          date: 1
        }
      }
    ]);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = router;
