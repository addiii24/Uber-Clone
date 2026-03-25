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