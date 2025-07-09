const mongoose=require('mongoose')
const entrySchema=new mongoose.Schema(
    {
        title:String,
        note:String,
        tag:String,
        mood:String,
        energy:Number,
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
        
    });
    module.exports=mongoose.model('Entry',entrySchema);
