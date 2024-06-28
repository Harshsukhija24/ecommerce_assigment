import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage (or sessionStorage)
    localStorage.removeItem("token");
    // Navigate to login route
    navigate("/admin/login"); // Replace '/login' with your actual login route
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-blue-500 py-4 z-10">
      <div className="container mx-auto flex justify-between items-center px-4">
        <p className="text-white text-xl font-bold">E Commerce</p>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/Admin/addProduct"
              className="text-white hover:text-gray-200 transition-colors duration-200"
            >
              Add Product
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-200 transition-colors duration-200 focus:outline-none"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
