import Email from "../models/emailModel.js";
import expressError from "../utils/errorHandler.js";
import nodeMailer from "nodemailer";

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

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (req, res, next) => {
  const { subject, message } = req.body;

  if (!subject || !message) {
    return next(new expressError(400, "Subject and message are required"));
  }
  const emails = await Email.find().select("email -_id");
  const emailList = emails.map((e) => e.email); 
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emailList,
    subject: subject,
    text: message,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return next(new expressError(500, "Failed to send emails"));
    } else {
      res.status(200).json({
        success: true,
        message: "Emails sent successfully",
      });
    }
  });
};


