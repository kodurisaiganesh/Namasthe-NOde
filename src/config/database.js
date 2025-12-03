const mongoose=require('mongoose');

const Mongodb=async()=>
{
    await mongoose.connect("mongodb+srv://saiganesh1105_db_user:saiganesh@namasthenode.rsrzhir.mongodb.net/devTinder")
};

module.exports=Mongodb
