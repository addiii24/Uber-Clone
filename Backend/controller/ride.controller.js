import rideService from "../services/ride.service.js";
import { validationResult, query } from "express-validator";
import captainModel from "../models/captain.model.js";
import { getDistanceAndTime, getAddressCoordinates, getCaptainInTheRadius } from "../services/maps.service.js";
import { SendMessageToSocketid } from "../socket.js";
import { Ride } from "../models/ride.model.js";

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

        // ---- Everything below runs AFTER the 201 is sent ----
        console.log("🚗 Ride created:", ride._id, "| geocoding pickup...");

        let CaptainInRadius = [];
        try {
            const Pickupcoordinates = await getAddressCoordinates(pickup);
            console.log("📍 Pickup coordinates:", Pickupcoordinates);

            CaptainInRadius = await getCaptainInTheRadius(Pickupcoordinates.ltd, Pickupcoordinates.lng);
            console.log(`👥 Captains found via $near: ${CaptainInRadius.length}`);
        } catch (geoErr) {
            console.warn("⚠️ Geo lookup failed:", geoErr.message, "— falling back to all captains");
        }

        // Fallback: if geo query returns 0, get all captains who have a socketId
        if (CaptainInRadius.length === 0) {
            console.log("🔄 Fallback: fetching all captains with socketId...");
            CaptainInRadius = await captainModel.find({ socketId: { $exists: true, $ne: null } });
            console.log(`👥 Fallback captains found: ${CaptainInRadius.length}`);
        }

        ride.otp = "";
        const rideWithUser = await Ride.findOne({ _id: ride._id }).populate('user');

        CaptainInRadius.forEach(captain => {
            if (captain.socketId) {
                console.log(`📤 Sending new-ride to captain ${captain._id} (socket: ${captain.socketId})`);
                SendMessageToSocketid(captain.socketId, "new-ride", rideWithUser);
            } else {
                console.warn(`⚠️ Captain ${captain._id} has no socketId, skipping`);
            }
        });

    } catch (error) {
        console.error("createRide error:", error.message);
        if (!res.headersSent) {
            res.status(500).json({success: false, message: error.message});
        }
    }
}

const getFare = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({success: false, errors: errors.array()});
        }
        const { pickup, destination } = req.query;
        const fare = await rideService.getFare(pickup, destination);
        res.status(200).json({success: true, fare});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

const confirmRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({success: false, errors: errors.array()});
        }
        const { rideId } = req.body;
        const captainid = req.captain._id;
        const ride = await rideService.confirmride({rideId, captainid});

        console.log(`✅ Ride confirmed. User: ${ride.user?._id}, SocketId: ${ride.user?.socketId}`);

        if (!ride.user?.socketId) {
            console.warn("⚠️ No socketId for user — ride-confirmed event NOT sent!");
        } else {
            SendMessageToSocketid(ride.user.socketId, "ride-confirmed", ride);
            console.log(`📤 ride-confirmed sent to socketId: ${ride.user.socketId}`);
        }

        res.status(200).json({success: true, ride});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

const startRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({success: false, errors: errors.array()});
        }
        const { rideId, otp } = req.query;
        const ride = await rideService.startride({rideId, otp, captainid: req.captain._id});
        
        SendMessageToSocketid(ride.user.socketId, "ride-started", ride);

        res.status(200).json({success: true, ride});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

const endRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({success: false, errors: errors.array()});
        }
        const { rideId } = req.body;
        const ride = await rideService.endride({rideId, captainid: req.captain._id});
        SendMessageToSocketid(ride.user.socketId, "ride-ended", ride);
        
        res.status(200).json({success: true, ride});


    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

const getUserRideHistory = async (req, res) => {
    try {
        const rides = await rideService.getUserRideHistory({userid: req.user._id});
        res.status(200).json({success: true, rides});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export {createRide, getFare, confirmRide, startRide, endRide, getUserRideHistory} ; 