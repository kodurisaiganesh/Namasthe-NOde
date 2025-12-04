const mongoose=require('mongoose')

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
            const str=["@gmail.com","@yahoo.com"];
            if(!str.some(d=>value.endsWith(d)))
            {
                throw new Error("please enter correct mail id");
            }
        }
    },
    password:{
        type:String,
        minlength:4,
        maxlength:10,
        required:true
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