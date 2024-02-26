const mongoose = require('mongoose')



const CartSchema=new mongoose.Schema({
    products:[  {
             productId: { 
                     type:mongoose.Schema.Types.ObjectId
                     ,ref:'products'
                       } ,
             quantity:{
                     type : Number,
                     default:1
                      },
             price:{
                     type :Number
                   }
                 }
    ],
    TotalAmount:{
                 type:Number,
                 default:0
    },
    userId:{
        type:mongoose.Types.ObjectId,
    }
})

module.exports = {
    Cart: mongoose.model("Cartdetails", CartSchema)
 }