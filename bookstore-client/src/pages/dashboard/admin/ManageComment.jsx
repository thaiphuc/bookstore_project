import { useState, useEffect } from "react";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { format } from 'date-fns';

const ManageComment = () => {
    const [comments, setComments] = useState([]);
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
    const shortComment = (comment, maxWords) => {
        if (!comment || comment.length === 0) {
            return "Không có bình luận";
        }
        if (comment.length > maxWords) {
            const spaceIndex = comment.indexOf(' ', maxWords);
            const shortenedComment = comment.substring(15, spaceIndex);
            return `${shortenedComment}...`;
        }
        return comment;
    };

    const handleDeleteComment = async (commentId) => {
        Swal.fire({
            title: "Bạn muốn xóa?",
            text: "Bạn sẽ không thể hoàn tác",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Vâng, tôi đồng ý!",
            cancelButtonText: "Hủy"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/cmt/${commentId}`);
                    setComments(comments.filter(comment => comment._id !== commentId));
                    Swal.fire({
                        title: "Xóa Bình luận!",
                        text: "Đã xóa bình luận thành công!",
                        icon: "success",
                    });
                } catch (error) {
                    console.error('Error deleting comment:', error);
                    Swal.fire({
                        title: "Lỗi",
                        text: "Không thể xóa! Hãy thử lại.",
                        icon: "error",
                    });
                }
            } else {
                Swal.close();
            }
        });
    };


    const handleViewComment = (comment) => {
        const formattedDate = format(new Date(comment.createdAt), 'PPpp'); 
        Swal.fire({
            title: "Chi tiết bình luận",
            html: `
            <div style="text-align: left;">
                <p><strong>Tên người dùng:</strong> ${comment.username}</p>
                <p><strong>Bình luận:</strong> ${comment.comment}</p>
                <p><strong>Thời gian tạo:</strong> ${formattedDate}</p>
            </div>
    `,
            confirmButtonText: "Đóng",
        });
    };

    return (
        <div>
            <div className="flex  justify-between mx-4 my-4">
                <h2 className="text-2xl font-semibold">Quản lý <span className="text-mainBG">Bình luận!</span></h2>
                <h2 className="text-2xl mr-4">Số lượt bình luận: {comments.length}</h2>
            </div>

            <div className="overflow-x-auto  w-full">
                <table className="table table-zebra w-full">
                    <thead className="bg-mainBG text-white">
                        <tr>
                            <th>#</th>
                            <th>Tên người dùng</th>
                            <th>Bình luận</th>
                            <th>Thời gian tạo</th>
                            <th>Xem</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map((comment, index) => (
                            <tr key={comment._id}>
                                <th>{index + 1}</th>
                                <td>{comment.username}</td>
                                <td className="comment">{shortComment(comment.comment, 40)}</td>
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
