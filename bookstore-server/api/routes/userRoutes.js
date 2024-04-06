const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

// get all users
router.get('/', verifyToken, verifyAdmin, (req, res) => {
    userController.getAllUsers(req, res)
} )

// get user
router.get('/info', verifyToken, userController.getUser)

// create a new user
router.post('/', userController.createUser )

// update a user
router.patch('/:id', verifyToken, userController.updateUser)

// delete a user
router.delete('/:id', verifyToken, verifyAdmin, userController.deleteUser)

// get admin
router.get('/admin/:email', verifyToken, userController.getAdmin)

// make admin
router.patch('/admin/:id', verifyToken, verifyAdmin, userController.makeAdmin)

// add, remove wish list
router.put('/wishlist', userController.Wishlist)

//get wish list books
router.get('/wishlist', userController.getWishlistBooks)



module.exports = router;
