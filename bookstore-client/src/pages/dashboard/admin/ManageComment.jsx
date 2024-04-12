import { useState, useEffect } from "react";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { format } from 'date-fns';

const ManageComment = () => {
    const [comments, setComments] = useState([]); // State to store comments
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axiosSecure.get(`cmt`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchComments();
    }, []);

    const handleDeleteComment = async (commentId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
            try {
                // Send delete request to API
                await axiosSecure.delete(`/cmt/${commentId}`);
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
          });
        
    };

    const handleViewComment = (comment) => {
        const formattedDate = format(new Date(comment.createdAt), 'PPpp'); 
        Swal.fire({
            title: "Comment Details",
            html: `
            <div style="text-align: left;">
                <p><strong>Name:</strong> ${comment.username}</p>
                <p><strong>Comment:</strong> ${comment.comment}</p>
                <p><strong>Created at:</strong> ${formattedDate}</p>
            </div>
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
                                <td>{comment.username}</td>
                                <td className="comment">{comment.comment}</td>
                                <td className="text-left">{format(new Date(comment.createdAt), 'PPpp')}</td>
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
