const express = require("express");
const router = express.Router();

const pointControllser = require("../controllers/pointControllers");
const verifyToken = require("../middlewares/verifyToken");

router.get("/",verifyToken, pointControllser.getPointUser);

router.post("/save",verifyToken, pointControllser.savePointUser);

router.post("/voucher",verifyToken, pointControllser.updateVoucher);

module.exports = router;