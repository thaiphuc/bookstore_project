import React, { useContext, useEffect, useState } from "react";
import logo from "/logo.png";
import { FaRegUser } from "react-icons/fa";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import { useTheme } from "../hooks/ThemeContext";
import { FaHeart } from "react-icons/fa";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const { user, loading } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const { isDarkMode } = useTheme();
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 

  const toggleBook = () => {
    setIsBookOpen((prev) => !prev);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Calculate total items when cart items change
    let total = 0;
    if (Array.isArray(cart)) {
      cart.forEach((item) => {
        total += item.quantity;
      });
    }
    setTotalItems(total);
  }, [cart]);

  useEffect(() => {
    // lọc theo từ khóa
    const results = fakeData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  const navItems = (
    <>
      <li>
        <a href="/" className={`text-${isDarkMode ? "dark" : ""}`}>
          Trang chủ
        </a>
      </li>
      <li tabIndex={0}>
        <details>
          <summary className={`text-${isDarkMode ? "dark" : ""}`}>
            Sản phẩm
          </summary>
          <ul className={`p-2 ${isDarkMode ? "dark" : ""}`}>
            <li>
              <a href="/book" className={`text-${isDarkMode ? "dark" : ""}`}>
                Tất cả
              </a>
            </li>
            {/* <li>
              <a className={`text-${isDarkMode ? 'dark' : ''}`}>Category</a>
            </li> */}
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details>
          <summary className={`text-${isDarkMode ? "dark" : ""}`}>
            Dịch vụ
          </summary>
          <ul className={`p-2 ${isDarkMode ? "dark" : ""}`}>
            <li>
              <a className={`text-${isDarkMode ? "text-white" : "black"}`}>
                Dịch vụ
              </a>
            </li>
            <li>
              <a
                href="/order"
                className={`text-${isDarkMode ? "white" : "black"}`}
              >
                Đơn hàng
              </a>
            </li>
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details>
          <summary className={`text-${isDarkMode ? "dark" : ""}`}>Khác</summary>
          <ul className={`p-2 ${isDarkMode ? "dark" : ""}`}>
            <li>
              <Link
                to="/contact-page"
                className={`text-${isDarkMode ? "text-white" : "black"}`}
              >
                Liên hệ
              </Link>
            </li>
            <li>
              <Link
                to="/about-page"
                className={`text-${isDarkMode ? "text-white" : "black"}`}
              >
                Về chúng tôi
              </Link>
            </li>
          </ul>
        </details>
      </li>
    </>
  );

  return (
    <header
      className={`max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out ${isDarkMode ? "dark" : ""
        }`}
    >
      <div
        className={`navbar xl:px-24 ${isSticky
          ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out text-black"
          : ""
          }`}
      >
        <div className="navbar-start">
          <div className="dropdown justify-between">
            <label
              onClick={toggleBook}
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64 space-y-3 ${isDarkMode ? "dark" : ""
                }`}
              style={{ display: isBookOpen ? "block" : "none" }}
            >
              {navItems}
            </ul>
          </div>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-4">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {/* search-input */}
          <div className="search-wrap">
            <div className="form-control">
              <input
                type="text"
                placeholder="Tìm kiếm sách..."
                className="input input-bordered w-16 md:w-auto ml-2 mr-2"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            {/* search-results */}
            <div className="search-results">
              <div className="search-result-container">
                {searchResults.length > 0 ? (
                  <>
                    {searchResults.map((result) => (
                      <div key={result.id} className="search-result">
                        <img src={result.image} alt={result.name} />
                        <div className="title-result">
                          <p>{result.name.length > 35 ? result.name.substring(0, 35) + "..." : result.name}</p>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-center">Không tìm thấy kết quả</p>
                )}

              </div>
            </div>
          </div>

          {/* wishlist */}
          <Link to="/favorite-page">
            <button className="btn btn-ghost btn-circle">
              <FaHeart />
            </button>
          </Link>
          {/* shopping cart */}
          <Link to="/cart-page">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle  lg:flex items-center justify-center mr-3"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {totalItems || 0}
                </span>
              </div>
            </label>
          </Link>
          {/* login button */}
          {user ? (
            <Profile user={user} />
          ) : (
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="btn flex items-center gap-1 rounded-full px-3 bg-mainBG text-white"
            >
              <FaRegUser /> Đăng nhập
            </button>
          )}
          <Modal />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

const fakeData = [
  {
    id: 1,
    name: "Tôi tìm mình giữa đại dương xanh ngáttttttttttt",
    image: "/book1.jpg",
  },
  {
    id: 2,
    name: "Tôi tìm mình giữa nhà ngáttttttttttt",
    image: "/book1.jpg",
  },
  {
    id: 3,
    name: "bít gì đâu trời",
    image: "/book1.jpg",
  },
  {
    id: 4,
    name: "đời mà không gì là dễ",
    image: "/book1.jpg",
  }, 
  {
    id: 5,
    name: "bạn của tôi là quỹ",
    image: "/book1.jpg",
  },
  
];

