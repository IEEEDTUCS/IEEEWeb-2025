import mongoose from "mongoose";
import { Schema } from "mongoose";

const subsSchema = new Schema({
  endpoint: { type: String, required: true, unique: true },
  keys: { auth: String, p256dh: String },
});

const Subs = mongoose.model("Subs", subsSchema);

export default Subs;

