import bcrypt from "bcrypt";
import { User } from "../models/users.js";
import { generateOTP, hashOTP } from "../utils/otp.js";
import { transporter } from "../config/mailer.js";

// login and sending otp
export const loginAndSendOTP = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid password" });

  const otp = generateOTP();
  user.otp = hashOTP(otp);
  user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min
  await user.save();

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "🔐 Your Login OTP",
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  });

  res.json({ success: true, message: "OTP sent to email" });
};

// verify otp
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (Date.now() > user.otpExpiry)
    return res.status(400).json({ message: "OTP expired" });

  const hashedOtp = hashOTP(otp);
  if (hashedOtp !== user.otp)
    return res.status(400).json({ message: "Invalid OTP" });

  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  res.json({
    success: true,
    message: "Login successful",
    role: user.role
  });
};
