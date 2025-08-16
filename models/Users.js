import mongoose from "mongoose";
const Schema=mongoose.Schema
const userSchema = new Schema({
  username: { type: String },
  phone: { type: String, unique: true, required: true },
  address: { type: String }, // New field for formatted address
  location: {
    type: {
      type: String,
      enum: ['Point'],
      //required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      //required: true,
    },
  },
  services:{type:Object},
  otp: { type: String },
  otpExpires: { type: Date },
},{timestamps:true});
userSchema.index({ location: '2dsphere' }); // Create a geospatial index
const Users = mongoose.model('Users',userSchema)
export default Users