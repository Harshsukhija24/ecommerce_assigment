import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Login successful
        alert("Login successful!");
        // Navigate to another page after successful login
        navigate("/Home"); // Replace "/" with your desired redirect path
      } else {
        // Login failed
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in. Please try again.");
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
      <div className="container mx-auto flex justify-end p-4">
        {/* Left side: Introductory text */}
        <div className="w-1/2 hidden mt-7 ml-7 md:block">
          <h1 className="text-4xl font-bold text-black mb-4">
            Welcome to eCommerce
          </h1>
          <p className="text-black text-lg">
            Discover a wide range of products and enjoy a seamless shopping
            experience.
          </p>
        </div>
        {/* Right side: Login form */}
        <div className="w-full md:w-1/2 p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl text-black font-bold">Login</h1>
          </div>
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-black font-bold mb-2"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-black font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-black  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign In
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-white">
                New to eCommerce?{" "}
                <Link
                  to="/Register"
                  className=" text-gray-400 hover:text-blue-700 font-bold"
                >
                  Sign Up
                </Link>
              </p>
            </div>
            <div className="mt-4 text-center">
              <p className="text-white">
                Are you a company employee?{" "}
                <Link
                  to="/admin/Login"
                  className="text-gray-400 hover:text-blue-700 font-bold"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
