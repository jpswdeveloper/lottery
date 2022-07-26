const Cart = require('../../Models/Cart');
const { db } = require('../../Models/Lottery');
const Lottery = require('../../Models/Lottery')
const Users = require('../../Models/Users');
const { verifyToken ,adminVerifyToken} = require('../../utils/verifyToken');


const router=require('express').Router()

router.post('/', async(req,res,next)=>{
   const userId=req.body.userId;
    // console.log("latest",userId)
try {
    const quantity=req.body.quantity;
    const numOfDigit=req.body.num_of_digit;
    const lottoUser=req.body.lottoNumber;
    const title=req.body.title;

    const lotto=await Lottery.findOne({title:title,lottoFirstDigit:numOfDigit,lotteryNumber:lottoUser,status:true});
    //total documents of query asked by users
    // console.log("lotto",lotto)
    !lotto&& res.status(401).json({message:"lotto is not found",error:true})

    if(parseInt(lotto.lotteryItemLeft) < quantity){
        return res.status(401).json({
            message:"please reduce your quantity amount",
            error:true
        })
    }

    const user= await Users.findById(userId)
    
    const status={status:false}
    const soldLottery=[]
    
    let result={
        title:lotto.title,
        lottoNumber_User:lottoUser,
        quantity_User:quantity,
        priceLotto:lotto.price * quantity,
        releasedDateLotto:lotto.releasedDate,    
    }
    user.lottoNumber.push(result)

    const updateuser= await Users.findByIdAndUpdate({_id:userId},
        {
            lottoNumber:user.lottoNumber,
        }
    ,{new:true})
    
    //add to cart after user pay
    
    //update the lottery item left[0
    const num_Item_Left=parseInt(lotto.lotteryItemLeft)-quantity;
    const updateLotto=await Lottery.findByIdAndUpdate({_id:lotto._id},{
        lotteryItemLeft:num_Item_Left,
    }
    )

    if(num_Item_Left===0){
        await Lottery.findOneAndUpdate({lotteryNumber:lottoUser},{
            status:false,
        },{new:true})
    }
    
    let price=parseInt(quantity)*parseInt(lotto.price)
    
    const newCart= new Cart({
        title:lotto.title,
        lottoNumber:lottoUser,
        price:price,
        userId:userId
    })
    await newCart.save()
    
    
    res.status(200).json({
        error:false,
        message:"successfully sold",
        data:updateuser,
        price:price
    })
    
} catch (error) {
    next(error)
}
})
module.exports=router