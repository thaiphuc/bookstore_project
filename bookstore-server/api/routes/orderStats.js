const express = require('express');
const router = express.Router();
// Import your middleware
const User = require('../models/User');
const Book = require('../models/Book');
const Order = require('../models/Orders'); 

// middleware
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.get('/', async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $unwind: '$items' 
      },
      {
        $group: {
          _id: '$items.name', // Nhóm sách theo tên của mỗi cuốn sách
          quantity: { $sum: '$items.quantity' }, // Tính tổng quantity cho mỗi cuốn sách
          revenue: { $sum: '$items.price' } // Tính tổng doanh thu cho mỗi cuốn sách
        }
      },
      {
        $project: {
          _id: 0,
          book: '$_id',
          quantity: '$quantity',
          revenue: '$revenue'
        }
      }
    ]);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});




// router.get('/', async (req, res) => {
//   try {
//     const result = await Order.aggregate([
//         {
//           $unwind: '$bookItems'
//         },
//         {
//           $lookup: {
//             from: 'books', // Assuming the book collection name is 'books'
//             localField: 'bookItems',
//             foreignField: '_id',
//             as: 'bookItemDetails'
//           }
//         },
//         {
//           $unwind: '$bookItemDetails'
//         },
//         {
//           $group: {
//             _id: '$bookItemDetails.category',
//             quantity: { $sum: '$quantity' },
//             revenue: { $sum: '$price' }
//           }
//         },
//         {
//           $project: {
//             _id: 0,
//             category: '$_id',
//             quantity: '$quantity',
//             revenue: '$revenue'
//           }
//         }
//       ]);

//     res.json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });




module.exports = router;
