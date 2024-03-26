
// const { string } = require('joi')
const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    type: String, //

  PaymentId: {
      type: String,
  },
  Amount: {
      type: String
  }
});


const OrderSchema = new mongoose.Schema({

  products: [{
    productId: {
      type: mongoose.Types.ObjectId
      , ref: 'products'
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number
    }
    
  }
  ],
  Name:{
    type : String,
  },
  Phone:{
    type:Number,
  },
  Address: {
    type: String,
  },
  Pincode: {
    type: Number
  },
  Coupon:{
    type:String
  },
  TotalAmount: {
    type: Number,
  },

  Payment: {
    type: [paymentSchema],
    default: []
  },
  PaymentStatus:{
    type:String,
    enum:['Pending','Successful','Failed']
  },

  userId: {
    type: mongoose.Types.ObjectId,
    
  },

  Shipping_status:{
    type:String,
    enum:['Pending','Delivered'],
    default:'Pending',
  }

})





module.exports = {
  Order: mongoose.model("Orderdetails", OrderSchema),
}
