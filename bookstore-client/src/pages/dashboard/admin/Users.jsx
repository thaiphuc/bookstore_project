import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  })

  const handleMakeAdmin = user => {
    axiosSecure.patch(`/users/admin/${user._id}`)
      .then(res => {
        console.log(res.data)
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user.name} là admin ngay bây giờ!`,
          showConfirmButton: false,
          timer: 1500
        });
        refetch();
      })
  };

  const handleDeleteUser = user => {
    Swal.fire({
      title: "Bạn muốn xóa?",
      text: "Bạn sẽ không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vâng, tôi đồng ý!",
      cancelButtonText:"Hủy"
    }).then((result) => {
      if (result.isConfirmed) {

        axiosSecure.delete(`/users/${user._id}`)
          .then(res => {
            console.log(res)
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          })
        refetch();
      }
    });
  }

  return (
    <div>
      <div className="flex justify-between mx-4 my-4">
        <h2 className="text-2xl font-semibold">Quản lý <span className="text-mainBG">Người dùng!</span></h2>
        <h2 className="text-2xl mr-4">Tổng số người dùng: {users.length}</h2>
      </div>

      {/* table */}
      <div>
        <div className="overflow-x-auto w-full">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead className="bg-mainBG text-white">
              <tr>
                <th>#</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-xs btn-circle bg-indigo-500"
                      >
                        <FaUsers className="text-white"></FaUsers>
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="btn bg-orange-500 btn-xs"
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

export default Users;
