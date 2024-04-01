import React, { useContext, useEffect, useState } from "react";
import useCart from "../../hooks/useCart";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom'
import axios from "axios";
import { useTheme } from "../../hooks/ThemeContext";

const CartPage = () => {
  const { isDarkMode } = useTheme();
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const [info, setUser] = useState(null);
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

    const token = localStorage.getItem('access_token'); // Lấy token từ localStorage
    if (!token) {
      console.error('Token not found');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/users/info?email=${user.email}`, {
        method: 'GET', // Phương thức HTTP
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Đính kèm token vào header
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
  
  fetchUserInfo();
  

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
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/carts/${item._id}`).then(response => {
          if (response) {
            refetch();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
              Items Added to The<span className="text-mainBG"> Cart</span>
            </h2>
          </div>
        </div>
      </div>

      {/* cart table */}

      {
        (cart.length > 0) ? <div>
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead className="bg-mainBG text-white rounded-sm">
                  <tr>
                    <th>#</th>
                    <th>Book</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index}>
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
                      <td >
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
                      <td>${calculateTotalPrice(item).toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-sm border-none text-red bg-transparent"
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
            </div>
          </div>
          <hr />
          <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8">
            <div className="md:w-1/2 space-y-3">
              <h3 className="text-lg font-semibold">Customer Details</h3>
              <p>Name: {info.name || "None"}</p>
              <p>Email: {info.email}</p>
              <p>Address: {info.address}</p>
              <p>Phone number: {info.phone}</p>
            </div>
            <div className="md:w-1/2 space-y-3">
              <h3 className="text-lg font-semibold">Shopping Details</h3>
              <p>Total Items: {totalItems}</p>
              <p>
                Total Price:{" "}
                <span id="total-price">${orderTotal.toFixed(2)}</span>
              </p>
              <Link to="/process-checkout" className="btn btn-md bg-mainBG text-white px-8 py-1">
                Procceed to Checkout
              </Link>
            </div>
          </div>
        </div> : <div className="text-center mt-20">
          <p>Cart is empty. Please add products.</p>
          <Link to="/book"><button className="btn bg-mainBG text-white mt-3">Back to Book</button></Link>
        </div>
      }

    </div>
  );
};

export default CartPage;
