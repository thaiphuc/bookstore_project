import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPaypal } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../hooks/ThemeContext";

const CheckoutForm = ({ price, cart }) => {
  const { isDarkMode } = useTheme();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [checkoutError, setCheckoutError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD'); // Default payment method to COD

  useEffect(() => {
    if (typeof price !== 'number' || price < 1) {
      console.error('Invalid price value. Must be a number greater than or equal to 1.');
      return;
    }
  }, [price]);

  const handleCheckout = () => {
    if (paymentMethod === 'COD') {
      handleCODCheckout();
    } else if (paymentMethod === 'card') {
      // Handle card payment
    }
  };

  const handleCODCheckout = () => {
    // Save order info to server
    const orderInfo = {
      email: user.email,
      price,
      quantity: cart.length,
      status: "order pending",
      itemsName: cart.map(item => item.name),
      cartItems: cart.map(item => item._id),
      bookItems: cart.map(item => item.bookItemId)
    };

    axiosSecure.post('/orders', orderInfo)
      .then(res => {
        console.log(res.data);
        if (res.data) {
          alert('Your order has been placed successfully!');
          navigate('/order');
        }
      })
      .catch(err => {
        console.error('Error placing order:', err);
        setCheckoutError('Error placing order. Please try again.');
      });
  };

  return (
    <div className={`max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100% ${isDarkMode ? 'dark' : ''}`}>
      <h2 className="mb-20 md:text-5xl text-center text-4xl font-bold md:leading-snug leading-snug">
        Hãy thanh toán đơn hàng  <span className="text-mainBG">tại đây!</span>
      </h2>
      <div className="flex flex-col sm:flex-row justify-start items-start gap-8">
        <div className="checkoutform md:w-1/2">
          <h4 className="text-lg font-semibold text-center ">Tóm tắt đơn hàng</h4>
          <table className="table w-full">
            <tbody>
              <tr>
                <td className="font-semibold">Thành tiền:</td>
                <td>${price}</td>
              </tr>
              <tr>
                <td className="font-semibold">Số sản phẩm:</td>
                <td>{cart.length}</td>
              </tr>
              <tr>
                <td className="font-semibold">Tên:</td>
                <td>{user?.displayName || 'Anonymous'}</td>
              </tr>
              <tr>
                <td className="font-semibold">Email:</td>
                <td>{user?.email}</td>
              </tr>
              <tr>
                <td className="font-semibold">Địa chỉ:</td>
                <td>TPHCM</td>
              </tr>
              <tr>
                <td className="font-semibold">Số điện thoại:</td>
                <td>+84-222-121-763</td>
              </tr>
            </tbody>
          </table>        </div>
        <div className={`md:w-1/3 w-full border space-y-5  card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8 ${isDarkMode ? 'dark' : ''}`}>
          <h4 className="text-lg font-semibold">Chọn phương thức thanh toán</h4>
          <div className="flex flex-col mt-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === 'COD'}
                onChange={() => setPaymentMethod('COD')}
                className="form-radio"
              />
              <span className="ml-2">COD (tiền mặt)</span>
            </label>
            <label className="inline-flex items-center mt-2">
              <input
                type="radio"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
                className="form-radio"
              />
              <span className="ml-2">Credit/Debit Card</span>
            </label>
          </div>
          <div className="mt-5 text-center">
            <hr />
            <button
              onClick={handleCheckout}
              className="btn btn-sm mt-5 bg-mainBG text-white"
            >
              Thanh toán ngay
            </button>
            {checkoutError && <p className="text-red text-xs italic">{checkoutError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
