import express from "express";
import { saveSubs, sendNotification } from "../Controllers/subsController.js";
import wrapAsync from "../utils/wrapAsync.js";

const router = express.Router();

router.post("/subscribe", wrapAsync(saveSubs));
router.post("/notify", wrapAsync(sendNotification));

export default router;

