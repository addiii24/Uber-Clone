import captainModel from "../models/captain.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import blacklistTokenModel from "../models/blacklistToken.model.js";

export const authcaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
        if (!token) {
            return res.status(401).json({ message: "Unauthorized Token" });
        }
        
        const istokenblacklisted = await blacklistTokenModel.findOne({token : token});
        if(istokenblacklisted){
            return res.status(401).json({ message: "Token is blacklisted"  });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await captainModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized User" });
        }
        req.user = user; 
        req.token = token; 
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}