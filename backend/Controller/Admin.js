import Admin from "../Model/Admin.js";
import jwt from "jsonwebtoken";

const ADMIN_VERIFY_KEY = "Hello"; // Replace with your static admin verification key

// Admin login controller
export const adminLogin = async (req, res) => {
  const { email, password, verifyKey } = req.body;

  // Check the static admin verification key
  if (verifyKey !== ADMIN_VERIFY_KEY) {
    return res.status(401).json({ message: "Invalid verification key" });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Check if the password matches
    if (password !== admin.password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { adminId: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin registration controller
export const adminRegister = async (req, res) => {
  const { name, email, password, verifyKey } = req.body;

  // Check the static admin verification key
  if (verifyKey !== ADMIN_VERIFY_KEY) {
    return res.status(401).json({ message: "Invalid verification key" });
  }

  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create a new admin user
    const newAdmin = new Admin({
      name,
      email,
      password,
    });

    // Save the new admin user to the database
    await newAdmin.save();

    // Generate a JWT token
    const token = jwt.sign(
      { adminId: newAdmin._id, email: newAdmin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
