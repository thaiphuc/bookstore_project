import React, { useContext, useState, useEffect } from "react";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from 'sweetalert2';
import useCart from "../hooks/useCart";
import axios from 'axios';

const Cards = ({ item }) => {
  const { name, image, description, price, _id } = item;
  const maxWords = 20;

  const shortenDescription = (description, maxWords) => {
    if (!description || description.length === 0) {
      return "Không có mô tả";
    }
    if (description.length > 10) {
      const spaceIndex = description.indexOf(' ', 10);
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
  const formatPrice = (price) => {
    // Sử dụng hàm toLocaleString để định dạng số với dấu phẩy ngăn cách hàng nghìn
    return price.toLocaleString('vi-VN');
  };
  const shortName = shortenText(name, 7);
  const shortDescription = shortenDescription(description, maxWords);

  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [data, setUser] = useState();
  const bookId = item._id;

  const checkFavorite = async () => {
    try {
      const response = await axiosSecure.get(`users/info?email=${user.email}`);
      const data = response.data;
      setUser(data);
      if (data.wishlist.includes(bookId)) {
        setIsHeartFilled(true);
      } else {
        setIsHeartFilled(false);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    checkFavorite();
  }, [bookId]);

  const handleHeartClick = async () => {
    if (!user || !user.email) {
      Swal.fire({
        title: 'Vui lòng đăng nhập!',
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
      });
      return;
    }
    try {
      const userRes = await axiosSecure.put(`users/wishlist?email=${user.email}`, { bookId: bookId });
      setIsHeartFilled(current => !current);
      if (userRes.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Đã thêm vào mục yêu thích`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (userRes.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Đã xóa khỏi mục yêu thích`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddToCart = () => {
    if (user && user.email) {
      const cartItem = { bookItemId: _id, name, quantity: 1, image, price, email: user.email }

      axios.post('http://localhost:5000/carts', cartItem)
        .then((response) => {
          console.log(response);
          if (response) {
            refetch();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Đã thêm vào giỏ hàng',
              showConfirmButton: false,
              timer: 1500
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
            timer: 1500
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
    <div to={`/book/${item._id}`} className="card shadow-xl relative mr-5 md:my-5 w-3/4 h-auto">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-light-purple-200 ${isHeartFilled ? "text-pink" : "text-white"
          }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer" />
      </div>
      <Link to={`/book/${item._id}`}>
        <figure>
          <img src={item.image} alt="Shoes" className="w-48 h-48 object-fit hover:scale-105 transition-all duration-300" />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/book/${item._id}`}>
          <h2 className="card-title text-lg">{shortName}!</h2>
        </Link>
        <p>{shortDescription}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            {price > 1000 ? formatPrice(price) : price} <span className="text-lg text-red"> ₫</span>
          </h5>
          <button onClick={() => handleAddToCart(item)} className="btn bg-mainBG text-white"> <FaCartPlus /> Thêm </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
