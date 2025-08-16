import mongoose from "mongoose";
const Schema=mongoose.Schema
const otpSchema = new Schema({
  phone: { type: String}, 
  otp: { type: String },
  otpExpires: { type: Date },
},{timestamps:true});

const Users = mongoose.model('Otp',otpSchema)
export default Otp