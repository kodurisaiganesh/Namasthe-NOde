const express=require('express');
const UserRouter=express.Router();
const {userauth}=require('../middlewears/auth');
const ConnectionRequest=require('../models/ConnectionRequest')
UserRouter.get('/user/requests/received',userauth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequest=await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested",
        }).populate("fromUserId", "firstName lastName about")

        res.json({
            message:"Data fetched Succesfully",
            data:connectionRequest,
        })
    }
    catch(err)
    {
        res.status(400).send("Error  "+err.message);
    }
});

UserRouter.get('/user/connections',userauth,async(req,res)=>{
    try{
        const loginuser=req.user;
        const connectionRequest=await ConnectionRequest.find({
            $or:[
                {toUserId:loginuser._id,status:'accepted'},
                {fromUserId:loginuser._id, status:'accepted'}
            ]
        }).populate("fromUserId",["firstName","lastName"]);
        const data=connectionRequest.map((row)=>
            {
                if(row.fromUserId._id.toString()===row.toUserId._id.toString())
                {
                    return row.toUserId;
                }
                else
                {
                return row.fromUserId;
                }
            }
            )
        res.json(data);

    }
    catch(err)
    {
        res.status(400).send("Error "+err.message);
    }
})

module.exports=UserRouter;