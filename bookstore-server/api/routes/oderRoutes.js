const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderControllers");

const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");


router.post("/", verifyToken, orderController.postOrder);

router.post("/voucher", verifyToken, orderController.postVoucher);

router.get("/", verifyToken, orderController.getAllOrders);

router.get("/voucher/:code", verifyToken, orderController.getSingleVoucher);

router.get("/voucher", verifyToken, orderController.getAllVouchers);

// router.get("/:id", verifyToken, orderController.getSingleOrder);

router.delete("/:id", verifyToken, verifyAdmin, orderController.deleteOrder);

router.delete("/voucher/:code", verifyToken, orderController.deleteVoucher);

router.patch("/quantity/:id", verifyToken, orderController.updateQuantityBook);

router.patch("/:id", verifyToken, orderController.updateStatus);

router.put('/voucher/:id', verifyToken, orderController.updateVoucher);




module.exports = router;
