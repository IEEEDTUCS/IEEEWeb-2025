import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import webpush from "web-push";
import {connectToDB} from "./init/index.js";
import ErrorHandler from './utils/errorHandler.js';
import emailRouter from "./Routes/emailRouter.js";
import subsRouter from "./Routes/subsRouter.js";

if(process.env.NODE_ENV !== "production"){
    dotenv.config();
}

const app = express();  

app.set("port", process.env.PORT || 8000);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "40kb" }))
app.use(express.urlencoded({ limit: "40kb", extended: true  }))

await connectToDB();

webpush.setVapidDetails(
    "mailto:admin@gmail.com",
    process.env.PUBLIC_VAPID_KEY || "BAVYJmXadMWG0D9XTNGNoGgDnbQESe_nkFxwMTptFTOGPMBowXgKYLvR-32h_ho2B97rZtjOaKeRoDYqFGGP6aw",
    process.env.PRIVATE_VAPID_KEY || "jG9-ejw6GdppV8h4VNf-v6gagrym5Sv1CYrIw9o97D0"
);

app.use("/email", emailRouter);
app.use("/subs", subsRouter);

app.get("/",(req,res)=>{
    res.status(200).send("API is running...");
});

app.use((req,res,next)=>{
    next(new ErrorHandler("Not Found", 404));
});

app.use((err,req,res,next)=>{
    err.status=err.status || 500;
    err.message=err.message || "Internal Server Error";
    res.status(err.status).json({
        success:false,
        message:err.message,
        status:err.status
    });
})

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
});


