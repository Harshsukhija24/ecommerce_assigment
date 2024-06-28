import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavAdmin from "../Components/NavAdmin";
import Footer from "../Components/Footer";
const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/product");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log("Error fetching products:", error);
        // Handle the error condition, such as setting a state for error message
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <NavAdmin />
      <div className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <li
                key={product._id}
                onClick={() => navigate(`/Admin/updateProduct/${product._id}`)}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-200 cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-700">{product.description}</p>
                <p className="text-gray-900 font-bold">${product.price}</p>
              </li>
            ))
          ) : (
            <p className="text-center col-span-3">Loading products...</p>
          )}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Home;
