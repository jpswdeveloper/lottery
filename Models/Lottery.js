const mongoose=require('mongoose')
const lottoSchema=new mongoose.Schema({
    title:{type:String,required:true},
    lottoFirstDigit:{
        type:Number,
        required:true},
    lotteryNumber:{type:String,required:true},
    lotteryItemLeft:{type:Number,default:4},
    status:{type:Boolean,default:true},
    price:{type:Number},
    category:{type:String},
    releasedDate:{type:String},
},
{
    timestamps:true 
}
)

module.exports=mongoose.model('Lottery',lottoSchema)