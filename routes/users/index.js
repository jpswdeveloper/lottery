const Users = require('../../Models/Users');
const { adminVerifyToken, verifyToken } = require('../../utils/verifyToken');

const router=require('express').Router()

router.get('/all',async(req,res,next)=>{
try {
    const limit=req.query.limit?req.query.limit:5;
    const page=req.query.page?req.query.page-1:0;
    const skip=page*limit;
    const search=req.query.search||"";
    let allusers= await Users.find({username:{$regex:search , $options:'i'},email:{$regex:search,$options:"i"} })
    .limit(limit)
    .skip(skip)
    .sort({createdAt:-1})

        const totalUsers=await Users.countDocuments()
        res.status(201).json({
            error:false,
            total:totalUsers,
            message:"Valid Data",
            data:allusers,

        })
    } catch (error) {
        next(error)
    }
})

//delete users
router.delete('/:userId',adminVerifyToken,async(req,res,next)=>{
    try {
    const userId=req.params.userId;
    const deleteUser=await Users.findByIdAndDelete(userId)
    res.status(201).json({
        error:false,
        message:"user deleted successfully"
    })
    } catch (error) {
        next(error)
    }
})
//find user by id
router.get('/:userId',async(req,res,next)=>{
    
    try {
        const userId=req.params.userId;
        const user=await Users.findById(userId)
        res.status(201).json({
            error:false,
            message:"data is successfully fetched",
            data:user
        })
    } catch (error) {
        next(error)
    }
})
//update the user
router.put('/users/:userId',verifyToken,async(req,res,next)=>
{
    const data=req.body;
    try {
        const user=await Users.findByIdAndUpdate(
            req.params.userId,
            {
            $set:data
            },
            {
                new:true
            }).select('-password');

        res.status(201).json({
            error:false,
            message:"data is successfully Updated",
            data:user
        })
    } catch (error) {
        next(error)
    }
}
)

module.exports=router