import express from 'express';
import { PORT } from './config/env';
const app=express();

app.get('/',(req,res)=>{
res.send('welcome');
});

app.listen(PORT,()=>{
console.log('server running on port 5000')
});

export default app