import express from 'express';
import { JWT_SECRET, PORT } from './config/env.js';
import connectToDatabase from './database/mongodb.js';
import authRouter from './routes/auth.routes.js';
import cors from 'cors'
import jwt from 'jsonwebtoken'
const app=express();
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json())
app.use('/api/auth', authRouter);

app.get('/',(req,res)=>{
res.send('welcome to rupeeswap');
});

app.listen(PORT,async()=>{
console.log('server running on port 5000')
await connectToDatabase()
});

export default app