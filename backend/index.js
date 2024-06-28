import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // Import cors middleware
import userRoute from "./Routes/UserRoute.js";
import AdminRoute from "./Routes/AdminRoute.js";
import ProductRoute from "./Routes/PostRoute.js";
import { connectDb } from "./config/connectdb.js";

dotenv.config({ path: "./.env.local" });

const app = express();

app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3001", // Frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type"], // Allowed headers
};

app.use(cors(corsOptions));

connectDb();

app.use("/api/users", userRoute);
app.use("/api/admin", AdminRoute);
app.use("/api", ProductRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
