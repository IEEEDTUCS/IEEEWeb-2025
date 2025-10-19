import Subs from "../models/subsModel.js";
import expressError from "../utils/errorHandler.js";
import webpush from "web-push";

export const saveSubs = async (req, res, next) => {
  const subscription = req.body;
  // console.log(subscription);
  
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

  // 1. Validate Input
  if (!title || !message) {
    return next(new expressError(400, "Title and message are required"));
  }

  // 2. Prepare Payload (Add an icon from your PWA's public folder)
  const payload = JSON.stringify({
    title,
    message,
    icon: '/pwa-192x192.png' // Or your preferred icon path
  });

  try {
    // 3. Fetch Subscriptions
    const allSubs = await Subs.find({});
    if (!allSubs.length) {
      // Use return here if not using next() for final responses in controllers
      return res.status(404).json({ success: false, message: "No subscriptions found" });
      // return next(new expressError(404, "No subscriptions found")); // Alternative if using next()
    }

    console.log(`Attempting to send notification to ${allSubs.length} subscribers...`);

    // 4. Send Notifications Concurrently & Handle Results
    const results = await Promise.allSettled( // Use allSettled to process all, even failures
      allSubs.map(async (sub) => {
        try {
          // Use sub.toJSON() if 'sub' is a Mongoose document to get a plain object
          // Mongoose documents might have extra methods/properties not suitable for webpush
          await webpush.sendNotification(sub.toJSON(), payload);
        } catch (err) {
          console.error("Failed to send notification to", sub.endpoint.slice(-10), err.statusCode || err.message);

          // 5. Delete Invalid Subscriptions (410 Gone)
          if (err.statusCode === 410) {
            console.log("Subscription has expired or unsubscribed:", sub.endpoint.slice(-10));
            try {
              await Subs.deleteOne({ endpoint: sub.endpoint }); // Find and delete by endpoint
              console.log("Removed invalid subscription:", sub.endpoint.slice(-10));
            } catch (deleteErr) {
              console.error("Error removing subscription:", deleteErr);
              // Decide if you need to re-throw or just log this internal error
            }
          }
          // Re-throw the error so Promise.allSettled records it as 'rejected'
          throw err;
        }
      })
    );

    // 6. Report Outcome (Optional but helpful)
    const successfulSends = results.filter(r => r.status === 'fulfilled').length;
    const failedSends = results.length - successfulSends;
    console.log(`Finished sending: ${successfulSends} succeeded, ${failedSends} failed.`);

    // 7. Send Success Response
    res.status(200).json({
      success: true,
      message: `Notifications sent (attempted: ${results.length}, successful: ${successfulSends}, failed: ${failedSends})`
    });

  } catch (error) {
    // Catch errors from Subs.find or other unexpected issues
    console.error("General error in sendNotification:", error);
    next(error); // Pass error to your global error handler
  }

  //comments read krh lena will understand all
};