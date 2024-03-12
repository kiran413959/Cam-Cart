const { date, string } = require('joi')
const mongoose = require('mongoose')



const CouponSchema=new mongoose.Schema({
        discountPercentage:{
            type:String,
            // required:[true,'Please provide the discount percentage']
        },
        couponCode:{
            type:String,
            unique : true , 
             required: [true,"please provide a code"]
        },

        expireDate:{
            type: Date,
            // require: [true, 'Expiry date is required'],
        }
})


module.exports = {
    Coupon: mongoose.model("CouponDetails", CouponSchema)
 }