import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://guptakaranport:karang2006@cluster0.gapyepy.mongodb.net/');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};



