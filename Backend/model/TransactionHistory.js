const mongoose=require('mongoose');
const TransactionSchema= new mongoose.Schema({
    usertype:{
        type:String
    },
    username:{
        type:String
    },
    status:{
        type:String
    },
    transactionHash:{
        type:String
    },
    blockHash:{
        type:String
    },
    contractAddress:{
        type:String
    },
    blockNumber:{
        type:String
    },
    gasUsed:{
        type:String
    },
    from:{
        type:String
    },
    to:{
        type:String
    },
    typeOfTransaction:{
        type:String
    },
    TransactionTime:{
        type:Date,
        default:Date.now
    }

})
const Transaction=mongoose.model("Transaction",TransactionSchema);
module.exports=Transaction;