import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true, sparse: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false }, // only used for email/password signups, if you add that later
    avatar: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
