const Comment = require("../models/Comment");


// delete a Comment
const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get cmt book
const getAllComments = async (req, res) => {
  const { bookId } = req.query; // Lấy bookId từ query parameter

    try {
        let query = {};

        if (bookId) {
            query.bookId = bookId;
        }

        const comments = await Comment.find(query);
        res.json(comments);
    } catch (error) {
        res.status(500).send({ message: `Error getting comments: ${error.message}` });
    }
};


// post a Comment item
const postComment = async (req, res) => {
  const newCmt = req.body;
  try {
    const result = await Comment.create(newCmt);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  deleteComment,
  postComment,
  getAllComments
};
