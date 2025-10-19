// src/app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import webpush from "web-push";
import { connectToDB } from "./init/index.js";
import ErrorHandler from './utils/errorHandler.js';
import subsRouter from "./Routes/subsRouter.js";

dotenv.config();
const app = express();

app.set("port", process.env.PORT || 8000);

// --- Middleware ---
app.use(cors());
// Use only the built-in Express middleware for parsing JSON and URL-encoded bodies
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// --- Database and VAPID Setup ---
await connectToDB();

webpush.setVapidDetails(
    "mailto:ieeedtucs123@gmail.com",
    process.env.PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY
);

app.use("/subs", subsRouter); 

// --- Error Handling ---
app.use((req, res, next) => {
    next(new ErrorHandler("Not Found", 404));
});

app.use((err, req, res, next) => {
    err.status = err.status || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.status).json({
        success: false,
        message: err.message,
        status: err.status
    });
});

// --- Start Server ---
app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
});