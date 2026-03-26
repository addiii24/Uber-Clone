import axios from 'axios';
import dotenv from 'dotenv';
import {body} from 'express-validator'
import captainModel from '../models/captain.model.js';
dotenv.config();

export const getAddressCoordinates = async (address) => {
    const api = process.env.GOOGLE_MAP_API
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${api}`
    try {
        const response = await axios.get(url);
        if(response.data.status == 'OK'){
            const location = response.data.results[0].geometry.location;
            return {
                ltd : location.lat,
                lng : location.lng
            };
        }
        else{
            throw new Error(response.data.error_message || "Address not found")
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getDistanceAndTime = async (origin, destination) => {
    const api = process.env.GOOGLE_MAP_API
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${api}`
    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error("No routes found between these locations");
            }
            return {
                distance: response.data.rows[0].elements[0].distance,
                duration: response.data.rows[0].elements[0].duration
            };
        }
        else{
            throw new Error(response.data.error_message || `Distance and time not found (Status: ${response.data.status})`)
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getAutosuggetions = async (input) => {
    const api = process.env.GOOGLE_MAP_API
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${api}`
    try {
        const response = await axios.get(url);
        if(response.data.status == 'OK'){
            const autosuggetions = response.data.predictions.map(prediction => prediction.description).filter(value => value);
            return autosuggetions;
        }
        else{
            throw new Error(response.data.error_message || "Autosuggetions not found")
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getCaptainInTheRadius = async (ltd, lng) => {
    try {
        const captains = await captainModel.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, ltd] // ✅ correct order
                    },
                    $maxDistance: 10000 // 10km
                }
            }
        });

        return captains;

    } catch (error) {
        console.error("Error finding captains:", error);
        throw error;
    }
}