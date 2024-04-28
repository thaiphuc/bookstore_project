import React, { useState, useEffect, useContext } from 'react';
import { format } from 'date-fns';
import { FaEye } from "react-icons/fa";
import { AuthContext } from "../../../contexts/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2';

const Order = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderProducts, setOrderProducts] = useState([]);
  const axiosSecure = useAxiosSecure();

  const cancelOrder = async (order) => {
    Swal.fire({
      title: 'Bạn có muốn hủy đơn hàng không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        if (order.status === "Đã duyệt")
        {
          Swal.fire({
            title: "Hủy đơn",
            text: "Đơn đã được duyệt không thể hủy đơn hàng!!!",
            icon: "error",
          });
        }
        if (order.status === "Đã hủy")
        {
          Swal.fire({
            title: "Hủy đơn",
            text: "Đơn đã được hủy trước đó!!!",
            icon: "error",
          });
        }
        if (order.status === "Chờ duyệt")
        {
          updateStatus(order._id);
        }
      }
    });
  };

  const updateStatus = async (id) => {
    const status = { status: "Đã hủy" };
    try{
      const response = await axiosSecure.patch(`/orders/${id}`, status);
      if (response.status === 200){
        Swal.fire({
          title: "Hủy đơn",
          text: "Đã hủy đơn hàng!",
          icon: "success",
        });
        fetchData();
      }
    }
    catch {}   
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get(`orders?email=${user.email}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchData();
  },);

  const formatPrice = (price) => {
    return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const showOrderInfo = async (order) => {
    setSelectedOrder(order);
    setOrderProducts(order.items);

  };

  const hideOrderInfo = () => {
    setSelectedOrder(null);
    setOrderProducts([]);
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* Banner */}
      <div className="bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-28 flex flex-col items-center justify-center">
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Theo dõi<span className="text-mainBG"> Đơn hàng</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Table content */}
      <div>
        <div className="overflow-x-auto">
          <table className="table text-center">
            {/* Head */}
            <thead className="bg-mainBG text-white rounded-sm">
              <tr>
                <th>#</th>
                <th>Ngày đặt hàng</th>
                <th>Mã vận đơn</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Thanh toán</th>
                <th>Xem</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{format(new Date(item.createdAt), 'PPpp')}</td>
                  <td className="font-medium">{item._id}</td>
                  <td>{formatPrice(item.totalPrice)}đ</td>
                  <td className="font-medium">{item.status}</td>
                  <td className="font-medium">{item.paymentStatus}</td>
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
                      className='text-red hover:text-gray-500 font-medium' 
                      onClick={() => cancelOrder(item)}>
                      Hủy đơn hàng
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
        <div className="fixed top-12 left-0  w-full h-full  flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg" style={{
            border: '1px solid #f2f2f2', /* Màu và độ dày của viền */
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', /* Độ đổ bóng và màu của box-shadow */
          }}>
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
                        <td >{product.quantity}</td>
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
    </div>
  );
};

export default Order;
