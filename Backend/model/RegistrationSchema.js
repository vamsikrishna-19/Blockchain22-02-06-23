const mongoose=require('mongoose');


const registrationSchema=new mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Role:{
        type:String,
        required:true,
        default:"User"
    }
})

const User = mongoose.model("Registration",registrationSchema);
module.exports=User;