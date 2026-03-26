import { getAddressCoordinates, getDistanceAndTime, getAutosuggetions, getCaptainInTheRadius } from "../services/maps.service.js";
import {validationResult} from "express-validator";

export const getcoordinates = async (req, res) => {
    try {
        const { address } = req.query;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const coordinates = await getAddressCoordinates(address);
        res.status(200).json({
            success: true,
            message: "Coordinates fetched successfully",
            data: coordinates
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Failed to fetch coordinates",
            error: error.message
        });
    }
}

export const getdistanceandtime = async (req, res) => {
    try {
        const { origin, destination } = req.query;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
         const distanceandtime = await getDistanceAndTime(origin, destination); //map.Service.js  
        res.status(200).json({
            success: true,
            message: "Distance and time fetched successfully",
            data: distanceandtime
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Failed to fetch distance and time",
            error: error.message
        });
    }
}

export const getautosuggetions = async (req, res) => {
    try {
        const { input } = req.query;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const autosuggetions = await getAutosuggetions(input);
        res.status(200).json({
            success: true,
            message: "Autosuggetions fetched successfully",
            data: autosuggetions
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Failed to fetch autosuggetions",
            error: error.message
        });
    }
}

export const getCaptainNearby = async (req, res) => {
    try {
        const { ltd, lng } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const captains = await getCaptainInTheRadius(ltd, lng);
        res.status(200).json({
            success: true,
            message: "Captains fetched successfully",
            data: captains
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Failed to fetch captains",
            error: error.message
        });
    }
}

