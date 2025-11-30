const mongoose=require('mongoose');

const con=async()=>
{
    await mongoose.connect("mongodb+srv://saiganesh1105_db_user:saiganesh@namasthenode.rsrzhir.mongodb.net/")
}
con.then(()=>
{
    console.log("Successfully COnnected");
})
.catch(()=>
{
    console.error("NOt Connected");
})