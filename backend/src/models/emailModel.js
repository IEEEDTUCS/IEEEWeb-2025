import mongoose from 'mongoose';
import {Schema} from "mongoose";

const emailSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    }
});

const Email=mongoose.model('Email',emailSchema);

export default Email;