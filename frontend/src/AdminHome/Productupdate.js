import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavAdmin from "../Components/NavAdmin";
import Footer from "../Components/Footer";

const Productupdate = () => {
  const { id } = useParams(); // Fetching the product ID from URL params
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching product data...");
    // Fetch the product data based on the ID
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://ecommerce-assigment.vercel.app/api/product/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Product data fetched successfully:", data);
          setName(data.name);
          setDescription(data.description);
          setPrice(data.price);
          setImage(data.image);
          setCountInStock(data.countInStock);
        } else {
          console.error("Failed to fetch product:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting product update...");

    const productData = { name, description, price, image, countInStock };
    console.log("Product data to be updated:", productData);

    try {
      const response = await fetch(
        `https://ecommerce-assigment.vercel.app/api/product/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Product updated successfully:", data);
        navigate("/admin/AdminHome");
      } else {
        const errorData = await response.json();
        console.error("Product update failed:", errorData);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log("Deleting product...");
      try {
        const response = await fetch(
          `https://ecommerce-assigment.vercel.app/api/product/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          console.log("Product deleted successfully");
          navigate("/admin/AdminHome");
        } else {
          const errorData = await response.json();
          console.error("Product deletion failed:", errorData);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <>
      <NavAdmin />
      <div className="container mx-auto mt-8 p-4 flex flex-col md:flex-row">
        {/* Left side: Image */}
        <div className="md:w-1/2 w-full mb-4 md:mb-0 flex justify-center">
          <img
            src={image}
            alt="Product"
            className="rounded-lg shadow-lg"
            style={{ maxWidth: "100%", maxHeight: "auto" }}
          />
        </div>
        {/* Right side: Form */}
        <div className="md:w-1/2 w-full">
          <h1 className="text-3xl font-bold mb-4 text-center md:text-left">
            Update Product
          </h1>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="4"
                required
              />
            </div>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="price"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Price ($)
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="countInStock"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="countInStock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(Number(e.target.value))}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  min="0"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="image"
                className="block text-gray-700 font-bold mb-2"
              >
                Image URL
              </label>
              <input
                type="url"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              >
                Update Product
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleDelete}
              >
                Delete Product
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Productupdate;
