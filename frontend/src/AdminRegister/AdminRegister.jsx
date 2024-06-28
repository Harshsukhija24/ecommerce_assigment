import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyKey, setVerifyKey] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const adminData = { name, email, password, verifyKey };

    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/Adminregister",
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
        console.log("Admin registered successfully:", data);
        // Optionally, you can redirect or show a success message here
        navigate("/Admin/login");
      } else {
        const errorData = await response.json();
        console.error("Admin registration failed:", errorData);
        // Handle registration failure, e.g., show an error message
      }
    } catch (error) {
      console.error("Error registering admin:", error);
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
        <h2 className="text-3xl font-bold mb-4">Admin Registration</h2>
        <p className="text-gray-700">.</p>
      </div>
      <div className="container mx-auto flex justify-center mb-7 items-center h-full">
        <div className="max-w-md w-full p-8">
          <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your name"
                required
              />
            </div>
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
                className="block text-black font-bold mb-2"
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
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-white">
              signin?{" "}
              <Link
                to="/Admin/Login"
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

export default AdminRegister;
