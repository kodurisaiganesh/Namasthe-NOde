const express = require('express');
const server = express();
const bcrypt=require('bcrypt');
const User=require('./models/users')
const Mongodb=require('./config/database')
const jwt=require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const userAuthing=require('./routes/auth')
const profileAuth=require('./routes/profile');
const requetAuth=require('./routes/request');
server.use(express.json());
server.use(cookieParser());

server.use('/',userAuthing);
server.use('/',profileAuth);
server.use('/',requetAuth);

server.post('/signup',async(req,res)=>
{
   const user=new User(req.body);

   try{
   await user.save();
   res.send("User DataSent Succesfully");
   }
   catch(err)
   {
        res.status(400).send("Something Went Wrong"+err.message);
   }
})

server.post('/usty',async(req,res)=>{
    const user=new User({
        firstName:"Koduri Sai",
        lastName:"Ganesh",
        email:"saiganeshkoduri@gmail.com",
        password:"sai12334",
         Mobilenumber:"8464605073"
    })
    try
    {
    await user.save();
    res.send("User Data Succesfully");
    console.log(User.applyTimestamps(user))
    }
    catch(err)
    {
        res.status(401).send("Something went wrong"+err.message);
    }
    
})
server.get("/getdata",async(req,res)=>
{
    const mailid=req.body.email;
    try{
    const user=await User.find({email:mailid});
    if(user.length===0)
    {
        res.send("User not found");
    }
    else{
        res.status(404).send(user)
    }
    }
    catch(err)
    {
        res.status(400).send("SomeThing Went Wrong");
    }
})

server.get('/feeds',async(req,res)=>{
    const a=req.body.email;
    try
    {
        const mailid=await User.findOne({email:a});
        res.send(mailid);
    }
    catch(err)
    {
        res.status(404).send("Something Went Wrong");
    }
})

server.delete('/usersss',async(req,res)=>
{
    const userId=req.body._id;
    try{
        const user=await User.findByIdAndDelete({_id:userId});
        res.send("User deleted Sucessfully");
    }
    catch(err){
        res.status(401).send("Something Went Wrong");
    }
})

server.patch('/getss/:userId',async(req,res)=>{
    const userId=req.params?.userId;
    const user=req.body;
     try{
    const allowed_updates=["firstName","lastName","gender","password","skills"];
    const isallowupdates=Object.keys(user).every((k)=>
        allowed_updates.includes(k));
    if(!isallowupdates)
    {
        throw new Error("Update not allowed");
    }
    if(  user?.skills.length>10)
    {
        throw new Error("skills must be 10 only");
    }
   
        await User.findByIdAndUpdate({_id:userId},user,
            {
                new: true, 
                runValidators: true
            }
        );
        res.send("Updated Sucessfully")
    }
    catch(err)
    {
        res.status(401).send("Something Went Wrong  "+err.message);
    }
})



server.get('/feed',async(req,res)=>
{
    try
    {
        const email= await User.find({});
        res.send(email)
        
    }
    catch{
        res.status(404).send("Something went wrong");
    }
})

Mongodb().then(()=>
{
    console.log(" DataBase Successfully COnnected");
    server.listen(4444, () => {
    console.log("Server Running");
});
})
.catch(()=>
{
    console.error("NOt Connected");
})

// Server listener

