const mongoose=require('mongoose');

const UserReportSchema= new mongoose.Schema({
    Software:{
        type:String
    },
    Bugs:{
        type:[String]
    },
    Features:{
        type:[String]
    }
})

const Report=mongoose.model("Report",UserReportSchema,"UserReports");
module.exports=Report;