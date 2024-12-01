import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaArrowCircleRight, FaArrowLeft, FaArrowRight, FaEdit, FaTrashAlt, FaUsers} from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import Swal from "sweetalert2";
import { format } from 'date-fns';
import { FaEye } from "react-icons/fa";
import useBook from "../../../hooks/useBook";
import { FaCheck } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

const ManageOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderProducts, setOrderProducts] = useState([]);
  const [bookList, , refetchBook] = useBook();

  const fetchData = async () => {
    try {
        const response = await axiosSecure.get(`orders`);
        setOrders(response.data);
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
  };
  useEffect(() => {
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

  const notifyShip  = async (email) => {
    try {
        console.log(email);
        const response = await axiosSecure.post('/noti/aprove',{ userEmail: email});
        if (response.status === 201) {

        }
      } catch (error) {
        console.error(error);
      }
  }
  const notifyCancel  = async (email) => {
    try {
        console.log(email);
        const response = await axiosSecure.post('/noti/cancel',{ userEmail: email});
        if (response.status === 201) {

        }
      } catch (error) {
        console.error(error);
      }
  }
  
  const handelPayment = async (orderId) => {
    Swal.fire({
      title: 'Bạn xác nhận cập nhật trạng thái thanh toán?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        updatePaymentStatus(orderId);
      }
    });
  };
  const updatePaymentStatus= async (orderId) => {
    const paymentStatus = { paymentStatus: "Đã thanh toán" };
    try{
      const response = await axiosSecure.patch(`orders/${orderId}`, paymentStatus);
      if (response.status === 200){
        Swal.fire({
          title: "Cập nhật trạng thái thanh toán.",
          text: "Cập nhật thành công.",
          icon: "success",
        });
        fetchData();
      }
    }
    catch {
      Swal.fire({
        title: "Cập nhật trạng thái thanh toán",
        text: "Lỗi cập nhật!!!",
        icon: "error",
      });
    }   
  }
  const handelApprove = async (order) => {
    Swal.fire({
      title: 'Bạn xác nhận cập nhật trạng thái đơn hàng?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        
        for (const item of order.items) {
          const product = bookList.find(book => book._id === item.id);
          if (item.quantity > product.quantity)
          {
            Swal.fire({
              title: "Cập nhật trạng thái đơn hàng",
              text: `Duyệt đơn thất bại do không đủ số lượng sách. Sách "${product.name}" chỉ còn "${product.quantity} quyển".`,
              icon: "error",
            });
            return;
          }
          else {
            approveOrder(order._id); 
            notifyShip(order.userEmail);
            refetchBook();
          }
        }
      }
    });
  };
  
  const updateBookQuantity = async (orderId) => {
    try {
        await axiosSecure.patch(`orders/quantity/${orderId}`);
        refetchBook();
    }
    catch {
      console.error("Failed to update quantity");
    }
  }
  const approveOrder = async (orderId) => {
    const status = { status: "Đã duyệt" };
    try{
      const response = await axiosSecure.patch(`orders/${orderId}`, status);
      if (response.status === 200){
        Swal.fire({
          title: "Cập nhật trạng thái đơn hàng",
          text: "Đã duyệt đơn hàng.",
          icon: "success",
        });
        fetchData();
        updateBookQuantity(orderId);
        await refetchBook();
      }
    }
    catch {
      Swal.fire({
        title: "Cập nhật trạng thái đơn hàng",
        text: "Lỗi cập nhật!!!",
        icon: "error",
      });
    }
  }


  
  const handelCancel = async (order) => {
    Swal.fire({
      title: 'Bạn xác nhận cập nhật trạng thái thanh toán?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        cancelOrder(order);
      }
    });
  };
  const cancelOrder = async (order) => {
    const status = { status: "Đã hủy" };
    try{
      const response = await axiosSecure.patch(`orders/${order._id}`, status);
      if (response.status === 200){
        Swal.fire({
          title: "Cập nhật trạng thái đơn hàng",
          text: "Đã hủy đơn hàng.",
          icon: "success",
        });
        notifyCancel(order.userEmail);
        fetchData();
      }
    }
    catch {
      Swal.fire({
        title: "Cập nhật trạng thái đơn hàng",
        text: "Lỗi cập nhật!!!",
        icon: "error",
      });
    }
  }

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
          fetchData();
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
  return (
    <div className="w-full md:w-[1100px] mx-auto px-4 ">
      <div className="flex justify-between mx-4 my-4">
      <h2 className="text-2xl font-semibold my-4 ">
        Quản lý <span className="text-mainBG">Đơn hàng!
        </span>
      </h2>
        <h2 className="text-2xl flex title-status">Tổng số đơn hàng: {orders.length}</h2>
      </div>
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
                <th>Trạng thái thanh toán</th>
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
                    {item.status === "Chờ duyệt" ? (
                      <div>
                        <span
                          className="cursor-pointer mr-2 icon" // Thêm lớp 'icon' vào đây
                          onClick={() => handelApprove(item)}
                        >
                          <FaCheck style={{ color: 'green' }} />
                        </span>
                        <span
                          className="cursor-pointer icon" // Thêm lớp 'icon' vào đây
                          onClick={() => handelCancel(item)}
                        >
                          <MdCancel style={{ color: 'red' }} />
                        </span>
                      </div>
                    ) : (
                      item.status
                    )}
                  </td>
                  <td className="text-center">
                    {item.paymentStatus === "Chờ thanh toán" ? (
                      <span
                        className="text-primary cursor-pointer"
                        onClick={() => handelPayment(item._id)}
                      >
                        Chờ thanh toán
                      </span>
                    ) : (
                      item.paymentStatus
                    )}
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
        <div className=" fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg ">
            <h2 className="text-xl font-bold mb-4 text-center">Thông tin đơn hàng</h2>
            <p><strong>Ngày đặt hàng:</strong> {format(new Date(selectedOrder.createdAt), 'PPpp')}</p>
            <p><strong>Mã vận đơn:</strong> {selectedOrder._id}</p>
            <p><strong>Tổng tiền:</strong> {formatPrice(selectedOrder.totalPrice)}đ</p>
            <p ><strong>Trạng thái:</strong> {selectedOrder.status}</p>
            <p ><strong>Thanh toán:</strong> {selectedOrder.paymentStatus}</p>
            <h3 className="text-lg font-bold my-4">Chi tiết đơn hàng:</h3>
            <div className="overflow-x-auto max-h-72">
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
                        <td><img src={product.image} alt={product.name} className="h-16 w-12 rounded-lg" /></td>
                        <td>{product.name}</td>
                        <td className="order-quantity">{product.quantity}</td>
                        <td>{formatPrice(product.price)}đ</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center">
              <button className="btn w-40 bg-orange-500 text-white mt-4" onClick={hideOrderInfo}>
                Đóng
              </button>
            </div>
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

export default ManageOrders;