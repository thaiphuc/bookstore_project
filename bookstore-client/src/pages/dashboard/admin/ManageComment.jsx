import { useState, useEffect } from "react";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from 'axios'; // Import axios for API requests

const ManageComment = () => {
    const [comments, setComments] = useState([]); // State to store comments

    useEffect(() => {
        // Fetch comments from API when component mounts
        const fetchComments = async () => {
            try {
                const response = await axios.get('/cmt'); // Replace with your API endpoint
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchComments();
    }, []); // Empty dependency array ensures useEffect runs only once on mount

    const handleDeleteComment = async (commentId) => {
        try {
            // Send delete request to API
            await axios.delete(`/cmt/${commentId}`);
            // Remove deleted comment from state
            setComments(comments.filter(comment => comment._id !== commentId));
            Swal.fire({
                title: "Deleted!",
                text: "This comment has been deleted.",
                icon: "success",
            });
        } catch (error) {
            console.error('Error deleting comment:', error);
            Swal.fire({
                title: "Error",
                text: "Failed to delete comment. Please try again later.",
                icon: "error",
            });
        }
    };

    const handleViewComment = (comment) => {
        Swal.fire({
            title: "Comment Details",
            html: `
        <p><strong>Name:</strong> ${comment.name}</p>
        <p><strong>Comment:</strong> ${comment.comment}</p>
        <p><strong>Created at:</strong> ${comment.time}</p>
    `,
            confirmButtonText: "Close",
        });
    };

    return (
        <div>
            <div className="flex justify-between mx-4 my-4">
                <h2 className="text-2xl">All Comments</h2>
                <h2 className="text-2xl mr-4">Total Comments: {comments.length}</h2>
            </div>

            <div className="overflow-x-auto w-full">
                <table className="table table-zebra w-full">
                    <thead className="bg-mainBG text-white">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Comment</th>
                            <th>Time</th>
                            <th>View</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map((comment, index) => (
                            <tr key={comment._id}>
                                <th>{index + 1}</th>
                                <td>{comment.name}</td>
                                <td className="comment">{comment.comment}</td>
                                <td>{comment.time}</td>
                                <td>
                                    <button
                                        onClick={() => handleViewComment(comment)}
                                        className="btn bg-orange-500 btn-xs"
                                    >
                                        <FaEye className="text-white" />
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteComment(comment._id)}
                                        className="btn bg-red btn-xs"
                                    >
                                        <FaTrashAlt className="text-white" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageComment;
