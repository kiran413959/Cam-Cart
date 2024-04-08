const express = require('express')
const { User, Profile, Whishlist } = require('../Model/UserData')
const { Products, Category } = require('../Model/ProductDatas')
const { Order } = require('../Model/OrderData')

const {Coupon} = require("../Model/CouponData")
const { default: mongoose } = require('mongoose')
const { ObjectId } = require('mongoose').Types;
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer')
const { Cart } = require('../Model/CartData')





module.exports = {
    myOrdersget: async (req, res) => {
        if (req.session.email) {
            try {
                const userId = req.session.userId;
                // console.log(userId);


                const user= await User.findById(userId)
                // console.log(user)


                //cout of items in cart
                let cart = await Cart.findOne({ userId: req.session.userId })

    
                // Fetch orders and populate products with their details
                const orders = await Order.find({ userId: userId }).populate('products.productId');
                console.log("Orders:", orders);
                
                

                // Extract product details from orders
                const products = orders.flatMap(order => order.products.map(product => product.productId));
                console.log("Products:", products);
    

                // Extaract Payment Details from orders

                const payment = orders.map(order => order.Payment);
                console.log("payment:", payment);



                //Fetch Coupon  Details  for each product
                
                let coupon = req.body.coupon
                const CouponCode = await Coupon.findOne({couponcode:coupon})

                console.log(CouponCode);
                console.log(CouponCode._id);


                // Render myOrders view with orders and products
                res.render('myOrders', { orders, products, payment, cart });
    
                // Fetch and log total number of orders
                // const orderCount = await Order.countDocuments();
                // console.log("Total number of orders:", orderCount);
            } catch (err) {
                console.error(err);
                // Handle error, e.g., render an error page
                res.render('error', { message: 'An error occurred while fetching orders.' });
            }
        } else {
            // Redirect to login page if user is not logged in
            return res.redirect('/login');
        }
    },
    
    order_cancelpost: async (req, res) => {
        if(req.session.email){
            try {
                
                const orderId =req.params.orderId

                const order = await  Order.findByIdAndDelete(orderId);

              console.log(order);
              res.status(200).json({ success:true , message:"Order Deleted Successfully"});

            } catch (error) {
                console.log(error);
                res.status(400).json({success:false ,message:'Error Occured'});
            }

        }else{
            res.redirect('/login')
        }



    }
};



