const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    username:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    phone:{type:Number,unique:true,required:true},
    address:{type:String,required:false},
    isAdmin:{type:Boolean,default:false},
    lottoNumber:{type:Array,required:false}
},
{
    timestamps:true
}
)


module.exports=mongoose.model('User',userSchema)