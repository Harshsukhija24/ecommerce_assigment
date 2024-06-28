import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../Redux/cartSlice";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  console.log("Cart items:", cartItems); // Log cart items
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    console.log("Removing item with id:", id); // Log item id to be removed
    dispatch(removeItem(id));
  };

  return (
    <>
      <Nav />
      <div className="container mx-auto px-4 mt-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="text-gray-700 text-lg">Your cart is empty</div>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <div className="w-full md:w-3/4 flex flex-col md:flex-row justify-between items-center">
                  <div className="text-center md:text-left">
                    <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                    <p className="text-gray-700">Price: ${item.price}</p>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 md:mt-0"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
