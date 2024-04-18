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

  // Kiểm tra xem email có được cung cấp không
  if (!userEmail) {
    return res.status(400).send({ message: "Email parameter is required" });
  }

  try {
      // Giả định rằng trường trong database là userEmail, không phải email
      const orders = await Order.find({ userEmail: userEmail });
      if (orders.length === 0) {
          return res.status(404).send({ message: "No orders found for this email" });
      }
      res.json(orders);
  } catch (error) {
      res.status(500).send({ message: `Error getting orders: ${error.message}` });
  }
};


module.exports = {
  postOrder,
  getAllOrders
};