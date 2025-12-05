const mongoose=require('mongoose')
const validator=require('validator')
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        minlength:5,
        maxlength:30,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        minlength:8,
        maxlength:40,
        lowercase:true,
        validate(value){
           if(!validator.isEmail(value))
           {
            throw new Error("Invalid email address");
           }
        }
    },
    password:{
        type:String,
        minlength:8,
        maxlength:100,
        required:true,
        validate(value)
        {
            if(!validator.isStrongPassword(value))
            {
                throw new Error("ENter a strong password")
            }
        }
    },
    gender:{
        type:String,
        validate(value){

            const allow=["male","female","others"];
            if(!allow.includes(value))
            {
                throw new Error("Invalid gender data")
            }
        }
    },
    address:{
        type:String
    },
    Mobilenumber:{
        type:String,
        minlength:10,
        maxlength:10
    },
    skills:{
        type:[String]
    }

},{timestamps:true})

const user=mongoose.model("User",userSchema);
module.exports=user;