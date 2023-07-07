const mongoose=require("mongoose");

const downloadSchema = new mongoose.Schema({
    Username:String,
    Patchname: String,
    Date: {
        type:Date,
        default:Date.now
    }
  });
  
 


const UserDownloadHistory=mongoose.model("DownloadHistory",downloadSchema);
module.exports=UserDownloadHistory;