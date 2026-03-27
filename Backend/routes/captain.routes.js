import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { registercaptain, logincaptain, captainprofile, logoutcaptain, updateCaptainProfile, deleteCaptainAccount } from "../controller/captain.controller.js";
import { authcaptain } from "../middleware/captainauth.middleware.js";

router.post("/register",
    body("fullname.firstname").isLength({min:3}).withMessage("First name must be at least 3 characters long"),
    body("fullname.lastname").isLength({min:3}).withMessage("Last name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email"),
    body("mobile").isLength({min:10}).withMessage("Mobile number must be at least 10 digits long"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    body("vehicle.color").isLength({min:3}).withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate").isLength({min:3}).withMessage("Plate must be at least 3 characters long"),
    body("vehicle.capacity").isLength({min:1}).withMessage("Capacity must be at least 1"),
    body("vehicle.vehicletype").isLength({min:3}).withMessage("Vehicle type must be at least 3 characters long"),
    registercaptain);

router.post("/login", [ 
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
],logincaptain);

router.get("/profile",authcaptain,captainprofile);

router.post("/logout",authcaptain,logoutcaptain);

router.put("/update-profile", authcaptain, [
    body("email").optional().isEmail().withMessage("Invalid email format"),
    body("firstname").optional().isLength({ min: 3 }).withMessage("First name must be at least 3 characters"),
    body("lastname").optional().isLength({ min: 3 }).withMessage("Last name must be at least 3 characters"),
    body("mobile").optional().isLength({ min: 10, max: 10 }).withMessage("Mobile must be 10 digits"),
], updateCaptainProfile);

router.delete("/delete-account", authcaptain, deleteCaptainAccount);

export default router;
