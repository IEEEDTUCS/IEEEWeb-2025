import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const server = createServer(app);   // Explicit server

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }))
app.use(express.urlencoded({ limit: "40kb", extended: true  }))

const startServer = async () => {

    // app.set("mongo_user");
    // const connectionDb = await mongoose.connect(process.env.MONGO_URL);

    // console.log(`Connected to MongoDB ${connectionDb.connection.host}`);
    app.get("/", (req, res) => {
        res.json({ message: "Welcome to IEEEDTU Backend" });
    });
    server.listen(7000, () => {
        console.log("Server is running on port 7000");
    });

}

startServer();
