import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useTheme } from "../../hooks/ThemeContext";
import { FaMoneyBillWave, FaCreditCard } from "react-icons/fa";
import Swal from "sweetalert2";
import useCart from "../../hooks/useCart";

const CheckoutPage = ({ info, totalItems, orderTotal }) => {
    const { isDarkMode } = useTheme();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [cart, refetch] = useCart();
    const [paymentMethod, setPaymentMethod] = useState('COD'); // Default payment method to COD


    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };
    const products = cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      }));
    const formatPrice = (price) => {
        return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };

    // useEffect(() => {
    //     if ( orderTotal !== 'number' || orderTotal < 1) {
    //         console.error('Invalid price value. Must be a number greater than or equal to 1.');
    //         return;
    //     }
    // }, [orderTotal]);

    const handleCheckout = async() => {
        event.preventDefault();
        if (paymentMethod === 'COD') {
            handleCODCheckout();
        } else if (paymentMethod === 'card') {
            handleCardCheckout();
        }
    };

    const clearCart = async () => {
        try {
            const response = await axiosSecure.delete(`/carts/clear?email=${info.email}`);
            if (response.status === 200) {
                refetch();
            }
        } catch (error) {
            console.error('Failed to clear cart:', error);
        }
    }

    const handleCardCheckout = async () => {
        const orderInfo = {
            userEmail: info.email,
            userName: info.name,
            items: products,
            status: "Đã thanh toán",
            totalPrice: orderTotal
        };
        try {
            const orderRes = await axiosSecure.post('/orders', orderInfo);
            if (orderRes.status === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Đặt hàng thành công!`,
                    showConfirmButton: false,
                    timer: 1500
                });
                await clearCart();  
                navigate("/order");  
            }
        } catch (error) {
            console.error('Error placing order:', error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: `Đã xảy ra lỗi khi đặt hàng. Xin thử lại sau.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    const handleCODCheckout = async () => {
        const orderInfo = {
            userEmail: info.email,
            userName: info.name,
            items: products,
            status: "Chờ thanh toán",
            totalPrice: orderTotal
        };
        try {
            const orderRes = await axiosSecure.post('/orders', orderInfo);
            if (orderRes.status === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Đặt hàng thành công!`,
                    showConfirmButton: false,
                    timer: 1500
                });
                await clearCart();  
                navigate("/order");  
            }
        } catch (error) {
            console.error('Error placing order:', error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: `Đã xảy ra lỗi khi đặt hàng. Xin thử lại sau.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    return (
        <div className="checkout">
    
            <form className="form-checkout-page" >
                <div>
                    <h2 className='mb-2 mt-4 text-lg text-black'>Thông tin khách hàng</h2>

                    <div className="card-checkout">
                        <address>
                            <span className="font-bold"> Tên: </span> {info?.name || 'Anonymous'}<br>
                           </br>
                            <span className="font-bold"> Email: </span> {info?.email}<br>
                           </br>
                            <span className="font-bold"> Di động: </span> {info?.phone}<br>
                           </br>
                            <span className="font-bold"> Địa chỉ: </span> {info?.address}
                        </address>
                    </div>
                </div> 

                <fieldset>
                    <legend className=' text-black'>Phương thức thanh toán</legend>

                    <div className="form__radios text-black">
                        <div className="form__radio">
                            <label htmlFor="cod">
                                <FaMoneyBillWave /> COD (Tiền mặt)
                            </label>
                            <input 
                                id="cod" 
                                name='payment-method' 
                                className="payment-method" 
                                type="radio" 
                                value="COD" 
                                checked={paymentMethod === 'COD'}
                                onChange={handlePaymentMethodChange} 
                            />
                        </div>

                        <div className="form__radio">
                            <label htmlFor="card">
                                <FaCreditCard /> Credit/Debit card
                            </label>
                            <input  
                                id="card" 
                                name='payment-method' 
                                className="payment-method" 
                                type="radio" 
                                value="card"
                                checked={paymentMethod === 'card'}
                                onChange={handlePaymentMethodChange}
                            />
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
                                <td align="right">{totalItems}</td>
                            </tr>
                            <tr>
                                <td>Tổng tiền</td>
                                <td align="right"> {formatPrice(orderTotal)} ₫</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr className='text-black text-lg'>
                                <td >Thành tiền</td>
                                <td align="right"> {formatPrice(orderTotal)} ₫</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div>
                    <button className="button-checkout font-bold bg-mainBG text-white" onClick={handleCheckout}>
                        Thanh toán
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;
