import express from "express";
import {body} from "express-validator";
import {authuser} from "../middleware/auth.middleware.js";
import {createRide} from "../controller/ride.controller.js";

const router = express.Router();

router.post("/create-ride",authuser,
    body("pickup").isString().isLength({min : 3}).notEmpty().withMessage("Pickup is required"),
    body("destination").isString().isLength({min : 3}).notEmpty().withMessage("Destination is required"),
    body("vehicleType").isString().isIn(['auto', 'car', 'moto']).notEmpty().withMessage("Vehicle type is required"),
    createRide);

export default router;