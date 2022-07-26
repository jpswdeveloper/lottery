const Category = require('../../Models/Category');
const Lottery = require('../../Models/Lottery');
const { adminVerifyToken, verifyToken } = require('../../utils/verifyToken');

const router=require('express').Router()

router.get('/',async(req,res,next)=>{
 
try {
    
    const search=req.query.search||"";
    console.log("search",search)
    //limit
    const limit=req.query.limit?req.query.limit:5;
    const page=req.query.page?req.query.page-1:0;
    const skip=page*limit;
    const sortBy=req.query.soryBy||"createdAt";
    
    const lottery= await Lottery.find({title:{$regex:search , $options:'i'},status:true})
    .limit(limit)
    .skip(skip)
    .sort({sortBy:-1})
    ;
    // console.log(lottery)
    const total=await Lottery.countDocuments()

    res.status(200).json({
        message:"all lottery",
        total:total,
        data:lottery,
    })
    } catch (error) {
        next(error)
    }
});

//post usersy
router.post('/', async(req,res,next)=>{
    
    try {
        //check if category exists
        const categories =await Category.findOne({title:req.body.title})
        const lottoId=await Lottery.findOne({title:req.body.title,lotteryNumber:req.body.lotteryNumber})
        if(lottoId){
            return res.status(400).json({
                error:true,
                message:"lottery already exists"
            })
        }
        // console.log("categories",categories)
        if(!categories){
            return res.status(400).json({
                error:true,
                message:"category not found"
            })
        }
    const lottery=new Lottery(({
        title:categories.title,
        lottoFirstDigit:req.body.lottoFirstDigit,
        lotteryNumber:req.body.lotteryNumber,
        lotteryItemLeft:req.body.lotteryItemLeft,
        status:req.body.status,
        price:categories.price,
        category:categories.title,
        releasedDate:categories.releasedDate,
    }))

    const lotterySaved=await lottery.save()
        res.status(201).json({message:"Lottery successfully created",data:lotterySaved}) 
    } 
    catch (error) {
    next(error)
    }
    

})

//find post
router.get('/:id',async(req,res,next)=>{
    const lotteryId=req.params.id
    // console.log("`lotteryId`",lotteryId)
    
    try {
        const lottery=await Lottery.findById({_id:lotteryId});
        console.log("lottery",lottery)
        !lottery && res.status(400).json({message:"lottery not found",error:true})
        res.status(200).json({
            error:false,
            message:"data successfully fetched",
            data:lottery
        })
    
} catch (error) {
        next(error)
    }
})
//find lottery by lotto number
router.get('/lotteryNumber/:lottoNumber',async(req,res,next)=>{
    
    const lotteryId=req.params.lottoNumber;
    try {
        const lottery=await Lottery.findOne({lotteryNumber:lotteryId});

      if(!lottery){    
        return  res.status(200).json(
            {
            message:"something went wrong",
            code:false
            }
        )
      }
        res.status(200).json({
            error:false,
            message:"data successfully fetched",
            data:lottery
        })
    } catch (error) {
        next(error)
    }
})

router.delete('/:id',async(req,res,next)=>{
    const lotteryId=req.params.id;

    try {
        const lottery=await Lottery.findByIdAndDelete({_id:lotteryId})  
        res.status(200).json({
            message:"Data successfully deleted"
        })  
    } catch (error) {
        next(error)
    }
})
//

module.exports=router