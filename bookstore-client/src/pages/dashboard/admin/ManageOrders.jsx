import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaArrowCircleRight, FaArrowLeft, FaArrowRight, FaEdit, FaTrashAlt, FaUsers } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import Swal from "sweetalert2";
import { format } from 'date-fns';
import { FaEye } from "react-icons/fa";

const ManageOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderProducts, setOrderProducts] = useState([]);

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
  const showOrderInfo = async (order) => {
    setSelectedOrder(order);
    setOrderProducts(order.items);
    
  };

  const hideOrderInfo = () => {
    setSelectedOrder(null);
    setOrderProducts([]);
  };

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
                <th>Xem</th>
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
                        className="btn bg-orange-500 btn-xs"
                        onClick={() => showOrderInfo(item)}
                      >
                        <FaEye className="text-white" />
                      </button>
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
      {/* Display order detail */}
      {selectedOrder && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Thông tin đơn hàng</h2>
            <p><strong>Ngày đặt hàng:</strong> {format(new Date(selectedOrder.createdAt), 'PPpp')}</p>
            <p><strong>Mã vận đơn:</strong> {selectedOrder._id}</p>
            <p><strong>Tổng tiền:</strong> {formatPrice(selectedOrder.totalPrice)}đ</p>
            <p ><strong>Trạng thái:</strong> {selectedOrder.status}</p>
            <h3 className="text-lg font-bold my-4">Chi tiết đơn hàng:</h3>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {orderProducts.map((product, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td><img src={product.image} alt={product.name} className="h-16 w-auto" /></td>
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>{formatPrice(product.price)}đ</td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>
            <button className="btn bg-orange-500 text-white mt-4" onClick={hideOrderInfo}>Đóng</button>
          </div>
        </div>
      )}
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