import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../Redux/cartSlice";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";

const Productdetail = () => {
  const [productDetail, setProductDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/product/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product detail");
        }
        const data = await response.json();
        console.log("Fetched product details:", data); // Log fetched data
        setProductDetail(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleAddToCart = () => {
    console.log("Adding to cart:", productDetail); // Log product detail before adding
    dispatch(
      addItem({
        id: productDetail._id,
        name: productDetail.name,
        price: productDetail.price,
      })
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Nav />
      <div className="container mx-auto px-4 mt-6 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              src={productDetail.image}
              alt={productDetail.name}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
            <h1 className="text-3xl font-bold mb-4">{productDetail.name}</h1>
            <p className="text-gray-700 mb-4">{productDetail.description}</p>
            <p className="text-gray-900 font-bold text-xl mb-2">
              Price: ${productDetail.price}
            </p>
            <p className="text-gray-700 mb-4">
              In Stock: {productDetail.countInStock}
            </p>

            <button
              onClick={handleAddToCart}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Productdetail;
