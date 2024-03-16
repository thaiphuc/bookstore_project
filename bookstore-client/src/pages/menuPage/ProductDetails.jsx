import React from 'react';
import { useTheme } from "../../hooks/ThemeContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHeart, faEye, faBookmark } from '@fortawesome/free-solid-svg-icons'; // Import the icons you want to use
import bannerImg from "/images/home/banner.png";

const ProductDetails = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100% ${isDarkMode ? 'dark' : ''}`}>
            <div className={`py-20 p-2 flex flex-col justify-center gap-8 ${isDarkMode ? 'text-white' : ''}`}>
                <h2 className="md:text-5xl text-center text-4xl font-bold md:leading-snug leading-snug">
                    Welcome to your <span className="text-mainBG">Book Details</span>
                </h2>

                {/* Breadcrumb*/}
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li><a>Home</a></li>
                        <li><a>Book Details</a></li>
                        <li>Book title</li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col md:flex-row">
                {/* Section 1: Product Image */}
                <div className="md:w-1/2">
                    <img src={bannerImg} alt="Product" className="w-full" />
                </div>

                {/* Section 2: Product Details */}
                <div className="md:w-1/2 ">
                    <div className="py-8 ">
                        <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Product Title </h3>
                        <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            Sold: 12,3k products
                        </p>
                        <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            Price: $19.99
                        </p>
                        <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>

                    </div>
                    {/* Icon Bar */}
                    <div className="flex flex-col mb-4">
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faEye} className="text-gray-600 text-xl mr-2" />
                            <span>View</span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faHeart} className="text-red-600 text-xl mr-2" />
                            <span>Favorite</span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faBookmark} className="text-yellow-600 text-xl mr-2" />
                            <span>Bookmark</span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faCartPlus} className="text-blue-600 text-xl mr-2" />
                            <span>Add to Cart</span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex mt-4"> {/* Add margin to the top of the buttons */}
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                            Add to Cart
                        </button>
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                            Add to Wishlist
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
