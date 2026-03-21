import { validationResult } from "express-validator";
import { createuser } from "../services/user.service.js";
import jwt from "jsonwebtoken"; 
import userModel from "../models/user.model.js";

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