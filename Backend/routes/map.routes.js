import express from "express";
import {authuser} from "../middleware/auth.middleware.js";
import {getcoordinates} from "../controller/map.controller.js";
import {query} from "express-validator";

const router = express.Router();

router.get("/get-coordinates",authuser,
    query("address").isString().isLength({min : 3}).notEmpty().withMessage("Address is required"),
    getcoordinates);

export default router;