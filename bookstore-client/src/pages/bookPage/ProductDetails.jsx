import React, { useState, useEffect, useContext } from 'react';
import { useTheme  } from "../../hooks/ThemeContext";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faTruckFast, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "../../contexts/AuthProvider";
import avatar from "../../../public/th.jpg"
import RelatedBook from '../../components/RelatedBook';
import axios from 'axios';


const CommentSection = () => {
    // data giả 
    const comments = [
        { id: 1, avatar: 'avatar1.jpg', username: 'thai phuc', time: '2 hours ago', comment: 'This book is amazing!' },
        { id: 2, avatar: 'avatar2.jpg', username: 'phu qui', time: '1 day ago', comment: 'I highly recommend it.' },
        { id: 3, avatar: 'avatar2.jpg', username: 'duy linh', time: '1 minute ago', comment: 'I highly recommend it.' },
        { id: 4, avatar: 'avatar2.jpg', username: 'thao quyen', time: '1 week ago', comment: 'I highly recommend it.' },
        // add cmt here
    ];

    const { isDarkMode } = useTheme();

    const commentCount = comments.length; // Đếm số lượng bình luận

    return (
        <div className="comment-section">
            <h3 className={`mb-2 text-2xl font-bold p-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Customer Reviews ({commentCount}) {/* Hiển thị số lượng bình luận */}
            </h3>
            <div className="comments">
                {comments.map(comment => (
                    <div key={comment.id} className="comment">
                        <div className="avatar-details-container flex">
                            <div className="avatar-container w-24 rounded-full ring ring-mainBG ring-offset-base-100 ring-offset-2 flex items-center justify-center">
                                <img src={avatar} alt="Avatar" />
                            </div>
                            <div className="details ml-2">
                                <div className="user-info flex items-center">
                                    <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{comment.username}</span>
                                    <span className="ml-1 text-sm italic text-gray-500">{comment.time}</span>
                                </div>
                                <p className={`comment-text ${isDarkMode ? 'text-white' : 'text-black'}`}>{comment.comment}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CommentInput = () => {
    const [comment, setComment] = useState('');
    const [inputFocused, setInputFocused] = useState(false);
    const { isDarkMode } = useTheme();

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        // Xử lý việc gửi bình luận (chưa được triển khai ở đây)
        console.log('Comment submitted:', comment);
        setComment(''); // Xóa nội dung của ô input sau khi gửi
    };

    const handleInputFocus = () => {
        setInputFocused(true);
    };

    const handleInputBlur = () => {
        setInputFocused(false);
    };

    return (
        <div className="comment-input" >
            <textarea
                type="text"
                placeholder={inputFocused ? '' : 'Write a comment...'}
                value={comment}
                onChange={handleCommentChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className={`input-field ${isDarkMode ? 'dark' : ''}`}
                style={{ width: '100%', height: '200px', border: '2px solid', marginRight: '10px', padding: '10px' }}
            />
            <button onClick={handleCommentSubmit} className="submit-btn bg-mainBG hover:bg-gray-300 text-white font-bold py-2 px-4 rounded">
                Send
            </button>
        </div>
    );
};


const ProductDetails = () => {
    const { isDarkMode } = useTheme();
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
      setLoading(true);
  
      fetch(`http://localhost:5000/book/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setBook(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching book details:", error);
          setLoading(false);
        });
    }, [id]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!book) {
      return <div>Book not found</div>;
    }
    const handleAddToCart = () => {
        if (user && user.email && book) { // Giả sử `user` được quản lý ở đâu đó trong context hoặc state
          const cartItem = { 
            bookItemId: book._id, 
            name: book.name, 
            quantity: 1, 
            image: book.image, 
            price: book.price, 
            email: user.email 
          }
    
          axios.post('http://localhost:5000/carts', cartItem)
            .then((response) => {
              console.log(response);
              if (response.data) {
                // refetch cart logic here
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Book added to the cart.',
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
                icon: 'error',
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
        <div className={`max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100% ${isDarkMode ? 'dark' : ''}`}>
            <div className={`py-20 p-2 flex flex-col justify-center gap-8 ${isDarkMode ? 'text-white' : ''}`}>
                <h2 className="md:text-5xl text-center text-4xl font-bold md:leading-snug leading-snug">
                    Welcome to your <span className="text-mainBG">Book Details</span>
                </h2>

                <div className="text-sm breadcrumbs">
                    <ul>
                        <li><a>Home</a></li>
                        <li><a>Book Details</a></li>
                        <li><a>{book.category}</a></li>
                        <li>{book.name}</li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-8 items-center justify-center">
                <div className="md:w-1/2 flex items-center justify-center">
                    <img src={book.image} alt="Product" className="max-w-xs h-auto custom-shadow" />
                </div>
                <div className="md:w-1/2 p-3 ">
                    <div className="py-6">
                        <h3 className={`mb-2 text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{book.name}</h3>
                        <p className={`mb-2 text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            <span className="font-bold">Sold:</span> 12,3k products
                        </p>
                        <p className={`mb-2 text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            <span className="font-bold">Price:</span> {book.price}
                        </p>
                        <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-black'}`} style={{ textAlign: 'justify' }}>
                            <span className="font-bold">Description:</span> {book.description}
                        </p>

                    </div>

                    <div className="flex flex-col mb-4">
                        <div className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faUser} className="text-mainBG text-xl mr-2 p-0 icon" />
                            <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Author:</span>
                            <span className={`ml-2 text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}> {book.author?.join(", ")} </span>
                        </div>
                        <div className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faUserGroup} className="text-mainBG text-xl mr-2 p-0 icon" />
                            <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Publisher:</span>
                            <span className={`ml-2 text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}> {book.publisher?.join(", ")} </span>
                        </div>
                        <div className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faBook} className="text-mainBG text-xl mr-2 p-0 icon" />
                            <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Total books:</span>
                            <span className={`ml-2 text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}> {book.quantity} </span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faTruckFast} className="text-mainBG text-xl mr-2 p-0 icon" />
                            <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Shipping fee:</span>
                            <span className={`ml-2 text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}> Freeship</span>
                        </div>
                    </div>

                    <div className="flex mt-4">
                        <button onClick={handleAddToCart} className="bg-mainBG hover:bg-gray-300 text-white font-bold py-2 px-4 rounded mr-4">
                            Add to Cart
                        </button>
                        <button className="bg-blue-600 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded">
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
            <RelatedBook />
            {/* Phần đánh giá khách hàng */}
            <div className="mt-8 flex flex-col md:flex-row">
                <div className="md:w-1/2">
                    <CommentSection />
                </div>
                <div className="md:w-1/2">
                    <CommentInput />
                </div>
            </div>
            {/* Kết thúc phần đánh giá */}
        </div>
    );
};

export default ProductDetails;
