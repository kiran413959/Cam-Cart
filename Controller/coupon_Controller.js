const { User, Profile, Whishlist } = require('../Model/UserData')
const { Products, Category } = require('../Model/ProductDatas')
const { Order } = require('../Model/OrderData')
const {Coupon}=require("../Model/CouponData")
const { default: mongoose } = require('mongoose')
const { ObjectId } = require('mongoose').Types;
const { Cart } = require('../Model/CartData')


module.exports={
    couponApplyget: (req, res) =>{  
    },

    couponApplypost: async(req,res)=>{ 

        if(req.session.email){
            
            try{

                const userId= req.session.userId;
                const user=await User.findById(userId)
                let coupon = req.body.coupon
                const CouponCode = await Coupon.findOne({couponcode:coupon})

                if(CouponCode){
                    res.status(200).send(CouponCode.discountPercentage.toString());
                }else {
                    res.status(400).send('invalid'); 
                }


                console.log(CouponCode);
                console.log(CouponCode._id);






            }catch(error){
                console.log(error)
                res.status(500).json({error: error.message})
            }
            
        }else{
            res.redirect('/login')
        }
    }

}
    
    
