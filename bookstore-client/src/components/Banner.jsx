import React from "react";
import bannerImg from "/images/home/banner.png";
import { useTheme } from "../hooks/ThemeContext";

const Banner = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100% ${isDarkMode ? 'dark' : ''}`}>
      <div className={`py-24 flex flex-col md:flex-row-reverse items-center justify-between gap-8 ${isDarkMode ? 'text-white' : ''}`}>

        {/* img */}
        <div className="md:w-1/2">
          <img src={bannerImg} alt="" />
          <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap-4">
            <div className="bg-white px-3 py-2 rounded-2xl flex items-center gap-3 shadow-sm w-64">
              <img src="/images/home/b-food1.png" alt="" className="rounded-2xl" />
              <div className="space-y-1">
                <h5>Best Sellers</h5>
                <div className="rating rating-sm">

                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-400"
                    // checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2"
                    style={{ background: 'linear-gradient(to left, #d1d5db 50%, #FFD700 50%)' }}
                    readOnly
                  />



                </div>
                <p className="text-red">$9.00</p>
              </div>
            </div>
            <div className="bg-white px-3 py-2 rounded-2xl md:flex items-center gap-3 shadow-sm w-64 hidden">
              <img src="/images/home/b-food1.png" alt="" className="rounded-2xl" />
              <div className="space-y-1">
                <h5>Best Favorites</h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-400"
                    // checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-gray-300"
                    readOnly
                  />

                </div>
                <p className="text-red">$18.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* texts */}
        <div className="md:w-1/2 px-4 space-y-7">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Dive into Delights Of Delectable <span className="text-mainBG">Food</span>
          </h2>
          <p className="text-[#4A4A4A] text-xl">
            Where Each Plate Weaves a Story of Culinary Mastery and Passionate
            Craftsmanship
          </p>
          <button className="bg-mainBG font-semibold btn text-white px-8 py-3 rounded-full">
            Order Now
          </button>
        </div>

      </div>
    </div>
  );
};
const Banner2 = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100% ${isDarkMode ? 'dark' : ''}`}>
      <div className={`py-24 flex flex-col md:flex-row-reverse items-center justify-between gap-8 ${isDarkMode ? 'text-white' : ''}`}>

        {/* img */}
        <div className="md:w-1/2">
          <img src={bannerImg} alt="" />
          <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap-4">
            <div className="bg-white px-3 py-2 rounded-2xl flex items-center gap-3 shadow-sm w-64">
              <img src="/images/home/b-food1.png" alt="" className="rounded-2xl" />
              <div className="space-y-1">
                <h5>Spicy noodles</h5>
                <div className="rating rating-sm">

                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-500"
                    checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-400"
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />

                </div>
                <p className="text-red">$18.00</p>
              </div>
            </div>
            <div className="bg-white px-3 py-2 rounded-2xl md:flex items-center gap-3 shadow-sm w-64 hidden">
              <img src="/images/home/b-food1.png" alt="" className="rounded-2xl" />
              <div className="space-y-1">
                <h5>Best Sellers</h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-500"
                    checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />

                </div>
                <p className="text-red">$18.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* texts */}
        <div className="md:w-1/2 px-4 space-y-7">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Hello here <span className="text-mainBG">Food</span>
          </h2>
          <p className="text-[#4A4A4A] text-xl">
            Where Each Plate Weaves a Story of Culinary Mastery and Passionate
            Craftsmanship
          </p>
          <button className="bg-mainBG font-semibold btn text-white px-8 py-3 rounded-full">
            Order Now
          </button>
        </div>

      </div>
    </div>
  );
};
const CarouselBanner = () => {
  return (
    <div className="carousel w-full">
      <div id="slide1" className="carousel-item relative w-full">
        <Banner />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide4" className="btn btn-circle">❮</a>
          <a href="#slide2" className="btn btn-circle">❯</a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <Banner2 />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">❮</a>
          <a href="#slide3" className="btn btn-circle">❯</a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <Banner />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">❮</a>
          <a href="#slide4" className="btn btn-circle">❯</a>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full">
        <Banner />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle">❮</a>
          <a href="#slide1" className="btn btn-circle">❯</a>
        </div>
      </div>
    </div>
  );
};

export default CarouselBanner;
