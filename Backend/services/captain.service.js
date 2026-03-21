import captainModel from "../models/captain.model.js";
import bcrypt from "bcryptjs";

const createcaptain = async (firstname, lastname, email, password, color, plate, capacity, vehicletype) => {
    if (!firstname || !email || !password  || !color || !plate || !capacity || !vehicletype) {
        throw new Error("All fields are required");
    }

    const existing = await captainModel.findOne({ email });
    if (existing) {
        throw new Error("Email already in use");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await captainModel.create({
        fullname: {
            firstname: firstname,
            lastname: lastname || ""
        }, 
        email: email,
        password: hashed,
        vehicle: {
            color: color,
            plate: plate,
            capacity: capacity,
            vehicletype: vehicletype
        }
    });
    // await user.save();
    return user;
}

export { createcaptain };