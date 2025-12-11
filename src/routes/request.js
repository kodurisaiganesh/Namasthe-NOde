const express=require('express');
const requetAuth=express.Router();
const User=require('../models/users')
const {userauth}=require('../middlewears/auth')
requetAuth.get('/connectionrequest',userauth,async(req,res)=>{
  try{
    const user=req.user;
    res.send(user.firstName+" Sends the connection request");
  }
  catch(err){
    res.status(401).send("Err "+err.message);
  }
})

module.exports=requetAuth;