// Nav.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage (or sessionStorage)
    localStorage.removeItem("token");
    // Navigate to login route
    navigate("/login"); // Replace '/login' with your actual login route
  };

  return (
    <nav className="bg-blue-500 shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/Home" className="text-white text-2xl font-bold">
            E-Commerce
          </Link>
        </div>
        <div className="flex items-center">
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/cart"
                className="text-white hover:text-gray-200 transition-colors duration-200 flex items-center"
              >
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                Cart
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-200 transition-colors duration-200 flex items-center"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
