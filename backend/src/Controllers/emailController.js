import Email from "../models/emailModel.js";
import expressError from "../utils/errorHandler.js";

export const saveEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new expressError(400, "Email is required"));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(new expressError(400, "Invalid email format"));
  }

  const found = await Email.findOne({ email });
  if (found) {
    return next(new expressError(400, "Email already registered"));
  }

  const newEmail = new Email({ email });
  await newEmail.save();

  res.status(201).json({
    success: true,
    message: "Email registered successfully",
  });
};

