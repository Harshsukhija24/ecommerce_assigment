import express from "express";
import { adminLogin, adminRegister } from "../Controller/Admin.js";

const router = express.Router();

// Admin login route
router.post("/Adminlogin", adminLogin);

// Admin registration route
router.post("/Adminregister", adminRegister);

export default router;
