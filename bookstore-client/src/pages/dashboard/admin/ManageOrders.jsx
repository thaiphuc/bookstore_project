import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaArrowCircleRight, FaArrowLeft, FaArrowRight, FaEdit, FaTrashAlt, FaUsers } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import Swal from "sweetalert2";
import { format } from 'date-fns';

const ManageOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axiosSecure.get(`orders`);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
    fetchData();
}, []);

  const handleDeleteOrder = async (orderId) => {
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
          await axiosSecure.delete(`/orders/${orderId}`);
          setOrders(orders.filter(order => order._id !== orderId));
          Swal.fire({
            title: "Deleted!",
            text: "Đã xóa đơn hàng thành công!",
            icon: "success",
          });
        } catch (error) {
          console.error('Error deleting order:', error);
          Swal.fire({
            title: "Error",
            text: "Không thể xóa! Hãy thử lại.",
            icon: "error",
          });
        }
      } else {
        Swal.close();
      }
    });
  };


  const formatPrice = (price) => {
    return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  //   pagination
  const [currentPage, setCurrentPage] = useState(1);
  const items_Per_Page = 10;
  const indexOfLastItem = currentPage * items_Per_Page;
  const indexOfFirstItem = indexOfLastItem - items_Per_Page;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
  

  console.log(currentItems);
  // delete item


  return (
    <div className="w-full md:w-[870px] mx-auto px-4 ">
      <h2 className="text-2xl font-semibold my-4">
        Quản lý <span className="text-mainBG">Đơn hàng!</span>
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
                <th>Mã vận đơn</th>
                <th>Giá</th>
                <th>Trạng thái đơn hàng</th>
                {/* <th>Xác nhận đơn hàng</th> */}
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {item.userEmail}
                  </td>
                  <td>{item._id}</td>
                  <td>{formatPrice(item.totalPrice)}đ</td>
                  <td className="text-center">
                    {item.status === "Đã thanh toán" ? "Hoàn thành" : <button
                      className="btn bg-mainBG text-white btn-xs text-center"
                      // onClick={() => confiremedOrder(item)}
                    >
                      <GiConfirmed />
                    </button>}

                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteOrder(item._id)}
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