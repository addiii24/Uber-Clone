import express from "express";
import {body, query} from "express-validator";
import {authuser} from "../middleware/auth.middleware.js";
import {authcaptain} from "../middleware/captainauth.middleware.js"
import {createRide, getFare, confirmRide, startRide} from "../controller/ride.controller.js";

const router = express.Router();

router.post("/create-ride",authuser,
    body("pickup").isString().isLength({min : 3}).notEmpty().withMessage("Pickup is required"),
    body("destination").isString().isLength({min : 3}).notEmpty().withMessage("Destination is required"),
    body("vehicleType").isString().isIn(['auto', 'car', 'moto']).notEmpty().withMessage("Vehicle type is required"),
    createRide);

router.get("/get-fare",authuser,
    query("pickup").isString().isLength({min : 3}).notEmpty().withMessage("Pickup is required"),
    query("destination").isString().isLength({min : 3}).notEmpty().withMessage("Destination is required"),
    getFare);

router.post("/confirm", authcaptain,
    body("rideId").isString().notEmpty().withMessage("Ride ID is required"),
    confirmRide
)

router.get("/start-ride",authcaptain,
    query("rideId").isString().notEmpty().withMessage("Ride ID is required"),
    query("otp").isString().isLength({min : 6, max : 6}).notEmpty().withMessage("OTP is required"),
    startRide
)

export default router;