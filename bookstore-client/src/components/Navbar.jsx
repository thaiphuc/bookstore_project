import React, { useContext, useEffect, useState } from "react";
import logo from "/logo.png";
import { FaRegUser } from "react-icons/fa";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import { useTheme } from "../hooks/ThemeContext";
import { FaHeart } from 'react-icons/fa';

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const { user, loading } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const { isDarkMode } = useTheme();
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0); // State to hold total quantity of items

  const toggleBook = () => {
    setIsBookOpen((prev) => !prev);
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
      cart.forEach(item => {
        total += item.quantity;
      });
    }
    setTotalItems(total);
  }, [cart]);

  const navItems = (
    <>
      <li>
        <a href="/" className={`text-${isDarkMode ? 'dark' : ''}`}>
          Home
        </a>
      </li>
      <li tabIndex={0}>
        <details>
          <summary className={`text-${isDarkMode ? 'dark' : ''}`}>Books</summary>
          <ul className={`p-2 ${isDarkMode ? 'dark' : ''}`}>
            <li>
              <Link to="/book" className={`text-${isDarkMode ? 'dark' : ''}`}>
                All
              </Link>
            </li>
            <li>
              <a className={`text-${isDarkMode ? 'dark' : ''}`}>Category</a>
            </li>
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details>
          <summary className={`text-${isDarkMode ? 'dark' : ''}`}>Services</summary>
          <ul className={`p-2 ${isDarkMode ? 'dark' : ''}`}>
            <li>
              <a className={`text-${isDarkMode ? 'text-white' : 'black'}`}>Online Order</a>
            </li>
            <li>
              <a className={`text-${isDarkMode ? 'white' : 'black'}`}>Order Tracking</a>
            </li>
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details>
          <summary className={`text-${isDarkMode ? 'dark' : ''}`}>Others</summary>
          <ul className={`p-2 ${isDarkMode ? 'dark' : ''}`}>
            <li>
              <Link
                to="/contact-page"
                className={`text-${isDarkMode ? 'text-white' : 'black'}`}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/about-page"
                className={`text-${isDarkMode ? 'text-white' : 'black'}`}
              >
                About us
              </Link>
            </li>

          </ul>
        </details>
      </li>
    </>
  );

  return (
    <header
      className={`max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out ${isDarkMode ? "dark" : ""}`}
    >
      <div
        className={`navbar xl:px-24 ${isSticky
          ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out text-black"
          : ""
          }`}
      >
        <div className="navbar-start">
          <div className="dropdown justify-between">
            <label onClick={toggleBook} tabIndex={0} className="btn btn-ghost lg:hidden" >
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
              className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64 space-y-3 ${isDarkMode ? 'dark' : ''}`}
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
        <div className="navbar-end ">
          {/* search-input */}

          <div className="form-control">
            <input type="text" placeholder="Search here..." className="input input-bordered w-16 md:w-auto ml-2 mr-2" />
          </div>
          {/* <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button> */}
          {/* wishlist */}
          <button className="btn btn-ghost btn-circle">
            <Link to="/favorite-page">
              <FaHeart />
            </Link>
          </button>

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
                <span className="badge badge-sm indicator-item">{totalItems || 0}</span>
              </div>
            </label>
          </Link>

          {/* login button */}

          {
            user ? <>
              <Profile user={user} />
            </> : <button onClick={() => document.getElementById('my_modal_5').showModal()} className="btn flex items-center gap-2 rounded-full px-6 bg-mainBG text-white">
              <FaRegUser /> Login
            </button>
          }

          <Modal />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
