/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaHeart } from "react-icons/fa"
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import Cards from "./Cards";

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

const RelatedBook = () => {
    const [descriptions, setDescriptions] = useState([]);
    const slider = React.useRef(null);

    useEffect(() => {
        fetch("/menu.json")
            .then((res) => res.json())
            .then((data) => {
                const specials = data.filter((item) => item.category === "popular");
                // console.log(specials)
                setDescriptions(specials);
            });
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
        <div className="max-w-screen-2xl container mx-auto px-4 mb-20 relative">
            <div className='text-left mt-8'>
                <p className='subtitle'>Related Books</p>
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
                {descriptions.map((item, i) => (
                    <Cards item={item} key={i} />
                ))}
            </Slider>
        </div>
    );
};

export default RelatedBook;
