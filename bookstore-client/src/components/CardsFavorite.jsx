import React, { useContext, useState } from "react";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from 'sweetalert2'
import useCart from "../hooks/useCart";
import axios from 'axios';

const CardsFavorite = ({ item }) => {
    const { name, image, price, description, _id } = item;
    const maxWords = 20;

    const shortenDescription = (description, maxWords) => {
        if (!description || description.length === 0) {
            return "Không có mô tả";
        }
        if (description.length > 15) {
            const spaceIndex = description.indexOf(' ', 15);
            const shortenedText = description.substring(0, spaceIndex);
            const words = shortenedText.split(' ');
            const shortDescription = words.slice(0, maxWords).join(' ');
            return `${shortDescription}...`;
        }
        return description;
    };

    const shortenText = (text, maxWords) => {
        if (text.length > maxWords) {
            const spaceIndex = text.indexOf(' ', maxWords);
            const shortenedText = text.substring(0, spaceIndex);
            const words = shortenedText.split(' ');
            const shortText = words.slice(0, maxWords).join(' ');
            return `${shortText}...`;
        }
        return text;
    };
    const shortName = shortenText(name, 8);

    const shortDescription = shortenDescription(description, maxWords);

    const { user } = useContext(AuthContext);
    const [cart, refetch] = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [isHeartFilled, setIsHeartFilled] = useState(false); // Khởi tạo là false

    const handleHeartClick = async () => {
        const bookId = item._id;
        try {
        const userRes = await axiosSecure.put(`users/wishlist?email=${user.email}`, {bookId: bookId});
        if (userRes.status === 200) {
            await Swal.fire({
            position: "center",
            icon: "success",
            title: `Đã xóa khỏi mục yêu thích`,
            showConfirmButton: false,
            timer: 1000,
            });
        }
        } catch (error) {
            console.error('Error:', error);
        }
       window.location.reload();
    };

    // add to cart handler
    const handleAddToCart = () => {
        // console.log(item);
        if (user && user.email) {
            const cartItem = { menuItemId: _id, name, quantity: 1, image, price, email: user.email }

            axios.post('http://localhost:5000/carts', cartItem)
                .then((response) => {
                    console.log(response);
                    if (response) {
                        refetch(); // refetch cart
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Đã thêm vào giỏ hàng!',
                            showConfirmButton: false,
                            timer: 1000
                        })
                    }
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                    const errorMessage = "Sản phẩm đã được thêm vào giỏ hàng";
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: `${errorMessage}`,
                        showConfirmButton: false,
                        timer: 1000
                    })
                });
        }
        else {
            Swal.fire({
                title: 'Vui lòng đăng nhập để mua hàng!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đăng nhập ngay!',
                cancelButtonText: 'Hủy'

            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }

    return (
        <div to={`/book/${item._id}`} className="card shadow-xl relative mr-5 md:my-5">
            <div
                className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-light-purple-200 ${isHeartFilled ? "text-white" : "text-pink"
                    }`}
                onClick={handleHeartClick}
            >
                <FaHeart className="w-5 h-5 cursor-pointer" />
            </div>
            <Link to={`/book/${item._id}`}>
                <figure>
                    <img src={item.image} alt="Shoes" className="w-full h-50 object-fit hover:scale-105 transition-all duration-300 md:h-72" />
                </figure>
            </Link>
            <div className="card-body">
                <Link to={`/book/${item._id}`}><h2 className="card-title">{shortName}!</h2></Link>
                <p style={{ textAlign: 'left' }}>{shortenDescription(description, maxWords)}</p>
                <div className="card-actions justify-between items-center mt-2">
                    <h5 className="font-semibold">
                        {item.price} <span className="text-lg text-red">₫ </span> 
                    </h5>
                    <button onClick={() => handleAddToCart(item)} className="btn bg-mainBG text-white"><FaCartPlus /> Thêm </button>
                </div>
            </div>
        </div>
    );
};

export default CardsFavorite;
