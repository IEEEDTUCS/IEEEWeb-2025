import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    otp: String,
    otpExpiry: Date,

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Create indexes for faster queries
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

export const User = mongoose.model("User", userSchema);