/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from 'axios';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import Cards from "./Cards";
import { useParams } from 'react-router-dom';

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

const RelatedBook = ({ category }) => {
    const { id } = useParams();
    const slider = React.useRef(null);
    const [relatedBooks, setRelatedBooks] = useState([]);
    useEffect(() => {
        // Tạo query string cho các category
        const queryString = category.map(cat => `category=${encodeURIComponent(cat)}`).join('&');

        const fetchRelatedBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/book?${queryString}`);
                const filteredBooks = response.data.filter(book => book._id !== id); // Loại bỏ sách hiện tại
                setRelatedBooks(filteredBooks);
            } catch (error) {
                console.error("Error fetching related books:", error);
            }
        };

        if (category.length > 0) {
            fetchRelatedBooks();
        }
    }, [category]); // Chạy useEffect này mỗi khi categories thay đổi

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
        <div className="max-w-screen-2xl container mx-auto px-4 mb-20 relative">
            <div className='text-left mt-8'>
                <p className='subtitle'>Sách cùng chủ đề</p>
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

            <Slider ref={slider} {...settings} className="overflow-hidden mt-10 space-x-5">
                {relatedBooks.map(book => (
                    <Cards key={book.id} item={book} />
                ))}
            </Slider>
        </div>
    );
};

export default RelatedBook;
