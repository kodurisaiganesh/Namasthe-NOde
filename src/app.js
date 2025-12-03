const express = require('express');
const server = express();

const User=require('./models/users')

const Mongodb=require('./config/database')

app.use(express.json())
server.post('/signup',async(req,res)=>
{
   const user=new User({
    firstName:"Srikar",
    lastName:"Moluguri",
    email:"srikar@gmail.com",
    password:"srikar234"
   });
   try{
   await user.save();
   res.send("User DataSent Succesfully");
   }
   catch(err)
   {
        res.status(400).send("Something Went Wrong");
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

