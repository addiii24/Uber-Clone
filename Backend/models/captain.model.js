import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, "First name must be at least 3 characters long"]
        },
        lastname: {
            type: String,
            trim: true,
            minlength: [3, "Last name must be at least 3 characters long"]
        }
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },

    mobile: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [10, "Mobile number must be at least 10 digits long"],
        maxlength: [10, "Mobile number must be at most 10 digits long"]
    },

    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters long"]
    },

    socketId: {
        type: String
    },

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },

    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "Color must be at least 3 characters long"]
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Plate must be at least 3 characters long"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"]
        },
        vehicletype: {
            type: String,
            required: true,
            enum: ["car", "bike", "auto"],
            default: "car"
        }
    },

    // ✅ FIXED LOCATION FIELD (GeoJSON) - Optional until captain sets location
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: false
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: false
        }
    },

    stats: {
        totalRides: { type: Number, default: 0 },
        totalEarnings: { type: Number, default: 0 },
        totalDistance: { type: Number, default: 0 }
    }

}, { timestamps: true });


// ✅ SPARSE INDEX - Only indexes documents where location exists
captainSchema.index({ location: "2dsphere" }, { sparse: true });


// 🔐 AUTH METHODS
captainSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );
};

captainSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};


const captainModel = mongoose.model("captain", captainSchema);

export default captainModel;