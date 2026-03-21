import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            trim: true,
            minlength: [3,"First name must be at least 3 characters long"]
        },
        lastname: {
            type: String,
            trim: true,
            minlength: [3,"Last name must be at least 3 characters long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match : /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        required: true,
        minlength: [6,"Password must be at least 6 characters long"]
    },
    soketId:{
        type : String
    },
    status:{
        type : String,
        enum : ["active","inactive"],
        default : "inactive"
    },
    vehicle:{
        color:{
            type : String,
            required : true,
            minlength : [3,"Color must be at least 3 characters long"]
        },
        plate:{
            type : String,
            required : true,
            minlength : [3,"Plate must be at least 3 characters long"]
        },
        capacity:{
            type : Number,
            required : true,
            minlength : [1,"Capacity must be at least 1"]
        },
        vehicletype:{
            type : String,
            required : true,
            enum : ["car","bike","auto"],
            default : "car"
        }
    },
    location:{
        lat : {
            type: Number
        },
        long :{
            type: Number
        }
    }
})

captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

captainSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model("captain", captainSchema);

export default captainModel;