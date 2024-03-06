
const { string } = require('joi')
const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({

  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId
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
    type: String,
    ref: "Payments"

  },

  userId: {
    type: mongoose.Types.ObjectId,
  },

  status:{
    type:String,
    enum:['Pending','Delivered'],
    default:'Pending',
  }


})


const PaymentSchema = new mongoose.Schema({
  id: {
    type: String
  },
  method: {
    type: String
  }
})


module.exports = {
  Order: mongoose.model("Orderdetails", OrderSchema),
  Payment: mongoose.model("PaymentDetails", PaymentSchema)
}