const mongoose=require('mongoose');


const registrationSchema=new mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
})

const User = mongoose.model("Registration",registrationSchema);

module.exports=User;