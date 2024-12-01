const Order = require("../models/Orders");
const Book = require('../models/Book');
const Voucher = require('../models/Voucher');

// post 
const postOrder = async (req, res) => {
  const newOrder = req.body;
  try {

    const result = await Order.create(newOrder);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postVoucher = async (req, res) => {
  const newPromotion = req.body;
  try {

    const result = await Voucher.create(newPromotion);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  const userEmail = req.query.email;

  try {

    if (!userEmail) {
      const allOrders = await Order.find({}).sort({ createdAt: -1 }); // Sắp xếp giảm dần
      return res.json(allOrders);
    }

    const orders = await Order.find({ userEmail: userEmail }).sort({ createdAt: -1 }); // Sắp xếp giảm dần
    if (orders.length === 0) {
      return res.status(404).send({ message: "No orders found for this email" });
    }
    res.json(orders);
  } catch (error) {
    res.status(500).send({ message: `Error getting orders: ${error.message}` });
  }
};



const getSingleVoucher = async (req, res) => {
  try {
    const voucherCode = req.params.code;
    const voucher = await Voucher.findOne({ code: voucherCode });

    if (!voucher) {
      return res.status(404).json({ message: 'Voucher không tồn tại' });
    }

    res.json(voucher);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};


const getAllVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find({});
    res.status(200).json(vouchers);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách voucher', error });
  }
};

const deleteOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVoucher = async (req, res) => {
  const voucherCode = req.params.code;
  try {
    const deleteVoucher = await Voucher.findOneAndDelete(voucherCode);

    if (!deleteVoucher) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateQuantityBook = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    for (const item of order.items) {
      const bookId = item.id;
      const quantityOrdered = item.quantity;
      const book = await Book.findById(bookId);

      if (book) {
        book.quantity -= quantityOrdered;
        await book.save();
      }
    }

    res.json({ message: 'Book quantities updated successfully' });
  } catch (error) {
    console.error('Error updating book quantities:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const updateStatus = async (req, res) => {
  const orderId = req.params.id;
  const { status, paymentStatus } = req.body;

  try {
    let updatedOrder;
    if (status || paymentStatus) {
      const updateFields = {};
      if (status) {
        updateFields.status = status;
      }
      if (paymentStatus) {
        updateFields.paymentStatus = paymentStatus;
      }

      // Tiến hành cập nhật đơn hàng trong cơ sở dữ liệu
      updatedOrder = await Order.findByIdAndUpdate(orderId, updateFields, { new: true });

      if (!updatedOrder) {
        return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
      }
    } else {
      return res.status(400).json({ message: 'Yêu cầu phải chứa ít nhất một trường để cập nhật' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVoucher = async (req, res) => {
  const voucherId = req.params.id; 
  const updatedData = req.body; 

  try {
    const updatedVoucher = await Voucher.findByIdAndUpdate(voucherId, updatedData, { new: true });

    if (!updatedVoucher) {
      return res.status(404).json({ message: 'Không tìm thấy mã giảm giá!' });
    }
    res.status(200).json(updatedVoucher);
  } catch (error) {

    res.status(500).json({ message: error.message });
  }
};




module.exports = {
  postOrder,
  postVoucher,
  getAllOrders,
  deleteOrder,
  deleteVoucher,
  updateStatus,
  getSingleVoucher,
  updateQuantityBook,
  getAllVouchers,
  updateVoucher
};