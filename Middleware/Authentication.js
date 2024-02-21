// const express= require('express');
// const User=require("../models/User");
// const jwt = require( 'jsonwebtoken' );

// async function authentication(req,res,next){
// const token =req.headers["autherization"];
// if(token){
//     try{
//         const authToken=token.split("Bearer")[1];
//         // console.log(authToken);
//         const verify= jwt.verify(
//             authToken,
//             process.env.JWT_SECRET
//         )
// const user=await User.findById(verify.id)
// //console.log(user);
// if(user){
//   return req.status(404).send({message: "User Not Found"})
//   }
//   if(!user.isVerified){return res.status(403).send({message:"Account is not verified"})
// }
// req.user=verify
//         next();
//         }catch(e){  
//            return res.status(403).send({error:"Invalid Token"})  
//        } 
// }else{
// return res.status(403).send({error:"No Token Provided!"});
// }
// };
       