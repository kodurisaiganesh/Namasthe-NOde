const express=require('express');
const server=express();

server.use("/user",(req,res,next)=>
{
    console.log("Hello");
    next();
    //res.send("Welcome to the user");
},
  (req,res,next)=>
{
    console.log("Hello 2nd");
   // res.send("Welcome to the 2nd user");
   next();
},(req,res,next)=>
{
    console.log("#3rd user");
    next();
},
(req,res,next)=>
{
    res.send("Finally we are coming")
}

   
);
server.listen((4444),()=>
{
    console.log("Server Running")
});