import express from "express";
import {authuser} from "../middleware/auth.middleware.js";
import {getcoordinates, getdistanceandtime, getautosuggetions} from "../controller/map.controller.js";
import {query} from "express-validator";

const router = express.Router();

router.get("/get-coordinates",authuser,
    query("address").isString().isLength({min : 3}).notEmpty().withMessage("Address is required"),
    getcoordinates);

router.get("/get-distance-time",authuser,
    query("origin").isString().isLength({min : 3}).notEmpty().withMessage("Origin is required"),
    query("destination").isString().isLength({min : 3}).notEmpty().withMessage("Destination is required"),
    getdistanceandtime
)

router.get("/get-autosuggetions",authuser,
    query("input").isString().isLength({min : 3}).notEmpty().withMessage("Input is required"),
    getautosuggetions
)

export default router;