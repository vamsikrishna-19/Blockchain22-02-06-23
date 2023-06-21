const mongoose=require('mongoose');

const mongoURI=process.env.MONGOURI;
mongoose.connect(mongoURI).then(()=>{
    console.log("Connection Successfull");
}).catch((err)=>{
    console.log("No connection",err);
})
