import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useTheme } from "../../hooks/ThemeContext";
import { FaMoneyBillWave, FaCreditCard } from "react-icons/fa";
import Swal from "sweetalert2";
import useCart from "../../hooks/useCart";
import { FaCheck } from "react-icons/fa";

const CheckoutPage = ({ info, totalItems, orderTotal }) => {
    const { isDarkMode } = useTheme();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [cart, refetch] = useCart();
    const [orderCost, setOrderCost] = useState(orderTotal);
    const [voucherDiscount, setVoucherDiscount] = useState(0);

    const [paymentMethod, setPaymentMethod] = useState('COD'); // Default payment method to COD
    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };
    const products = cart.map(item => ({
        id: item.bookItemId,
        name: item.name,
        quantity: item.quantity,
        price: item.price*item.quantity,
        image: item.image
      }));
      
    const formatPrice = (price) => {
        return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };

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
        if (!products || products.length === 0) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `Không có sản phẩm trong giỏ hàng`,
                showConfirmButton: false,
                timer: 1500
            }); 
        }
        else{
            const orderInfo = {
                userEmail: info.email,
                userName: info.name,
                items: products,
                paymentStatus: "Đã thanh toán",
                status: "Đã duyệt",
                totalPrice: orderCost
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
        
    }

    const handleApplyVoucher = async () => {
        const voucherCode = document.getElementById('voucher').value;
    
        if (!voucherCode.trim()) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `Vui lòng nhập mã voucher`,
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
    
        try {
            // Gọi API getSingleVoucher với mã voucher
            const response = await axiosSecure.get(`/orders/voucher/${voucherCode}`);
            
            if (response.status === 200) {

                const voucher = response.data;
                // Kiểm tra nếu mã voucher đang không hoạt động
                if (!voucher.isActive) {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: `Mã voucher không hoạt động`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    return;
                }
    
                // Kiểm tra thời gian hiệu lực của voucher
                const currentDate = new Date();
                if (currentDate < new Date(voucher.validFrom) || currentDate > new Date(voucher.validUntil)) {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: `Mã voucher đã hết hạn hoặc chưa có hiệu lực`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    return;
                }
    
                // Kiểm tra giá trị đơn hàng tối thiểu
                if (orderTotal < voucher.minOrderValue) {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: `Giá trị đơn hàng tối thiểu để áp dụng mã này là ${voucher.minOrderValue}₫`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    return;
                }
    
                // Nếu tất cả các điều kiện đều đúng, áp dụng mã giảm giá
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Áp dụng mã giảm giá thành công! Bạn được giảm ${voucher.discountAmount}₫`,
                    showConfirmButton: false,
                    timer: 1500
                });
                setVoucherDiscount(voucher.discountAmount);
                setOrderCost(orderTotal - voucher.discountAmount);
            }
        } catch (error) {
            console.error('Error applying voucher:', error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: `Mã voucher không hợp lệ hoặc đã hết hạn.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    
    const handleCODCheckout = async () => {
        if (!products || products.length === 0) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `Không có sản phẩm trong giỏ hàng`,
                showConfirmButton: false,
                timer: 1500
            }); 
        }
        else {
            const orderInfo = {
                userEmail: info.email,
                userName: info.name,
                items: products,
                paymentStatus: "Chờ thanh toán",
                status: "Chờ duyệt",
                totalPrice: orderCost
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
                    <legend className='text-black'>Phương thức thanh toán</legend>

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

                    {/* Textarea for entering voucher code */}
                    <div className="form__voucher mt-4">
                        <label htmlFor="voucher" className="text-black">Nhập mã voucher (nếu có):</label>
                        <div className="flex">
                            <input
                                id="voucher"
                                name="voucher"
                                className="w-full border p-2 mt-2 rounded-lg"
                                placeholder="Nhập mã voucher"
                            />
                            <button
                                type="button"
                                className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
                                onClick={handleApplyVoucher} // Gọi hàm để xử lý khi bấm nút
                            >
                                 <FaCheck />
                            </button>
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
                                <td>Voucher giảm giá</td>
                                <td align="right">{formatPrice(voucherDiscount)} ₫</td>
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
                                <td align="right"> {formatPrice(orderCost)} ₫</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div>
                    <button className="button-checkout font-bold bg-mainBG text-white" onClick={handleCheckout}>
                        Đặt hàng
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;
