import { getAddressCoordinates } from "../services/maps.service.js";
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

