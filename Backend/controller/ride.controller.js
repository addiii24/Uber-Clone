import rideService from "../services/ride.service.js";
import { validationResult } from "express-validator";

const createRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({success: false, errors: errors.array()});
        }
        const { pickup, destination, vehicleType } = req.body;
        const userid = req.user._id;
        const ride = await rideService.createride({userid, pickup, destination, vehicleType});
        res.status(201).json({success: true, ride});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export {createRide} ; 