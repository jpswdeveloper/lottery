const Cart = require('../../Models/Cart');
const Lottery = require('../../Models/Lottery')


const router=require('express').Router()

router.get('/',async(req,res,next)=>{
try {
    const page=req.query.page-1 ||0;
    const limit=5;
    const skip=page*limit;
    const search=req.query.search |""
    const lottery=  await Cart.find({title:{$regex:search,$options:"i"}})
    .limit(limit)
    .skip(skip)
    ;
    res.status(200).json({
        message:"all sold lottery",
        data:lottery
    })
    } catch (error) {
        next(error)
    }
});

//find cart
router.get('/:id',async(req,res,next)=>{
   try {
    const id=req.params.id;
    const cart=await Cart.findOne({_id:id});
    !cart && res.status(400).json({message:"cart not found",error:true})
    res.status(200).json({
        message:"cart Item successfully fetched",
        data:cart
    })
   } catch (error) {
    
   }
})
//delete cart
router.delete('/id',async(req,res,next)=>{
   try {
    const id=req.params.id;
    const cart=await Cart.findOne({_id:id});
    !cart&&res.status(400).json({message:"product not found",error:true})
    //if cart product is founf
    const deleteCart=await Cart.findByIdAndDelete({_id:id});
    res.status(200).json({
        message:"product deleted",
        error:false,
    })

   } catch (error) {
    next(error)
   }
})

module.exports=router