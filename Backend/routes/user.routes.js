import { registerUser,login,userprofile,logout, updateProfile, deleteAccount, sendOtp, verifyOtp } from "../controller/user.controller.js";   
import express from "express";
const router = express.Router();
import { body } from "express-validator";
import {authuser} from "../middleware/auth.middleware.js";


router.post("/register", [
    body("email").isEmail().withMessage("Invalid email format"),
    body("fullname.firstname").isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
    body("fullname.lastname").isLength({ min: 3 }).withMessage("Last name must be at least 3 characters long"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("mobile").isLength({ min: 10, max: 10 }).withMessage("Mobile number must be 10 digits long"),
],registerUser);

router.post("/login", [ 
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
],login);

router.get("/profile",authuser,userprofile);

router.post("/logout",authuser,logout)

router.put("/update-profile", authuser, [
    body("email").optional().isEmail().withMessage("Invalid email format"),
    body("firstname").optional().isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
    body("lastname").optional().isLength({ min: 3 }).withMessage("Last name must be at least 3 characters long"),
    body("mobile").optional().isLength({ min: 10, max: 10 }).withMessage("Mobile number must be 10 digits long"),
], updateProfile);

router.delete("/delete-account", authuser, deleteAccount);

router.post("/send-otp", [
    body("email").isEmail().withMessage("Invalid email format")
], sendOtp);

router.post("/verify-otp", [
    body("email").isEmail().withMessage("Invalid email format"),
    body("otp").isLength({ min: 6, max: 6 }).withMessage("Invalid OTP length")
], verifyOtp);

export default router;
