const express=require('express')

const server=express();


server.get("/user/:userid",(req,res)=>
{
    console.log(req.params);
    res.send("Welcome to the User");
})
server.post("/user",(req,res)=>
{
    res.send("Data Posted Successfully");
})
server.delete("/user",(req,res)=>
{
    res.send("Delete Successfully");
})
server.use("/",(req,res)=>
{
    res.send("Hello")
})
server.listen(4000,()=>
{
    console.log("Server running");
})
