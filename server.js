const express=require('express');
const app=express();
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

const db=mongoose.connection;
db.on('error',(e)=> console.log(e));
db.once('open',()=>console.log('Connected to DataBase'));

app.use(express.json());
const subscriberRouter=require('./routes/subscribers')
app.use('/subscribers',subscriberRouter);

app.listen(3000,()=>{
    console.log("Listening on Port 3000...")
})