import { useState } from "react";
import { FaEye, FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageComment = () => {
    const [users] = useState([
        { _id: 1, name: "John Doe", comment: "Đừng so sánh bản thân với người khác. Hãy so sánh bản thân ngày hôm nay với bản thân ngày hôm qua.Đừng so sánh bản thân với người khác. Hãy so sánh bản thân ngày hôm nay với bản thân ngày hôm qua.Đừng so sánh bản thân với người khác. Hãy so sánh bản thân ngày hôm nay với bản thân ngày hôm qua.", time: "01/02/2024 - 10:00 AM" },
        { _id: 2, name: "Jane Doe", comment: "Đừng so sánh bản thân với người khác. Hãy so sánh bản thân ngày hôm nay với bản thân ngày hôm qua.", time: "02/02/2024 - 11:00 AM" },
        { _id: 3, name: "Alice", comment: "Đừng so sánh bản thân với người khác. Hãy so sánh bản thân ngày hôm nay với bản thân ngày hôm qua.", time: "03/02/2024 - 12:00 PM" },
        { _id: 4, name: "phucthai", comment: "Đừng so sánh bản thân với người khác. Hãy so sánh bản thân ngày hôm nay với bản thân ngày hôm qua.", time: "05/02/2024 - 18:00 PM" },
        { _id: 5, name: "quipham", comment: "Đừng so sánh bản thân với người khác. Hãy so sánh bản thân ngày hôm nay với bản thân ngày hôm qua.", time: "06/02/2024 - 15:00 PM" },
    ]);

    const handleDeleteUser = (user) => {
        console.log(`${user.name} has been deleted.`);
        Swal.fire({
            title: "Deleted!",
            text: "This comment has been deleted.",
            icon: "success",
        });
    };

    const handleViewUser = (user) => {
        console.log(`Viewing details of ${user.name}`);
        Swal.fire({
            title: "Comment Details",
            html: `
        <p style="text-align: left;"><strong>Name:</strong> ${user.name}</p>
        <p style="text-align: left;"><strong>Comment:</strong> ${user.comment}</p>
        <p style="text-align: left;"><strong>Created at:</strong> ${user.time}</p>
    `,
            confirmButtonText: "Close",
        });

    };

    return (
        <div>
            <div className="flex justify-between mx-4 my-4">
                <h2 className="text-2xl">All Comments</h2>
                <h2 className="text-2xl">Total Comments: {users.length}</h2>
            </div>

            {/* table */}
            <div>
                <div className="overflow-x-auto w-full">
                    <table className="table table-zebra w-full">
                        {/* head */}
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
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td className="comment">
                                        {user.comment.length > 40 ? `${user.comment.substring(0, user.comment.lastIndexOf(' ', 40))}...` : user.comment}
                                    </td>
                                    <td>{user.time}</td>
                                    <td>
                                        <button
                                            onClick={() => handleViewUser(user)}
                                            className="btn bg-orange-500 btn-xs"
                                        >
                                            <FaEye className="text-white" />
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteUser(user)}
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
        </div>
    );
};

export default ManageComment;
