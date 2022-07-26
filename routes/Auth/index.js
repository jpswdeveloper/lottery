const Users = require('../../Models/Users')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const router=require('express').Router()

//register user

router.post('/register',async(req,res,next)=>{
    
try {
    const user=new Users({
        email:req.body.email,
        phone:req.body.phone,
        username:req.body.username,
        address:req.body.address,
        password:bcrypt.hashSync(req.body.password,10)
    })
    const newUser=await user.save()
    res.status(201).json({
        error:false,
        message:"user successfully registered successfully",
        data:newUser
    })
} catch (error) {
    next(error)
}
})

//login user

router.post('/login',async(req,res,next)=>{
    const secret=process.env.secret
    let token;
    try {
        const user= await Users.findOne({username:req.body.username})
        if(!user) {
            return res.status(401).json({
                error:true,
                message:"invalid username and password"
            })
        }
        if(user && bcrypt.compareSync(req.body.password,user.password)){
            //pass the token for jwt
             token=jwt.sign({
                user:user,
                userId:user._id,
                isAdmin:user.isAdmin
            },
            secret
            ,{
                expiresIn:'5d'
            }
            )

        }
        else{
            return res.status(401).json({
                error:true,
                message:"invalid username and password"
            })
        }
        return res.status(201).json({
            error:false,
            message:"Logged in successfully",
            data:{
                user,
                token
            }
        })
    } catch (error) {
        
    }
})
module.exports=router