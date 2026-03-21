import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", true);

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB at:", process.env.MONGODB_URL); // 👈 Add this
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.log("❌ MongoDB connection error:", error.message);
        process.exit(1);
    }
};

export { connectDB };