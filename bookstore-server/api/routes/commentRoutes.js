const express = require("express");
const Comment = require("../models/Comment");
const router = express.Router();

const commentController = require("../controllers/commentControllers");

const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

// get all Comment items
router.get("/", commentController.getAllComments);
// delete a Comment item
router.delete("/:id", verifyToken, verifyAdmin, commentController.deleteComment);

//post cmt
router.post("/", verifyToken, commentController.postComment);


module.exports = router;
