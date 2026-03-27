import captainModel from "../models/captain.model.js";
import { createcaptain } from "../services/captain.service.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import blacklistTokenModel from "../models/blacklistToken.model.js";
import cookieParser from "cookie-parser";

export const registercaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, mobile, password, vehicle } = req.body;

    const iscpatainAlreadyexist = await captainModel.findOne({ email });
    if (iscpatainAlreadyexist) {
        return res.status(400).json({ message: "Captain already exists" });
    }

    let fn = fullname?.firstname;
    let ln = fullname?.lastname;

    if (!fn && fullname && typeof fullname === "object") {
        fn = fullname?.firstname;
        ln = fullname?.lastname;
    }
    if (!fn && typeof fullname === "string") {
        [fn, ln] = fullname.split(" ");
    }

    try {
        const captain = await createcaptain(
            fn,
            ln,
            email,
            mobile,
            password,
            vehicle.color,
            vehicle.plate,
            vehicle.capacity,
            vehicle.vehicletype
        );
        const token = jwt.sign(
            { id: captain._id },
            process.env.JWT_SECRET || 'fallbacksecret',
            { expiresIn: '24h' }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        })

         res.status(201).json({ 
            message: "Captain registered successfully", 
            user: {
                id: captain._id,
                email: captain.email,
                fullname: captain.fullname
            }, 
            token 
        });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const logincaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const user = await captainModel?.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({ message: "Invalid email and password" });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email and password" });
    }
    const token = user.generateAuthToken();

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        maxAge: 24*60*60*1000
    });

    res.status(200).json({ 
        message: "User logged in successfully", 
        user: {
            id: user._id,
            email: user.email,
            fullname: user.fullname
        }, 
        token 
    });
}

export const captainprofile = async (req, res) => {
    
    res.status(200).json({ 
        message: "User profile fetched successfully", 
        user: req.user
    });
}

export const logoutcaptain = async (req,res) => {
   try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

     if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }

    await blacklistTokenModel.findOneAndUpdate(
        { token },
        { token },
        { upsert: true }
    );

    res.clearCookie("token");

    res.status(200).json({ message: "Captain logged out successfully" });

   }
   catch(error){
         res.status(500).json({ message: error.message });

   }
}

export const updateCaptainProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { firstname, lastname, email, mobile, vehicleColor, vehiclePlate, vehicleCapacity, vehicleType } = req.body;
        const captainId = req.captain._id;

        const updateData = {};
        if (firstname || lastname) {
            updateData.fullname = {
                firstname: firstname || req.captain?.fullname?.firstname,
                lastname: lastname || req.captain?.fullname?.lastname
            };
        }
        if (email) updateData.email = email;
        if (mobile) updateData.mobile = mobile;
        if (vehicleColor || vehiclePlate || vehicleCapacity || vehicleType) {
            updateData.vehicle = {
                color: vehicleColor || req.captain?.vehicle?.color,
                plate: vehiclePlate || req.captain?.vehicle?.plate,
                capacity: vehicleCapacity || req.captain?.vehicle?.capacity,
                vehicletype: vehicleType || req.captain?.vehicle?.vehicletype
            };
        }

        const updatedCaptain = await captainModel.findByIdAndUpdate(captainId, updateData, { new: true, runValidators: true });
        res.status(200).json({ message: "Profile updated successfully", captain: updatedCaptain });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCaptainAccount = async (req, res) => {
    try {
        const captainId = req.captain._id;
        await captainModel.findByIdAndDelete(captainId);

        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (token) {
            await blacklistTokenModel.findOneAndUpdate(
                { token },
                { token },
                { upsert: true }
            );
        }
        res.clearCookie("token");
        res.status(200).json({ message: "Captain account deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
