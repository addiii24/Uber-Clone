import { Ride } from "../models/ride.model.js";
import {getDistanceAndTime} from "../services/maps.service.js";
import axios from "axios";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();

const getFare = async (pickup, destination) => {
    if(!pickup || !destination){
        throw new Error("Pickup and destination are required");
    }

    const distanceTime = await getDistanceAndTime(pickup, destination);
    
    // distance.value is in meters, duration.value is in seconds
     const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
    };

    return fare;
}

const getOtp = (num) => {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

const createride = async ({userid, pickup, destination, vehicleType}) => {
    try {
        if(!userid || !pickup || !destination || !vehicleType){
            throw new Error("All fields are required");
        }

        const fare = await getFare(pickup, destination);
        
        const ride = await Ride.create({
            user: userid,
            pickup,
            destination,    
            fare: fare[vehicleType],
            vehicleType,
            otp: getOtp(6),
        })
        
        return ride;
    } catch (error) {
        throw error;
    }
}

const confirmride = async ({rideId, captainid}) => {
    try {
        if(!rideId || !captainid){
            throw new Error("All fields are required")
        }

        await Ride.findOneAndUpdate({_id: rideId},{
             captain: captainid,
             status: "accepted"
            });

        const ride = await Ride.findOne({_id: rideId}).populate("user").populate("captain").select('+otp');
        if(!ride){
            throw new Error("Ride not found");
        }
        
        return ride;
    } catch (error) {
        throw error;
    }
}

export default { getFare, createride, confirmride };