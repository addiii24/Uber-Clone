import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // TTL of 24 hours (24 * 60 * 60 seconds)
    }
});

const blacklistTokenModel = mongoose.model("BlacklistToken", blacklistTokenSchema);

export default blacklistTokenModel;