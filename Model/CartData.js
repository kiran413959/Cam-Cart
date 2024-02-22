const mongoose = require('mongoose')



const CartSchema=new mongoose.Schema({
    products:[  
        { 
          type:mongoose.Types.ObjectId
       } 
        
    ],
    userId:{
        type:mongoose.Types.ObjectId,
    }
})

module.exports = {
    Cart: mongoose.model("Cartdetails", CartSchema)
 }