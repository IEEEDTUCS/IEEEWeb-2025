import express from "express";
import { saveEmail } from "../Controllers/emailController";
import wrapAsync from "../utils/wrapAsync.js";

const router=express.Router();

router.post("/getEmail",wrapAsync(saveEmail));

export default router;