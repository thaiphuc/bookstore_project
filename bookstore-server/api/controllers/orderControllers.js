const Order = require("../models/Orders");

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

const getAllOrders = async (req, res) => {
  const userEmail = req.query.email;

  try {
      // Nếu không có email được cung cấp, lấy tất cả các đơn hàng
      if (!userEmail) {
          const allOrders = await Order.find({});
          return res.json(allOrders);
      }

      // Ngược lại, tìm các đơn hàng theo email được cung cấp
      const orders = await Order.find({ userEmail: userEmail });
      if (orders.length === 0) {
          return res.status(404).send({ message: "No orders found for this email" });
      }
      res.json(orders);
  } catch (error) {
      res.status(500).send({ message: `Error getting orders: ${error.message}` });
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


module.exports = {
  postOrder,
  getAllOrders,
  deleteOrder
};