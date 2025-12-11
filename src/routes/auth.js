const express=require('express');
const authRouter=express.Router();
const bcrypt=require('bcrypt')
const User=require('../models/users')
const validator=require('validator')
const {ValidationSignup}=require('../utils/ValidationSignup')
const jwt=require('jsonwebtoken')
authRouter.post('/signup',async (req,res)=>{
    try{
      ValidationSignup(req);
      const{firstName,lastName,email,password}=req.body;
      const passwordhash=await bcrypt.hash(password,10);
      const user=new User({
        firstName,
        lastName,
        email,
        password:passwordhash,
      })

   await user.save();
   res.send("Account Created Succesfully");
    }
    catch(err){
        res.status(401).send("Error "+err.message);
    }
})

authRouter.post('/login',async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email:email});
        if(!user)
        {
            throw new Error("Enter Correct email id");
        }
        const passwordcom=await user.validatePassword(password);
        if(passwordcom)
        {
            const token =await user.getJWT();
            res.cookie("token",token);
            res.send("Login Success");
        }

    }
     catch(err){
        res.status(401).send("Error "+err.message);
    }
})
module.exports=authRouter;