import mongoose from "mongoose";
const Schema=mongoose.Schema
const userSchema = new Schema({
  username: { type: String },
  phone: { type: String, unique: true, required: true },
  location:{type:String},
  services:{type:Object},
  otp: { type: String },
  otpExpires: { type: Date },
},{timestamps:true});

const Users = mongoose.model('Users',userSchema)
export default Users