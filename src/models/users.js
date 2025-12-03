const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    gender:{
        type:String
    },
    address:{
        type:String
    },
    number:{
        type:Number
    },

})

const user=mongoose.model("User",userSchema);
module.exports=user;