import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import webpush from "web-push";
import { createProxyMiddleware } from "http-proxy-middleware";
import { connectToDB } from "./init/index.js";
import ErrorHandler from "./utils/errorHandler.js";
import subsRouter from "./Routes/subsRouter.js";
import emailRouter from "./Routes/emailRouter.js";
import session from "express-session";
import passport from "./config/passport.js";
import authRoutes from "./Routes/authRoutes.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
const CHATBOT_PORT = process.env.CHATBOT_PORT || 5001;

const allowedOrigins = (process.env.CLIENT_URLS || "http://localhost:5173")
  .split(",")
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev_secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

/* 🔁 PROXY → Flask Chatbot */
app.use(
  "/api/chatbot",
  createProxyMiddleware({
    target: `http://localhost:${CHATBOT_PORT}`,
    changeOrigin: true,
    selfHandleResponse: false,
    pathRewrite: { "^/api/chatbot": "" }
  })
);


app.use("/subs", subsRouter);
app.use("/emails", emailRouter);
app.use("/auth", authRoutes);

app.use((req, res, next) => {
  next(new ErrorHandler(404, "Not Found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

(async () => {
  await connectToDB();

  if (process.env.PUBLIC_VAPID_KEY && process.env.PRIVATE_VAPID_KEY) {
    webpush.setVapidDetails(
      "mailto:ieeedtucs123@gmail.com",
      process.env.PUBLIC_VAPID_KEY,
      process.env.PRIVATE_VAPID_KEY
    );
  }

  app.listen(PORT, () => {
    console.log(`🚀 Express running on http://localhost:${PORT}`);
    console.log(`🤖 Chatbot proxied → http://localhost:${PORT}/api/chatbot/chat`);
  });
})();
