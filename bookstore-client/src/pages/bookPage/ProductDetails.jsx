import React, { useState, useEffect, useContext } from 'react';
import { useTheme } from "../../hooks/ThemeContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faTruckFast, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "../../contexts/AuthProvider";
import RelatedBook from '../../components/RelatedBook';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { formatDistanceToNow } from 'date-fns';
import { FaComment, FaReply } from 'react-icons/fa6';

const CommentSection = () => {
    const [listcomments, setComment] = useState([]);
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [replyInputVisible, setReplyInputVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosSecure.get(`cmt?bookId=${id}`);
                setComment(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchData();
    }, [id]);

    const [isExpanded, setIsExpanded] = useState(false);
    const MAX_LINES = 3; // Giới hạn số dòng hiển thị

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };
    const handleReplyClick = () => {
        setReplyInputVisible(true);
    };

    const { isDarkMode } = useTheme();

    const commentCount = listcomments.length; // Đếm số lượng bình luận

    return (
        <div className="comment-section">
            <h3 className={`mb-2 text-2xl font-bold p-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Đánh giá khách hàng ({commentCount})
            </h3>
            <div className="comments">
                {/* Render only the first three comments if not expanded */}
                {listcomments.slice(0, isExpanded ? listcomments.length : MAX_LINES).map(comment => (
                    <div key={comment._id} className="comment"> {/* Sử dụng _id làm key */}
                        <div className="avatar-details-container flex mb-2">
                            {comment.avatar && (
                                <div className="avatar-container w-24 rounded-full ring ring-mainBG ring-offset-base-100 ring-offset-2 flex items-center justify-center">
                                    <img src={comment.avatar} alt="Avatar" />
                                </div>
                            )}
                            <div className="details ml-2">
                                <div className="user-info flex items-center">
                                    <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{comment.username}</span>
                                    <span className="ml-1 text-sm italic text-gray-500">
                                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                    </span>
                                </div>
                                <p className={`comment-text ${isDarkMode ? 'text-white' : 'text-black'}`}>{comment.comment}</p>
                                {!replyInputVisible && (
                                    <button
                                        onClick={handleReplyClick}
                                        className="mt-2 flex items-center text-mainBG hover:text-gray-500"
                                    >
                                        <FaReply style={{ fontSize: '1.2rem' }} />
                                        <span className="ml-2 text-sm font-semibold">Phản hồi  (3)</span>
                                    </button>
                                )}
                                {replyInputVisible && (
                                    <div>
                                        <textarea
                                            type="text"
                                            placeholder={ 'Nhập phản hồi...'}
                                            className={`mt-3 input-field ${isDarkMode ? 'dark' : ''}`}
                                            style={{ width: '100%', height: '50px', border: '2px solid', marginRight: '10px', padding: '10px' }}
                                        />
                                        <div className="flex justify-end">
                                            <div className="flex items-center mr-4">
                                            </div>
                                            <button  className="bg-mainBG hover:bg-gray-300 text-white font-bold py-2 px-4 rounded">
                                                Gửi 
                                            </button>
                                        </div>
                                    </div>
                                )}
                                    {/* person reply */}
                                <div key={comment._id} className="comment"> {/* Sử dụng _id làm key */}
                                    <div className="avatar-details-container flex mb-2">
                                        {comment.avatar && (
                                            <div className="avatar-container w-24 rounded-full ring ring-mainBG ring-offset-base-100 ring-offset-2 flex items-center justify-center">
                                                <img src={comment.avatar} alt="Avatar" />
                                            </div>
                                        )}
                                        <div className="details ml-2">
                                            <div className="user-info flex items-center">
                                                <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{comment.username}</span>
                                                <span className="ml-1 text-lg italic text-red font-bold">- Quản trị viên</span>
                                                <span className="ml-1 text-sm italic text-gray-500">
                                                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                                </span>
                                            </div>
                                            <p className={`comment-text ${isDarkMode ? 'text-white' : 'text-black'}`}>{comment.comment}</p>
                                
                                        </div>
                                    </div>

                                </div>
                                
                            </div>
                        </div>

                    </div>
                ))}
                <div className="flex justify-center">
                    {/* Show the 'Show more' button if comments exceed MAX_LINES */}
                    {!isExpanded && commentCount > MAX_LINES && (
                        <button onClick={toggleExpansion} className="text-mainBG font-semibold mt-2 focus:outline-none">
                            Show more
                        </button>
                    )}
                    {/* Show the 'Show less' button if expanded */}
                    {isExpanded && (
                        <button onClick={toggleExpansion} className="text-mainBG font-semibold mt-2 focus:outline-none">
                            Show less
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const CommentInput = () => {
    const [comment, setComment] = useState('');
    const [inputFocused, setInputFocused] = useState(false);
    const [charCount, setCharCount] = useState(0); // State để đếm số ký tự
    const { isDarkMode } = useTheme();
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();

    const handleCommentChange = (e) => {
        const inputComment = e.target.value;
        setComment(inputComment);
        setCharCount(inputComment.length); // Cập nhật số ký tự
    };

    const handleCommentSubmit = async () => {
        // Kiểm tra nếu số ký tự vượt quá 500
        if (charCount > 500) {
            // Hiển thị thông báo không cho phép nhập
            Swal.fire({
                title: 'Không thể gửi đánh giá',
                text: 'Vui lòng nhập dưới 500 ký tự',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }
        const Cmt = {
            username: user.displayName,
            avatar: user.photoURL,
            comment: comment,
            parentId: null,
            bookId: id
        }

        try {
            const cmtRes = await axiosSecure.post('/cmt', Cmt);
            console.log(cmtRes)
            if (cmtRes.status === 200) {
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Đã gửi đánh giá thành công.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            setComment(''); // Clear the input field
            window.location.reload();
        } catch (error) {
            console.error('Error posting comment:', error);
        }

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
                placeholder={inputFocused ? '' : 'Nhập đánh giá...'}
                value={comment}
                onChange={handleCommentChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className={`input-field ${isDarkMode ? 'dark' : ''}`}
                style={{ width: '100%', height: '200px', border: '2px solid', marginRight: '10px', padding: '10px' }}
            />
            <div className="flex justify-end">
                <div className="flex items-center mr-4">
                    <span>{charCount}/500</span> {/* Hiển thị số ký tự đếm */}
                </div>
                <button onClick={handleCommentSubmit} className="bg-mainBG hover:bg-gray-300 text-white font-bold py-2 px-4 rounded">
                    Gửi đánh giá
                </button>
            </div>
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
    const axiosSecure = useAxiosSecure();
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

    const handleWishlistClick = async () => {
        if (!user || !user.email) { // Kiểm tra xem người dùng đã đăng nhập chưa
            // Nếu chưa đăng nhập, hiển thị cảnh báo
            Swal.fire({
                title: 'Vui lòng đăng nhập để thêm!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đăng nhập ngay!',
                cancelButtonText: "Hủy"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            });
            return;
        }
        try {
            const userRes = await axiosSecure.put(`users/wishlist?email=${user.email}`, { bookId: id });
            if (userRes.status === 201) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Đã thêm sách vào mục yêu thích`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAddToCart = () => {
        if (book.quantity < 1)
        {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Không thể thêm vào giỏ hàng!!',
            text: "Sản phẩm đã hết hàng, quý khách vui lòng chọn sản phẩm khác. Xin cảm ơn quý khách!",
            showConfirmButton: true,
          })
        }
        else{

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
                                title: 'Đã thêm sách vào giỏ hàng',
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
                    title: 'Vui lòng đăng nhập',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Đăng nhập ngay!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/login', { state: { from: location } })
                    }
                })
            }
        }
    }
    // Rút gọn tên tác giả nếu quá dài
    let authorToDisplay = book.author?.join(", ");
    const MAX_AUTHOR_LENGTH = 30; //

    if (authorToDisplay.length > MAX_AUTHOR_LENGTH) {
        authorToDisplay = authorToDisplay.substring(0, MAX_AUTHOR_LENGTH) + '...';
    }

    return (
        <div className={`max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100% ${isDarkMode ? 'dark' : ''}`}>
            <div className={`py-20 p-2 flex flex-col justify-center gap-8 ${isDarkMode ? 'text-white' : ''}`}>
                <h2 className="md:text-5xl text-center text-4xl font-bold md:leading-snug leading-snug">
                    Chào mừng đến với trang  <span className="text-mainBG">Chi tiết sách</span>
                </h2>

                <div className="text-sm breadcrumbs">
                    <ul>
                        <li><Link to="/">Trang chủ</Link></li>
                        <li><Link to="/book">Sản phẩm</Link></li>
                        <li>{book.category}</li>
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
                            <span className="font-bold">Lượt thích:</span> 12,3k người
                        </p>
                        <p className={`mb-2 text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            <span className="font-bold">Giá sản phẩm:</span> {book.price} <span className="text-xl font-bold text-red">₫</span>
                        </p>
                        <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-black'}`} style={{ textAlign: 'justify' }}>
                            <span className="font-bold">Mô tả:</span> {book.description ? book.description : "Không có mô tả"}
                        </p>

                    </div>

                    <div className="flex flex-col mb-4">
                        <div className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faUser} className="text-mainBG text-xl mr-2 p-0 icon" />
                            <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Tác giả:</span>
                            <span className={`ml-2 text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>{authorToDisplay}</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faUserGroup} className="text-mainBG text-xl mr-2 p-0 icon" />
                            <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Nhà xuất bản:</span>
                            <span className={`ml-2 text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}> {book.publisher?.join(", ")} </span>
                        </div>
                        <div className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faBook} className="text-mainBG text-xl mr-2 p-0 icon" />
                            <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Số lượng:</span>
                            <span className={`ml-2 text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}> {book.quantity} sản phẩm</span>

                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faTruckFast} className="text-mainBG text-xl mr-2 p-0 icon" />
                            <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Phí vận chuyển:</span>
                            <span className={`ml-2 text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}> Miễn phí vận chuyển </span>
                        </div>
                    </div>

                    <div className="flex mt-4">
                        <button onClick={handleAddToCart} className="bg-mainBG hover:bg-gray-300 text-white font-bold py-2 px-4 rounded mr-4">
                            <span className="inline-block"><FaShoppingCart className="mr-2" /></span> Thêm vào giỏ hàng
                        </button>
                        <button onClick={handleWishlistClick} className="bg-light-purple hover:bg-gray-400 text-white font-bold py-2 px-4 rounded">
                            <span className="inline-block"><FaHeart className="mr-2" /></span> Thêm vào yêu thích
                        </button>
                    </div>

                </div>
            </div>
            <RelatedBook category={book.category} />
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
