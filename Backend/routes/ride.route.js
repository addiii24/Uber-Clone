import express from "express";
import {body} from "express-validator";
import {authuser} from "../middleware/auth.middleware.js";
import {createRide} from "../controller/ride.controller.js";

const router = express.Router();

router.post("/create-ride",authuser,
    body("userid").isString().isLength({min : 24, max : 24}).notEmpty().withMessage("Invalid userid"),
    body("pickup").isString().isLength({min : 3}).notEmpty().withMessage("Pickup is required"),
    body("dropoff").isString().isLength({min : 3}).notEmpty().withMessage("Dropoff is required"),
    createRide);

export default router;