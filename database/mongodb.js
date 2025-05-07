import mongoose from 'mongoose'
import {DB_URI, NODE_ENV } from '../config/env.js'
if(!DB_URI){
    throw new Error("plz define the mongodb uri inside .env file")
}

const connectToDatabase=async()=>{
    try{
     await mongoose.connect(DB_URI)
     console.log(`connected to database in ${NODE_ENV} mode`)
    }
    catch(error){
     console.error('error connecting to database',error)
     process.exit(1)
    }
}
export default connectToDatabase