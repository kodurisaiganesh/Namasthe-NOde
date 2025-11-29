const express=require('express')

const server=express();


server.get("/user/:userid",(req,res)=>
{
    console.log(req.params);
    res.send("Welcome to the User");
})

server.listen(4000,()=>
{
    console.log("Server running");
})
