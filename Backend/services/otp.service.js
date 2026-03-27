import nodemailer from "nodemailer";
import crypto from "crypto";
import otpModel from "../models/otp.model.js";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendOtpEmail = async (email) => {
    // Generate 6 digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    
    // Save to DB via upsert
    await otpModel.findOneAndUpdate(
        { email },
        { otp, createdAt: Date.now() },
        { upsert: true, new: true }
    );

    // Send email
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your Registration Verification OTP",
        text: `Your OTP for registration is ${otp}. It is valid for 5 minutes.`
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true, message: "OTP sent successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send OTP email. Please check credentials.");
    }
};

export const verifyOtpToken = async (email, otp) => {
    const record = await otpModel.findOne({ email });
    if (!record) {
        throw new Error("OTP expired or not found");
    }
    if (record.otp !== otp.trim()) {
        throw new Error("Invalid OTP");
    }
    
    // Once verified, delete it to prevent reuse
    await otpModel.deleteOne({ email });
    return true;
};
