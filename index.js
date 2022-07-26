const express=require('express')
const mongoose =require('mongoose')
const { expressjwt: jwt } = require("express-jwt");
const cors = require('cors')
const app=express()

const dotenv=require('dotenv').config()
const users=require('./routes/users')
const lotto=require('./routes/Lottery')
const cart=require('./routes/cart')
const errHandler = require('./utils/protector')
const auth=require('./routes/Auth')
const userLottery=require('./routes/userLottery')
const category=require('./routes/category')
const auth_jwt=require('./utils/api_protectore')
//routes with middle ware
app.use(express.json());
app.use(cors())
// app.use(auth_jwt());
// app.use("/api/auth", 
// jwt({ secret: "shhhhhhared-secret", algorithms: ["HS256"] }),auth);
app.use('/api/users',users)
app.use('/api/lotto',lotto)
app.use('/api/cart',cart)
app.use('/api/auth',auth),
app.use('/api/userlotto',userLottery),
app.use('/api/category',category)
app.use(errHandler)
//mongoose connection
mongoose.connect(process.env.Mongo_Db,)
.then(()=>console.log('connection successfully created'))
.catch((err)=>{
    console.log(err)
})

app.listen(process.env.Port || 5000,()=>console.log(`server is running on http://localhost:5000`))
//listining our app