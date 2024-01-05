import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        Name: { type: String, required: true },
        Email: { type: String, required: true },
        Password: { type: String, required: true },
        Phone: { type: Number, required: true },
        Gender: { type: String, required: true },
        Hear: { type: String, required: true },
        City: { type: String, required: true },
        State: { type: String, required: true },
        usersDetails: [ { type: mongoose.Schema.Types.ObjectId, ref: "Users" } ],
        Date: { type: Date, default: Date.now }
    }
)

export const SignUp = mongoose.model('SignUp', UserSchema);
