// all carts operations

const Carts = require("../models/Carts");

// get carts using email
const getCartByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    // console.log(email)

    // extra for JWT verification
    const decodedEmail = req.decoded.email;

    if (email !== decodedEmail) {
      res.status(403).json({ message: "Forbidden access!" });
    }

    const result = await Carts.find(query).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// post all carts
const addToCarts = async (req, res) => {
  const { name, description, image, price, email, quantity, bookItemId } =
    req.body;

  try {
    // Check if bookItemId already exists in the database
    const existingCartItem = await Carts.findOne({ email, bookItemId });
    // console.log(existingCartItem)

    if (existingCartItem) {
      // If bookItemId exists, send a message and do not create a new cart item
      return res
        .status(403)
        .json({ message: "Product already exists in the cart." });
    }

    // If bookItemId doesn't exist, create a new cart item
    const cartItem = await Carts.create({
      name,
      description,
      image,
      price,
      email,
      quantity,
      bookItemId,
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a cart
const deleteCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const deletedCart = await Carts.findByIdAndDelete(cartId);

    if (!deletedCart) {
      return res.status(404).json({ message: "Cart Items not found" });
    }

    res.status(200).json({ message: "Cart Items Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const clearCart = async (req, res) => {
  const userEmail = req.query.email;
  try {
      await Carts.deleteMany({ email: userEmail }); 
      res.status(200).send('Cart cleared successfully');
  } catch (error) {
      console.error('Failed to clear cart:', error);
      res.status(500).send('Error clearing cart');
  }
};

// update cart quantity
const updateCart = async (req, res) => {
  const cartId = req.params.id;
  const { name, description, image, price, email, quantity, bookItemId } =
    req.body;
  try {
    const updatedCart = await Carts.findByIdAndUpdate(
      cartId,
      { name, description, image, price, email, quantity, bookItemId },
      { new: true, runValidators: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart Item not found" });
    }

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get a single cart items

const getSingleCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const cartItem = await Carts.findById(cartId);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart Item not found" });
    }

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Cart Item not found" });
  }
};

module.exports = {
  getCartByEmail,
  addToCarts,
  deleteCart,
  updateCart,
  getSingleCart,
  clearCart
};
