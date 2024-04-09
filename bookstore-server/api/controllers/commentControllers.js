const Comment = require("../models/Comment");
const Book = require("../models/Book");


// delete a Comment
const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  // console.log(commentId);

  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    // console.log(deletedComment);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllComments,
  deleteComment,
};
