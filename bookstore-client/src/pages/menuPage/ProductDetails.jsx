import React from 'react';
import { useTheme } from "../../hooks/ThemeContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faUser, faUserGroup, faTruckFast, faBook } from '@fortawesome/free-solid-svg-icons';
import book from "../../../public/book1.jpg";
import { FaReadme } from 'react-icons/fa';

const ProductDetails = () => {
    const { isDarkMode } = useTheme();

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
                        <li>Book title</li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-8">
                <div className="md:w-1/2">
                    <img src={book} alt="Product" className="w-full" />
                </div>

                <div className="md:w-1/2 ">
                    <div className="py-6">
                        <h3 className={`mb-2 text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>ĐẮC NHÂN TÂM - DALE CARNEGIE</h3>
                        <p className={`mb-2 text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            <span className="font-bold">Sold:</span> 12,3k products
                        </p>
                        <p className={`mb-2 text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            <span className="font-bold">Price:</span> $19.99
                        </p>
                        <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            <span className="font-bold">Description:</span> Đắc nhân tâm – How to win friends and Influence People của Dale Carnegie là quyển sách nổi tiếng nhất, bán chạy nhất và có tầm ảnh hưởng nhất của mọi thời đại. Tác phẩm đã được chuyển ngữ sang hầu hết các thứ tiếng trên thế giới và có mặt ở hàng trăm quốc gia. Đây là quyển sách duy nhất về thể loại self-help liên tục đứng đầu danh mục sách bán chạy nhất (best-selling Books) do báo The New York Times bình chọn suốt 10 năm liền. Riêng bản tiếng Anh của sách đã bán được hơn 15 triệu bản trên thế giới. Tác phẩm có sức lan toả vô cùng rộng lớn – dù bạn đi đến bất cứ nơi đâu, bất kỳ quốc gia nào cũng đều có thể nhìn thấy. Tác phẩm được đánh giá là quyển sách đầu tiên và hay nhất, có ảnh hưởng làm thay đổi cuộc đời của hàng triệu người trên thế giới.
                        </p>
                    </div>

                    <div className="flex flex-col mb-4">
                        <div className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faUser} className="text-mainBG text-xl mr-2 p-0 icon" />
                            <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Author:</span>
                            <span className={`ml-2 text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}> Dale Carnegie</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faUserGroup} className="text-mainBG text-xl mr-2 p-0 icon" />
                            <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Publisher:</span>
                            <span className={`ml-2 text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}> First News</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faBook} className="text-mainBG text-xl mr-2 p-0 icon" />
                            <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Total books:</span>
                            <span className={`ml-2 text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}> 122</span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faTruckFast} className="text-mainBG text-xl mr-2 p-0 icon" />
                            <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Shipping fee:</span>
                            <span className={`ml-2 text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}> freeship</span>
                        </div>
                    </div>

                    <div className="flex mt-4">
                        <button className="bg-mainBG hover:bg-gray-300 text-white font-bold py-2 px-4 rounded mr-4">
                            Add to Cart
                        </button>
                        <button className="bg-blue-600 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded">
                            Add to Wishlist
                        </button>
                    </div>


                </div>
            </div>
            {/* Phần đánh giá khách hàng */}
            <div className="mt-8">
                <h3 className={`mb-2 text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Customer Reviews</h3>
                <div className="flex items-center mb-2">
                    <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Rate this book:</span>
                    {[...Array(5)].map((_, index) => (
                        <button key={index} className="ml-2 text-mainBG text-2xl focus:outline-none">
                            ★
                        </button>
                    ))}
                </div>
            </div>
            {/* Kết thúc phần đánh giá */}
        </div>

    );
};

export default ProductDetails;
