const express = require("express");
const router = express.Router();
const {
  getCartItems,
  addToCart,
  removeFromCart,
} = require("../controllers/cart.js");

// Routes
router.get("/items", getCartItems);
router.post("/add", addToCart);
router.delete("/remove/:id", removeFromCart);

module.exports = router;
