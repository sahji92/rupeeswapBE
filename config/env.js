import { config } from "dotenv";

config({path:`.env.${process.env.NODE_ENV||'development'}.local`});

export const {PORT,NODE_ENV,DB_URI,TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN,TWILIO_PHONE_NUMBER,JWT_SECRET}=process.env;