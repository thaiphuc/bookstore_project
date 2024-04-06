/* eslint-disable react/prop-types */
import React, { useEffect, useState, useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../contexts/AuthProvider";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import CardsFavorite from "./CardsFavorite";

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        >
            NEXT
        </div>
    );
};

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "mainBG" }}
            onClick={onClick}
        >
            BACK
        </div>
    );
};

const FavoriteBook = () => {
    const slider = React.useRef(null);
    const { user } = useContext(AuthContext);
    const [bookList, setWishlist] = useState([]); // Khởi tạo state với giá trị ban đầu là mảng rỗng
    const axiosSecure = useAxiosSecure();
    
    const fetchWishlist = async () => {
      try {
        const response = await axiosSecure.get(`users/wishlist?email=${user.email}`);
        setWishlist(response.data);
      } catch (error) {
          console.error('Error fetching wishlist data:', error);
        }
    };
    
    useEffect(() => {
      fetchWishlist();
    }, []);
    
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 970,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],

        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        <div className="max-w-screen-xl container mx-auto xl:px-12 px-4 mb-20 relative">
            <div className='text-left'>
                <p className='subtitle'>Your Favorite Books</p>
            </div>
            <div className="md:absolute right-3 top-8 mb-10 md:mr-24">
                <button onClick={() => slider?.current?.slickPrev()}
                    className=" btn p-2 rounded-full ml-5"
                >
                    <FaAngleLeft className=" h-8 w-8 p-1" />
                </button>
                <button
                    className="bg-mainBG btn p-2 rounded-full ml-5"
                    onClick={() => slider?.current?.slickNext()}
                >
                    <FaAngleRight className=" h-8 w-8 p-1" />
                </button>
            </div>
            {bookList.length > 0 ? (
                <Slider ref={slider} {...settings} className="overflow-hidden mt-10 space-x-5">
                {bookList.map((item, i) => (
                    <CardsFavorite item={item} key={i} />
                ))}
            </Slider>
            ) : ( <div className="text-center mt-20">
                    <p>Favorite book is empty. Please add book.</p>
                        <Link to="/book"><button className="btn bg-mainBG text-white mt-3">Back to Book</button></Link>
                </div>)
          }
            
        </div>
    );
};

export default FavoriteBook;
