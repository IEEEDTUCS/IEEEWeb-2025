import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import webpush from "web-push";
import { connectToDB } from "./init/index.js";
import ErrorHandler from "./utils/errorHandler.js";
import subsRouter from "./Routes/subsRouter.js";
import emailRouter from "./Routes/emailRouter.js";
import session from "express-session";
import passport from "./config/passport.js";
import authRoutes from "./Routes/authRoutes.js";

dotenv.config();
const app = express();

/* ---------- SAFE ENV ---------- */
const PORT = process.env.PORT || 8000;
const allowedOrigins = (process.env.CLIENT_URLS || "")
  .split(",")
  .filter(Boolean);

/* ---------- MIDDLEWARE ---------- */
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

/* ---------- ROUTES ---------- */
app.use("/subs", subsRouter);
app.use("/emails", emailRouter);
app.use("/auth", authRoutes);

/* ---------- ERROR HANDLING ---------- */
app.use((req, res, next) => {
  next(new ErrorHandler(404, "Not Found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ---------- START SERVER ONLY AFTER DB ---------- */
(async () => {
  await connectToDB(); // wait here properly

  if (process.env.PUBLIC_VAPID_KEY && process.env.PRIVATE_VAPID_KEY) {
    webpush.setVapidDetails(
      "mailto:ieeedtucs123@gmail.com",
      process.env.PUBLIC_VAPID_KEY,
      process.env.PRIVATE_VAPID_KEY
    );
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})();
