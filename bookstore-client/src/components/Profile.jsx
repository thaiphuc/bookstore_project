import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import avatarImg from "/images/avatar.jpg"
import { useNavigate, Link } from "react-router-dom";
import { faUser, faClipboardList, faSignOutAlt, faUserTie, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Profile = ({ user }) => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate()
  // logout
  const handleLogout = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
        navigate("/")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="avatar-online w-10 rounded-full">
              {user.photoURL ? <img alt="" src={user.photoURL} /> : <img alt="" src={avatarImg} />}

            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link to={`/update-profile/${user.email}`}>
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Profile
              </Link>
            </li>
            <li>
              <Link to={`/update-password/${user.email}`}>
                <FontAwesomeIcon icon={faLock} className="mr-2" />
                ChangePassword
              </Link>
            </li>
            <li>
              <a href="/order">
                <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
                Order
              </a>
            </li>
            <li>
              <a href="/dashboard">
                <FontAwesomeIcon icon={faUserTie} className="mr-2" />
                Dashboard
              </a>
            </li>
            <li>
              <a onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
