function errHandler(err,req,res,next)
{
    if(err.name === 'UnauthorizedError'){
      return  res.status(401).json({
            error:true,
            message:"User is unauthorized"
        })
    }
    if(err.name === 'ValidationError'){
        return  res.status(401).json({
            error:true,
            message:err.message
        })
    }
    return res.status(500).json({
        error:err.message,
        message:"Something went wrong !!!"
    })
} 
module.exports =errHandler;