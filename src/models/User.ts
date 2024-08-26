import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, select: false },
  confirmPassword: { type: String, select: false },
  authProviderId: { type: String },
  image:{type: String}
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);