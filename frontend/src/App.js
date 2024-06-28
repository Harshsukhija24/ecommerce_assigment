import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Productdetail from "./Home/Productdetail";
import Cart from "./Cart/Cart";
import Login from "./Login/Login";
import Register from "./Register/Register";
import AdminRegister from "./AdminRegister/AdminRegister";
import AdminLogin from "./AdminLogin/AdminLogin";
import AddProduct from "./AdminHome/AddProduct";
import AdminHome from "./AdminHome/AdminHome";
import Productupdate from "./AdminHome/Productupdate";
import LogoutUser from "./Logoutuser/Logoutuser";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto p-4 flex-1">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Logout" element={<LogoutUser />} />

          <Route path="/Home" element={<Home />} />
          <Route path="/product/:id" element={<Productdetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/Admin/addProduct" element={<AddProduct />} />
          <Route path="/Admin/AdminHome" element={<AdminHome />} />
          <Route path="/Admin/updateProduct/:id" element={<Productupdate />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
