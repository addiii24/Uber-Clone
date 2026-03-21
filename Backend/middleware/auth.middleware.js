import userModel from "../models/user.model.js";
import jwt from jsonwebtoken;
import bcrypt from bcrypt;

export const authuser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user; 
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}