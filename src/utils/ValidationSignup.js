const validator=require('validator')
const ValidationSignup=(req)=>{

    const {firstName,lastName,email,password}=req.body;
    if(!firstName || !lastName)
    {
        throw new Error("Enter the name first");
    }
    else if(firstName.length<4 ||  firstName.length>50)
    {
        throw new Error("Name should be 4-50 characters");
    }
    else if(!validator.isEmail(email))
    {
        throw new Error("Enter valid Email");
    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("Enter Strong Password");
    }


}
module.exports={ValidationSignup}