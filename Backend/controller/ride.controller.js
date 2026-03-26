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

        const Pickupcoordinates = await getAddressCoordinates(pickup);
        const Destinationcoordinates = await getAddressCoordinates(destination);
        
        console.log({Pickupcoordinates, Destinationcoordinates})

        const CaptainInRadius = await getCaptainInTheRadius(Pickupcoordinates.ltd, Pickupcoordinates.lng);

        ride.otp = ""

        const rideWithUser = await Ride.findOne({ _id: ride._id }).populate('user');


        CaptainInRadius.map(captain => {
            if (captain.socketId) {
                SendMessageToSocketid(captain.socketId, "new-ride", rideWithUser)
            } else {
                console.warn(`Captain ${captain._id} has no socketId, skipping`)
            }
        })
           
    } catch (error) {
        // If response not yet sent, send error. Otherwise just log it.
        console.error("createRide error:", error.message)
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

        SendMessageToSocketid(ride.user.socketId, "ride-confirmed", ride);

        res.status(200).json({success: true, ride});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export {createRide, getFare, confirmRide} ; 