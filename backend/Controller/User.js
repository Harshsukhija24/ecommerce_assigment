import bcrypt from "bcryptjs"; // For password hashing
import jwt from "jsonwebtoken"; // For creating JSON Web Tokens
import User from "../Model/User.js"; // Import the User model

let tokenBlacklist = new Set(); // In-memory token blacklist

// Controller function to handle user registration
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user instance
    user = new User({
      name,
      email,
      password,
    });

    // Hash the password
    user.password = await bcrypt.hash(password, 10); // Hashing without an explicit salt

    // Save the user to the database
    await user.save();

    // Create and return a JSON Web Token (JWT)
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller function to handle user login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Validate the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Create and return a JSON Web Token (JWT)
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller function to handle user logout
export const logoutUser = (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(400).json({ msg: "No token provided" });
    }

    // Add the token to the blacklist
    tokenBlacklist.add(token);
    res.json({ msg: "User logged out successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Middleware to check if a token is blacklisted
export const isTokenBlacklisted = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ msg: "Token is invalid or expired" });
  }
  next();
};
