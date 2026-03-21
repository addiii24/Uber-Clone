import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const createuser = async (firstname, lastname, email, password) => {
    if (!firstname || !email || !password) {
        throw new Error("All fields are required");
    }

    const existing = await User.findOne({ email });
    if (existing) {
        throw new Error("Email already in use");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
        fullname: {
            firstname: firstname,
            lastname: lastname || ""
        },
        email: email,
        password: hashed
    });
    await user.save();
    return user;
}

export { createuser };