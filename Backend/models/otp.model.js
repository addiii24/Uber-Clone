import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, expires: '5m', default: Date.now } // TTL index automatically expires after 5 minutes
});

export default mongoose.model("otp", otpSchema);
