import React, { useContext, useEffect, useState } from "react";
import useCart from "../../hooks/useCart";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom'
import axios from "axios";
import { useTheme } from "../../hooks/ThemeContext";
import CheckoutPage from "./CheckoutPage";

const CartPage = () => {
  const { isDarkMode } = useTheme();
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const [info, setUser] = useState();
  const [totalItems, setTotalItems] = useState(0); // State to hold total quantity of items

  useEffect(() => {
    // Calculate total items when cart items change
    let total = 0;
    cart.forEach(item => {
      total += item.quantity;
    });
    setTotalItems(total);
  }, [cart]);

  // Calculate the total price for each item in the cart
  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };

  // Handle quantity increase
  const handleIncrease = async (item) => {
    try {
      const response = await fetch(`http://localhost:5000/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: item.quantity + 1 }),
      });

      if (response.ok) {
        await refetch();
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const fetchUserInfo = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/users/info?email=${user.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const formatPrice = (price) => {
    return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Handle quantity decrease
  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      try {
        const response = await fetch(
          `http://localhost:5000/carts/${item._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: item.quantity - 1 }),
          }
        );

        if (response.ok) {
          await refetch();
        } else {
          console.error("Failed to update quantity");
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  // Calculate the cart subtotal
  let cartSubtotal = 0;
  cart.forEach(item => {
    cartSubtotal += calculateTotalPrice(item);
  });

  // Calculate the order total
  const orderTotal = cartSubtotal;

  // delete an item
  const handleDelete = (item) => {
    Swal.fire({
      title: "Bạn muốn xóa chứ?",
      text: "Bạn sẽ không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vâng , tôi đồng ý!",
      cancelButtonText: "Hủy"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/carts/${item._id}`).then(response => {
          if (response) {
            refetch();
            Swal.fire("Đã xóa!", "Sách đã xóa khỏi giỏ hàng thành công! ", "success");
          }
        })
          .catch(error => {
            console.error(error);
          });
      }
    });
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* banner */}
      <div className={`bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100% ${isDarkMode ? "dark" : ""}`}>
        <div className="py-28 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Sản phẩm đã thêm vào <span className="text-mainBG">Giỏ hàng</span>
            </h2>
          </div>
        </div>
      </div>

      {/* cart table and checkout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-4">
        <div className="md:col-span-2">
          {/* cart table */}
          {cart.length > 0 ? (
            <div className="overflow-x-auto w-full">
              <table className="table-cart w-full">
                {/* head */}
                <thead className="bg-mainBG text-white rounded-sm">
                  <tr>
                    <th>#</th>
                    <th>Hình ảnh</th>
                    <th>Tên sách</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr  key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="font-medium">{item.name}</td>
                      <td>
                        <button
                          className="btn btn-xs"
                          onClick={() => handleDecrease(item)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          readOnly // Make the input read-only
                          className={`w-10 mx-2 text-center overflow-hidden appearance-none ${isDarkMode ? "dark" : ""}`}
                        />
                        <button
                          className="btn btn-xs"
                          onClick={() => handleIncrease(item)}
                        >
                          +
                        </button>
                      </td>
                      <td>{formatPrice(calculateTotalPrice(item))} ₫</td>
                      <td >
                        <button
                          className="btn btn-sm border-none ml-4 text-red bg-transparent"
                          onClick={() => handleDelete(item)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* foot */}
              </table>
              <h2 className="mt-4 font-bold">Tổng số sản phẩm: {totalItems}</h2>
            </div>
          ) : (
            <div className="text-center mt-20">
              <p>Giỏ hàng trống. Vui lòng thêm sản phẩm.</p>
              <Link to="/book">
                <button className="btn bg-mainBG text-white mt-3">Quay về trang sản phẩm</button>
              </Link>
            </div>
          )}
        </div>
        <div className="md:col-span-1">
          {/* checkout */}
          <CheckoutPage
            info={info}
            totalItems={totalItems}
            orderTotal={orderTotal}
            cart={cart}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
