import React, { useContext, useState, useEffect } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from 'sweetalert2';
import useCart from "../hooks/useCart";
import axios from 'axios';

const Cards = ({ item }) => {
  const { name, image, description, price, _id } = item;
  // cutdown max word
  const maxWords = 20;

  const shortenDescription = (description, maxWords) => {
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
  const shortName = shortenText(name, 10);

  const shortDescription = shortenDescription(description, maxWords);

  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [data, setUser] = useState();
  const bookId = item._id;;

  const checkFavorite = async () => {
    try {
      const response = await axiosSecure.get(`users/info?email=${user.email}`);
      const data = response.data;
      setUser(data);
      if (data.wishlist.includes(bookId)) {
        setIsHeartFilled(true);
      }
      else {
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
    if (!user || !user.email) { // Kiểm tra xem người dùng đã đăng nhập chưa
      // Nếu chưa đăng nhập, hiển thị cảnh báo
      Swal.fire({
          title: 'Please login!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Login now!'
      }).then((result) => {
          if (result.isConfirmed) {
              navigate('/login', { state: { from: location } })
          }
      });
      return;
    }
    try {
      const userRes = await axiosSecure.put(`users/wishlist?email=${user.email}`, {bookId: bookId});
      if (userRes.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `The book has been added to the wish list.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (userRes.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `The book has been removed from the wish list.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // add to cart handler
  const handleAddToCart = () => {

    if (user && user.email) {
      const cartItem = { bookItemId: _id, name, quantity: 1, image, price, email: user.email }

      axios.post('http://localhost:5000/carts', cartItem)
        .then((response) => {
          console.log(response);
          if (response) {
            refetch(); // refetch cart
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Book added on the cart.',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
          const errorMessage = error.response.data.message;
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
        title: 'Please login to order the book',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login now!'
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
          <h2 className="card-title">{shortName}!</h2>
        </Link>
        <p>{shortDescription}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            {item.price} <span className="text-sm text-red">$ </span>
          </h5>
          <button onClick={() => handleAddToCart(item)} className="btn bg-mainBG text-white"> <FaShoppingCart /> Add to Cart </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
