const { expressjwt: jwt } = require("express-jwt");

function auth_jwt(){
    // const secret=process.env.secret;
    return jwt({
           secret: process.env.secret,
          algorithms: ["HS256"], 
    })
    .unless({
        path:[
            '/api/auth/login',
            '/api/auth/register'
        ]
    })
}


module.exports=auth_jwt;