const express = require("express");
const router = express.Router();

const notificationController = require("../controllers/notificationController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/",verifyToken, notificationController.getNotificationsByUser);

router.post("/cancel",verifyToken, notificationController.notifyOrderCanceled);

router.post("/success",verifyToken, notificationController.notifyOrderCreated);

router.post("/aprove",verifyToken, notificationController.notifyOrderShipped);

router.patch("/read",verifyToken, notificationController.updateRead);


module.exports = router;