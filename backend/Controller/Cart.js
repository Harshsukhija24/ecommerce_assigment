const CartItem = require("../models/CartItem");

// Fetch all cart items
const getCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Check if item already exists in cart
    let cartItem = await CartItem.findOne({ productId });

    if (cartItem) {
      // Update quantity if item exists
      cartItem.quantity += parseInt(quantity);
    } else {
      // Create new cart item if not exists
      cartItem = new CartItem({ productId, quantity });
    }

    // Save or update cart item
    await cartItem.save();

    res.json({ message: "Item added to cart successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add item to cart" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  const { id } = req.params;

  try {
    // Find item by ID and remove
    await CartItem.findByIdAndRemove(id);
    res.json({ message: "Item removed from cart successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
};

module.exports = {
  getCartItems,
  addToCart,
  removeFromCart,
};
