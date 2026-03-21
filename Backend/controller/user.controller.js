import { validationResult } from "express-validator";
import { createuser } from "../services/user.service.js";
import jwt from "jsonwebtoken"; 
import userModel from "../models/user.model.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";
import cookieParser from "cookie-parser";

export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, fullname, email, password } = req.body;

    let fn = firstname, ln = lastname;
    
    if (!fn && fullname && typeof fullname === "object") {
        fn = fullname.firstname;
        ln = fullname.lastname;
    }
    if (!fn && typeof fullname === "string") {
        [fn, ln] = fullname.split(" ");
    }

    try {
        const user = await createuser(fn, ln, email, password);
        // Generate token directly here instead of using model method
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET || 'fallbacksecret',
            { expiresIn: '24h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            maxAge: 24*60*60*1000
        });
        
        res.status(201).json({ 
            message: "User registered successfully", 
            user: {
                id: user._id,
                email: user.email,
                fullname: user.fullname
            }, 
            token 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const user = await userModel.findOne({ email }).select("+password");
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

export const userprofile = async (req, res) => {
    

    res.status(200).json({ 
        message: "User profile fetched successfully", 
        user: req.user
    });
}

export const logout = async (req,res) => {
   try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

     if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }

    await blacklistTokenModel.create({ token });

    res.clearCookie("token");

    res.status(200).json({ message: "User logged out successfully" });

   }
   catch(error){
         res.status(500).json({ message: error.message });

   }
}
        