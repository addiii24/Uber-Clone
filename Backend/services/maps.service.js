import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const getAddressCoordinates = async (address) => {
    const api = process.env.GOOGLE_MAP_API
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${api}`
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
            throw new Error("Address not found")
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getDistanceAndTime = async (origin, destination) => {
    const api = process.env.GOOGLE_MAP_API
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${api}`
    try {
        const response = await axios.get(url);
        if(response.data.status == 'OK'){
            const distance = response.data.rows[0].elements[0].distance.text;
            const time = response.data.rows[0].elements[0].duration.text;
            return {
                distance,
                time
            };
        }
        else{
            throw new Error("Distance and time not found")
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getAutosuggetions = async (input) => {
    const api = process.env.GOOGLE_MAP_API
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${api}`
    try {
        const response = await axios.get(url);
        if(response.data.status == 'OK'){
            const autosuggetions = response.data.predictions.map(prediction => prediction.description).filter(value => value);
            return autosuggetions;
        }
        else{
            throw new Error("Autosuggetions not found")
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}