import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyKey, setVerifyKey] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const adminData = { email, password, verifyKey };

    try {
      const response = await fetch(
        "https://ecommerce-assigment.vercel.app/api/admin/Adminlogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adminData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("adminToken", data.token); // Store token in local storage
        navigate("/Admin/AdminHome"); // Redirect to admin dashboard or desired page
      } else {
        const errorData = await response.json();
        console.error("Admin login failed:", errorData);
        // Handle login failure, e.g., show an error message
      }
    } catch (error) {
      console.error("Error logging in admin:", error);
      // Handle network or other errors
    }
  };

  return (
    <div
      className=" h-full w-full bg-cover bg-center flex items-center absolute top-0 left-0"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/564x/d8/29/f8/d829f86b22c68f0283467144bbc6b959.jpg')",
      }}
    >
      <div className="w-full md:w-1/2 p-6 mb-16 ml-6">
        <h2 className="text-3xl font-bold mb-4">Welcome to Admin Portal</h2>
        <p className="text-black"></p>
      </div>

      <div className="container mx-auto flex justify-center items-center h-full">
        <div className="max-w-md w-full p-8 ">
          <h1 className="text-3xl font-bold mb-4 text-center">Admin Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="verifyKey"
                className="block text-gray-700 font-bold mb-2"
              >
                Verification Key
              </label>
              <input
                type="password"
                id="verifyKey"
                value={verifyKey}
                onChange={(e) => setVerifyKey(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter admin verification key"
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-black w-60 text-xl text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-white">
              New employee?{" "}
              <Link
                to="/Admin/Register"
                className=" text-gray-400 hover:text-blue-700 font-bold"
              >
                Sign Up
              </Link>
            </p>
          </div>
          <div className="mt-4 text-center">
            <p className="text-white">
              New to eCommerce?{" "}
              <Link
                to="/Login"
                className=" text-gray-400 hover:text-blue-700 font-bold"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
