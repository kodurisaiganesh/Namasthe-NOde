const jwt=require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User=require('../models/users')
const auth=(req,res,next)=>
{
    const token="abc";
    const isAuthorized=token==="abc";
    if(isAuthorized)
    {
        next();
    }
    else{
        res.status(401).send("Something went wrong");
    }
}
const userauth=async (req,res,next)=>
{
    try{
    const {token}=req.cookies;
    if(!token)
    {
        throw new Error("Invalid token");
    }
    const decodemsg=jwt.verify(token,"Saiganesh1");
    const {_id}=decodemsg;
    const user=await User.findById(_id);
    if(!user)
    {
        throw new Error("User not found");
    }
    req.user=user;
    next();
    }
    catch(err){
        res.status(401).send("Error "+err.message);
    }
}

module.exports={auth,userauth};