
const { string } = require('joi')
const mongoose= require('mongoose')

const OrderSchema=  new mongoose.Schema({

    products:[  {
        productId: { 
                type:mongoose.Schema.Types.ObjectId
                ,ref:'products'
                  } ,
        quantity:{
                type : Number,
                 },
        price:{
                type :Number
              }
            }
],
Address:{
    type:String,
},
TotalAmount:{
            type:Number,
},
userId:{
   type:mongoose.Types.ObjectId,
}
})


module.exports = {
    Order: mongoose.model("Orderdetails", OrderSchema)
 }