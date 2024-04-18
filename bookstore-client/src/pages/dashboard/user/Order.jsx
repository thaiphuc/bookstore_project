import { AuthContext } from "../../../contexts/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import React, { useState, useEffect, useContext } from 'react';
import { format } from 'date-fns';

const Order = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const axiosSecure = useAxiosSecure();
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
}, []);

  console.log(orders)
  const formatPrice = (price) => {
    return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };


  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* banner */}
      <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-28 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Theo dõi<span className="text-mainBG"> Đơn hàng</span>
            </h2>
          </div>
        </div>
      </div>

      {/* table content */}
      <div>
        {
          <div>
            <div>
              <div className="overflow-x-auto">
                <table className="table text-center">
                  {/* head */}
                  <thead className="bg-mainBG text-white rounded-sm">
                    <tr>
                      <th>#</th>
                      <th>Ngày đặt hàng</th>
                      <th>Mã vận đơn</th>
                      <th>Tổng tiền</th>
                      <th>Trạng thái</th>
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
                        <td>{item.status}</td>
                        <td>
                          <button className="btn btn-sm border-none text-orange-400 bg-transparent">
                            Contact
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {/* foot */}
                </table>
              </div>
            </div>
            <hr />
          </div>
        }
      </div>
    </div>
  );
};

export default Order;
