import React, { useState } from "react";
import useBook from "../../../hooks/useBook";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaArrowCircleRight, FaArrowLeft, FaArrowRight, FaEdit, FaTrashAlt, FaUsers } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const ManageOrders = () => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("access_token");
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/payments/all`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });
  //   console.log(book)
  const axiosSecure = useAxiosSecure();

  //   pagination
  const [currentPage, setCurrentPage] = useState(1);
  const items_Per_Page = 10;
  const indexOfLastItem = currentPage * items_Per_Page;
  const indexOfFirstItem = indexOfLastItem - items_Per_Page;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  // delete item
  const handleDeleteItem = (item) => {
    console.log(item._id)
  }

  // confirm order
  const confiremedOrder = async (item) => {
    console.log(item)
    await axiosSecure.patch(`/payments/${item._id}`)
      .then(res => {
        console.log(res.data)
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Order Confirmed Now!`,
          showConfirmButton: false,
          timer: 1500
        });
        refetch();
      })

  }

  console.log(orders)


  return (
    <div className="w-full md:w-[870px] mx-auto px-4 ">
      <h2 className="text-2xl font-semibold my-4">
        Manage All <span className="text-mainBG">Orders!</span>
      </h2>

      {/* book items table  */}
      <div>
        <div className="overflow-x-auto lg:overflow-x-visible">
          <table className="table w-full">
            {/* head */}
            <thead className="bg-mainBG text-white">
              <tr>
                <th>#</th>
                <th>Người dùng</th>
                <th>Transition Id</th>
                <th>Giá</th>
                <th>Trạng thái</th>
                <th>Xác nhận đơn hàng</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {item.email}
                  </td>
                  <td>{item.transitionId}</td>
                  <td>${item.price}</td>
                  <td>
                    {item.status}
                  </td>
                  <td className="text-center">
                    {item.status === "confirmed" ? "done" : <button
                      className="btn bg-mainBG text-white btn-xs text-center"
                      onClick={() => confiremedOrder(item)}
                    >
                      <GiConfirmed />
                    </button>}

                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteItem(item)}
                      className="btn btn-ghost btn-xs"
                    >
                      <FaTrashAlt className="text-red"></FaTrashAlt>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-sm mr-2 btn-warning"
        >
          <FaArrowLeft /> Quay lại
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastItem >= orders.length}
          className="btn btn-sm bg-mainBG text-white"
        >
          Tiếp tục  <FaArrowRight />
        </button>
      </div>
    </div>
  )
}

export default ManageOrders