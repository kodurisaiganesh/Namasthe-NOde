const express = require('express');
const server = express();
const bcrypt=require('bcrypt');
const User=require('./models/users')
const {ValidationSignup}=require('./utils/ValidationSignup')
const Mongodb=require('./config/database')
const jwt=require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const {userauth}=require('./middlewears/auth')
const user = require('./models/users');
server.use(express.json());
server.use(cookieParser());
server.post('/signupp',async(req,res)=>{
    try{
        //checking the creditnials
        ValidationSignup(req);
        const {firstName,lastName,email,password}=req.body;
        //encrpyting the password
        const passwordhash=await bcrypt.hash(password,10);
        const user=new User({
            firstName,
            lastName,
            email,
            password:passwordhash
        })

      await user.save();
      res.send("Upadated Successfully");

    }
    catch(err)
    {
        res.status(401).send("Error Message "+err.message);
    }
})

server.post('/loginn',async(req,res)=>{
    try
    {
        const{email,password}=req.body;
        const user= await User.findOne({email:email});
        if(!user)
        {
            throw new  Error("Enter Correct mail id");
        }
     const passwordcom=await user.validatePassword(password)
        if(passwordcom){
          const token=await user.getJWT();
          console.log(token);
          res.cookie("token",token);
          
          res.send("Login Success");
        }
        else{
            throw new Error("Password is not correct")
        }
    }
    catch(err)
    {
        res.status(400).send("Something went Wrong "+err.message);
    }
})

server.get("/profile",userauth,async(req,res)=>{
    try{
       const user=req.user;
       res.send(user);
    }
    catch(err)
    {
        res.status(401).send("Something Went Wrong "+err.message);
    }

})

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

