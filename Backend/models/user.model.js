import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullname : {
        firstname : {
            type : String,
            required : true,
            trim : true,
            minlength : [3, "First name must be at least 3 characters long"],
            maxlength : [30, "First name must be at most 30 characters long"]
        },
        lastname : {
            type : String,
            trim : true,
            minlength : [3, "First name must be at least 3 characters long"],
            maxlength : [30, "First name must be at most 30 characters long"]
        }
    },
    email : {
        type : String,
        required : true,    
        unique : true,
        trim : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    soketId : {
        type : String,
        default : ""
    }
}, { timestamps: true });

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model("user", userSchema);
export default userModel;
