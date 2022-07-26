const jwt=require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.token
    try{
        if(authHeader){
            //split the token
            const token=authHeader.split(' ')[1]
            jwt.verify(token,process.env.secret,(err,user)=>{
                if(err){
                    return res.status(401).json({
                        message:'unauthorized',
                        error:true,
                    })
                }
                req.user=user
                req.userId=user.userId
                next()
            })
        }
        else{
            res.status(500).json({message:'Something went wrong',error:true})
        }
    }
    catch(err){
    }
}
const adminVerifyToken=(req,res,next)=>{
        verifyToken(req,res,()=>{
            if(req.user.isAdmin)
            {
                next()
            }
            else{
                res.status(401).json({
                    message:'unauthorized',
                    error:true,
                    code:401
                })
            }
        })
}
module.exports={verifyToken,adminVerifyToken}