const User = require("../models/User");

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// post a new user
const createUser = async (req, res) => {
  const user = req.body;
  const query = { email: user.email };
  try {
    const existingUser = await User.findOne(query);
    // console.log(existingUser)
    if (existingUser) {
      return res.status(302).json({ message: "User already exists" });
    }

    const result = await User.create(user);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete user
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    // console.log(deletedUser);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get admin
const getAdmin = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  try {
    const user = await User.findOne(query);

    if (email !== req.decoded.email) {
        return res.status(403).send({ message: 'forbidden access' })
    }

    let admin = false;

    if (user) {
      admin = user?.role === "admin";
    }

    res.status(200).json({admin});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//make admin of a user

const makeAdmin = async (req, res) => {
    const userId = req.params.id;
    const { name, email, photoURL, role } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {role: 'admin'},
            { new: true, runValidators: true }
        );

        // console.log(updatedUser)

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
  const userEmail = req.params.id;
  const updateData = req.body; // Dữ liệu cần cập nhật

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail }, 
      updateData,
      { new: true, runValidators: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  // Lấy email từ query string
  const userEmail = req.query.email;

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found with the provided email.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: `Error fetching user data: ${error.message}` });
  }
};

const Wishlist = async (req, res) => {
  const userEmail = req.query.email;
  const { bookId } = req.body;

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found with the provided email.' });
    }

    const index = user.wishlist.indexOf(bookId);

    if (index !== -1) {
      // Nếu sách đã tồn tại trong wishlist, xóa nó
      user.wishlist.splice(index, 1);
      await user.save();
      res.status(200).json({ message: 'Book removed from wishlist successfully.', user }); 
    } else {
      // Nếu sách không tồn tại trong wishlist, thêm nó vào
      user.wishlist.push(bookId);
      await user.save();
      res.status(201).json({ message: 'Book added to wishlist successfully.', user }); 
    }
  } catch (error) {
    res.status(500).json({ message: `Error updating user data: ${error.message}` });
  }
};

const getWishlistBooks = async (req, res) => { 
  const email  = req.query.email;
  try {
    const user = await User.findOne({ email: email }).populate('wishlist');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const wishlistBooks = user.wishlist;

    res.status(200).json(wishlistBooks);
  } catch (error) {
    console.error('Error fetching wishlist books:', error);
    res.status(500).json({ message: `Error fetching wishlist books: ${error.message}` });
  }
};






module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  getAdmin,
  makeAdmin,
  updateUser,
  getUser,
  Wishlist,
  getWishlistBooks
};
