import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "/images/home/banner/banner1.jpg";
import banner2 from "/images/home/banner/banner2.jpg";
import banner3 from "/images/home/banner/banner3.jpg";
import banner4 from "/images/home/banner/banner4.jpg";
import { useTheme } from '../hooks/ThemeContext';
import { Link } from "react-router-dom";
const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isDarkMode } = useTheme();

  const banners = [banner1, banner2, banner3, banner4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === banners.length - 1 ? 0 : prevSlide + 1
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentSlide,
    beforeChange: (current, next) => setCurrentSlide(next),

  };

  return (
        <div className={`max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100% ${isDarkMode ? " dark" : ""}`}>
      <div className={`py-24 relative flex flex-col md:flex-row-reverse items-center justify-between gap-8`}>
        <div className="md:w-2/3">
          <Slider {...settings}>
            {banners.map((banner, index) => (
              <div key={index}>
                <img src={banner} alt={`Banner ${index}`} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="md:w-1/3 px-4 space-y-7">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Wellcome to our world of <span className="text-mainBG">Book</span>
          </h2>
          <p className="text-lg">
            Where you can enjoy thousands of valuable books spanning all genres and offering excellent knowledge.
          </p>
          <Link to="/book">
            <button className="mt-3 bg-mainBG font-semibold btn text-white px-8 py-3 rounded-full">
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
