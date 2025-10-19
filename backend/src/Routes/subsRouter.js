import express from "express";
import { saveSubs, sendNotification } from "../Controllers/subsController.js";
import wrapAsync from "../utils/wrapAsync.js";
import requireApiKey from "../middleware.js";

const router = express.Router();

router.post("/subscribe", wrapAsync(saveSubs));
router.post("/notify", requireApiKey, wrapAsync(sendNotification));

export default router;

