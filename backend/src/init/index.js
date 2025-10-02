import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {User} from '../models/users.js'
dotenv.config();
const dbConnect = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URL)
        console.log(`\nMONGODB connected :: DB_HOST :: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED ::", error);
        process.exit(1);
    }
}

const init = async ()=>{
    const data = {
        email: "test@example.com",
        password: "password123"
    }
    
    const user = await User.create({
            email: data.email.toLowerCase(),
            password: data.password
        });

        await user.save();
        if(user) console.log("Sample user created");
}

dbConnect();
init();

export default dbConnect;
