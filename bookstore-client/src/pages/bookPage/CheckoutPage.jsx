import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../hooks/ThemeContext";

const CheckoutPage = ({ price, cart }) => {
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
        <div className="checkout">
    
            <form className="form-checkout-page" >
                <div>
                    <h2 className='mb-2 mt-4 text-lg text-black'>Thông tin khách hàng</h2>

                    <div className="card-checkout">
                        <address>
                            Tên: {user?.displayName || 'Anonymous'}<br>
                           </br>
                            Email: {user?.email}<br>
                           </br>
                           Số điện thoại: +84.212.123.123<br>
                           </br>
                           Địa chỉ: thu duc hcm city
                        </address>
                    </div>
                </div>

                <fieldset>
                    <legend className='text-black'>Phương thức thanh toán</legend>

                    <div className="form__radios text-black">
                        <div className="form__radio">
                            <label htmlFor="visa">
                                <svg className="icon">
                                    <use xlinkHref="#icon-visa" />
                                </svg>
                                COD (Tiền mặt)
                            </label>
                            <input checked id="visa" name='payment-method' className="payment-method" type="radio" />
                        </div>

                        <div className="form__radio">
                            <label htmlFor="paypal">
                                <svg className="icon">
                                    <use xlinkHref="#icon-paypal" />    
                                </svg>
                                Credit/Debit card
                            </label>
                            <input  id="paypal" name='payment-method' className="payment-method" type="radio" />
                        </div>     
                    </div>
                </fieldset>

                <div>
                    <h2 className='text-black'>Chi tiết đơn hàng</h2>

                    <table>
                        <tbody>
                            <tr>
                                <td>Phí vận chuyển</td>
                                <td align="right">Miễn phí</td>
                            </tr>
                            <tr>
                                <td>Số lượng sản phẩm</td>
                                <td align="right">120</td>
                            </tr>
                            <tr>
                                <td>Tổng tiền</td>
                                <td align="right">{price} ₫</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr className='text-black'>
                                <td >Thành tiền</td>
                                <td align="right">{price} ₫</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div>
                    <button className="button-checkout bg-mainBG text-white">
                        Thanh toán
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;
