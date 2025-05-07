import express from 'express';
import { PORT } from './config/env.js';
import connectToDatabase from './database/mongodb.js';

const app=express();

app.get('/',(req,res)=>{
res.send('welcome');
});

app.listen(PORT,async()=>{
console.log('server running on port 5000')
await connectToDatabase()
});

export default app