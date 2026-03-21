import { registerUser } from "../controller/user.controller.js";   
import express from "express";
const router = express.Router();
import { body } from "express-validator";

router.post("/register", [
    body("email").isEmail().withMessage("Invalid email format"),
    body("fullname.firstname").isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
    body("fullname.lastname").isLength({ min: 3 }).withMessage("Last name must be at least 3 characters long"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
], registerUser);  // ✅ Fixed here

export default router;
