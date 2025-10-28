import Email from "../models/emailModel.js";
import ExpressError from "../utils/expressError.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

export const saveEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) throw new ExpressError(400, "Email is required");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new ExpressError(400, "Invalid email format");

    const exists = await Email.findOne({ email });
    if (exists) throw new ExpressError(400, "Email already registered");

    const newEmail = new Email({ email });
    await newEmail.save();

    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Subscription Confirmed!",
      text: `Hey there! 🎉 You’ve successfully subscribed to our newsletter. Stay tuned for updates.`,
    };
    await transporter.sendMail(userMailOptions);

    res.status(201).json({
      success: true,
      message: "Email registered and confirmation sent successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const sendEmail = async (req, res, next) => {
  try {
    const { subject, message } = req.body;

    if (!subject || !message)
      throw new ExpressError(400, "Subject and message are required");

    const emails = await Email.find().select("email -_id");
    if (!emails.length)
      throw new ExpressError(404, "No registered emails found");

    const recipientList = emails.map((e) => e.email);
    const batchSize = 50;

    for (let i = 0; i < recipientList.length; i += batchSize) {
      const batch = recipientList.slice(i, i + batchSize);
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: batch.join(","),
        subject,
        text: message,
      };
      await transporter.sendMail(mailOptions);
    }

    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: " Newsletter Sent Successfully",
      text: `The newsletter titled "${subject}" has been successfully sent to ${recipientList.length} subscribers.`,
    };
    await transporter.sendMail(adminMailOptions);

    res.status(200).json({
      success: true,
      message: "Emails sent successfully and admin notified",
    });
  } catch (err) {
    next(new ExpressError(500, err.message || "Failed to send emails"));
  }
};




