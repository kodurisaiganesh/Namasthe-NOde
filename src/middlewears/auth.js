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
const userauth=(req,res,next)=>
{
    const tokens="Abcd";
    const isauth=tokens==="Abcd";
    if(isauth)
    {
        next();
    }
    else{
        res.status(401).send("Something happen go and check");
    }
}

module.exports={auth,userauth};