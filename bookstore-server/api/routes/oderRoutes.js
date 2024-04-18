const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderControllers");

const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");


router.post("/", verifyToken, orderController.postOrder);

router.get("/", verifyToken, orderController.getAllOrders);

router.delete("/:id", verifyToken, verifyAdmin, orderController.deleteOrder);

module.exports = router;
