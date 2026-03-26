import express from "express";
import jwt from "jsonwebtoken";
import {authuser} from "../middleware/auth.middleware.js";
import {authcaptain} from "../middleware/captainauth.middleware.js";
import userModel from "../models/user.model.js";
import captainModel from "../models/captain.model.js";
import {getcoordinates, getdistanceandtime, getautosuggetions} from "../controller/map.controller.js";
import {query} from "express-validator";

const router = express.Router();

// Accepts either a user token OR a captain token
const authAny = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Try user first, then captain
        const user = await userModel.findById(decoded.id);
        if (user) { req.user = user; return next(); }

        const captain = await captainModel.findById(decoded.id);
        if (captain) { req.captain = captain; req.user = captain; return next(); }

        return res.status(401).json({ message: "Unauthorized" });
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

router.get("/get-coordinates", authuser,
    query("address").isString().isLength({min : 3}).notEmpty().withMessage("Address is required"),
    getcoordinates);

router.get("/get-distance-time", authAny,
    query("origin").isString().isLength({min : 3}).notEmpty().withMessage("Origin is required"),
    query("destination").isString().isLength({min : 3}).notEmpty().withMessage("Destination is required"),
    getdistanceandtime
)

router.get("/get-autosuggetions",authuser,
    query("input").isString().isLength({min : 3}).notEmpty().withMessage("Input is required"),
    getautosuggetions
)

export default router;