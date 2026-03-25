import express from "express";
import {body, query} from "express-validator";
import {authuser} from "../middleware/auth.middleware.js";
import {createRide, getFare} from "../controller/ride.controller.js";

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

export default router;