const express=require('express');
const profileAuth=express.Router();
const User=require('../models/users')
const {userauth}=require('../middlewears/auth')
profileAuth.get('/profile',userauth,async(req,res)=>{
  try{
    const user=req.user;
    res.send(user);
  }
  catch(err){
    res.status(401).send("Err "+err.message);
  }
})

module.exports=profileAuth;