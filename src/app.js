const express=require('express')

const server=express();

server.use("/reya",(req,res)=>
{
    res.send("Rey ety saiganesh koduri");
})
server.use((req,res)=>
{
    res.send("Welcome to the Server");
})
server.listen(4000,()=>
{
    console.log("Server running");
})
