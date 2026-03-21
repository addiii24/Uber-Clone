import captainmodel from "../models/captain.model.js";
import createcaptain from "../services/captain.service.js";
import { validationResult } from "express-validator";

export const registercaptain = async(re,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors : error.array()})
    }

    const {fullname,email,password,vehicle} = req.body;

    const iscpatainAlreadyexist = await captainmodel.findOne({email});
    if(iscpatainAlreadyexist){
        return res.status(400).json({message : "Captain already exists"});
    } 
    
    let fn = fullname.firstname;
    let ln = fullname.lastname;

    if(!fn && fullname && typeof fullname === "object"){
        fn = fullname.firstname;
        ln = fullname.lastname;
    }
    if(!fn && typeof fullname === "string"){
        [fn,ln] = fullname.split(" ");
    }

    try {
        const captain = await createcaptain (
            fn,
            ln,
            email,
            password,
            vehicle.color,
            vehicle.plate,
            vehicle.capacity,
            vehicle.vehicletype
        );
        res.status(201).json({ message: "Captain registered successfully", captain });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    const token = captain.generateAuthToken();

    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge:24*60*60*1000
    })  

    res.status(200).json({ message: "Captain logged in successfully", captain, token });    
}

