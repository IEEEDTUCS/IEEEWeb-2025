import Subs from "../models/subsModel.js";
import expressError from "../utils/errorHandler.js";
import webpush from "web-push";

export const saveSubs = async (req, res, next) => {
  const subscription = req.body;

  if (
    !subscription.endpoint ||
    !subscription.keys?.auth ||
    !subscription.keys?.p256dh
  ) {
    return next(new expressError(400, "Invalid subscription object"));
  }

  const found = await Subs.findOne({ endpoint: subscription.endpoint });
  if (found) {
    return next(new expressError(400, "Subscription already exists"));
  }

  const newSubs = new Subs(subscription);
  await newSubs.save();

  res.status(201).json({
    success: true,
    message: "Subscription saved successfully",
  });
};

export const sendNotification = async (req, res, next) => {
  const { title, message } = req.body;

  if (!title || !message) {
    return next(new expressError(400, "Title and message are required"));
  }

  const payload = JSON.stringify({ title, message });

  const allSubs = await Subs.find({});
  if (!allSubs.length) {
    return next(new expressError(400, "No subscriptions found"));
  }

  await Promise.all(
    allSubs.map(async (sub) => {
      try {
        await webpush.sendNotification(sub, payload);
      } catch (err) {
        console.error("Failed to send notification to", sub.endpoint, err);
      }
    })
  );

  res.status(200).json({ success: true, message: "Notifications sent" });
};
