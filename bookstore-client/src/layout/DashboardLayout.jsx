import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MdDashboard, MdOutlineDashboardCustomize } from "react-icons/md";
import { FaEdit, FaHome, FaLocationArrow, FaPlusCircle, FaRegUser, FaShoppingBag, FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import Login from "../components/Login";
import logo from "/logoadmin.png";

const DashboardLayout = () => {
  const { loading } = useAuth()
  const [isAdmin, isAdminLoading] = useAdmin();
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  // logout
  const handleLogout = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sharedBook = (
    <>
      <li className="mt-3">
        <Link to="/">
          <FaHome />
          Home
        </Link>
      </li>
      <li>
        <Link to="/book">
          <FaCartShopping />
          Book
        </Link>
      </li>
      <li>
        <Link to="/order">
          <FaLocationArrow />
          Orders Tracking
        </Link>
      </li>
      <li>
        <a onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          Logout
        </a>
      </li>
    </>
  );

  return (
    <div>
      {isAdminLoading || isAdmin ? (
        <div className="drawer sm:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
            {/* Page content here */}
            <div className="flex items-center justify-between mx-4">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button sm:hidden"
              >
                <MdOutlineDashboardCustomize />
              </label>

              {/* login or signout */}
              <button className="btn flex items-center gap-2 rounded-full px-6 bg-mainBG text-white sm:hidden" onClick={handleLogout}>
                <FaRegUser /> Logout
              </button>
            </div>
            <div className="mt-5 md:mt-2 mx-4">
              <Outlet />
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <Link to="/dashboard" className="flex justify-start mb-3">
                  <img src={logo} alt="" className="w-40 mr-3" />
                  <span className="indicator-item badge badge-primary ">
                    Admin
                  </span>
                </Link>
              </li>
              <hr />

              {/* dashboard */}
              <li className="mt-3">
                <Link to="/dashboard">
                  <MdDashboard /> Dashboard
                </Link>
              </li>

              {/* manage orders */}
              <li>
                <Link to="/dashboard/bookings">
                  <FaShoppingBag /> Manage orders
                </Link>
              </li>

              {/* Add Book Items */}
              <li>
                <Link to="/dashboard/add-book">
                  <FaPlusCircle /> Add Book
                </Link>
              </li>

              {/* Manage Book Items */}
              <li>
                <Link to="/dashboard/manage-items">
                  <FaEdit /> Manage Books
                </Link>
              </li>

              {/* users */}
              <li className="mb-3">
                <Link to="/dashboard/users">
                  <FaUsers />
                  Users
                </Link>
              </li>

              {/* shared book */}
              <hr />
              {sharedBook}
            </ul>
          </div>
        </div>
      ) : (loading ? <Login /> : <div className="h-screen flex items-center justify-center">
        <Link to="/">Back to Home</Link>
      </div>)}
    </div>
  );
};

export default DashboardLayout;
