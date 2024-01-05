import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        UserId: { type: mongoose.Schema.Types.ObjectId, ref: "SignUp", required: true },
        Name: { type: String, required: true },
        Email: { type: String, required: true },
        Phone: { type: Number, required: true },
    },
    {
        timestamps: true
    }
)

export const Users = mongoose.model('Users', UserSchema);

