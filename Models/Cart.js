const mongoose=require('mongoose')
const cartSchema=new mongoose.Schema({
    title:{type:String},
    lotteryNumber:{type:String},
    userId:{type:String},
    price:{type:Number,default:0}
},
{
    timestamps:true
}
)

module.exports=mongoose.model('Cart',cartSchema)