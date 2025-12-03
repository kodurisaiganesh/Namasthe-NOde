const express = require('express');
const server = express();

const User=require('./models/users')

const Mongodb=require('./config/database')

server.use(express.json())
server.post('/signup',async(req,res)=>
{
   const user=new User(req.body);

   try{
   await user.save();
   res.send("User DataSent Succesfully");
   }
   catch(err)
   {
        res.status(400).send("Something Went Wrong");
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

