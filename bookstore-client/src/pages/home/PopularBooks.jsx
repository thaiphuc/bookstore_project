/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "../../components/Cards";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

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

const PopularBooks = () => {
  const slider = React.useRef(null);
  const [book, setBook] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    // Fetch data from the backend with category filter
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/book?category=Phổ biến");
        const data = await response.json();
        setBook(data);
        setFilteredItems(data); // Initially, display books of category 'popular'
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 my-20 relative">
      <div className='text-left'>
        <p className='subtitle '>Người dùng yêu thích</p>
        <h2 className='title'>Sách phổ biến nhất</h2>
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
        {filteredItems.map((book, i) => (
          <Cards item={book} key={i} />
        ))}
      </Slider>
    </div>
  );
};

export default PopularBooks;
