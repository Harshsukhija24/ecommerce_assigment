import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutUser = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage (or sessionStorage)
    localStorage.removeItem("token");
    // Navigate to login route
    navigate("/login"); // Replace '/login' with your actual login route
  };

  // Example: Fetching username from localStorage
  const username = localStorage.getItem("username");

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        {username && (
          <p className="text-gray-600 text-lg mb-4">
            Logged in as: <span className="font-semibold">{username}</span>
          </p>
        )}
        <button
          onClick={handleLogout}
          className="bg-blue-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutUser;
