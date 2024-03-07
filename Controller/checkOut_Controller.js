const { User, Profile, Whishlist } = require('../Model/UserData')
const { Products, Category } = require('../Model/ProductDatas')
const { Order } = require('../Model/OrderData')
const { default: mongoose } = require('mongoose')
const { ObjectId } = require('mongoose').Types;
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer')
const { Cart } = require('../Model/CartData')


module.exports={
    buyNowPost: async (req, res) => {
        try {

            const productId = req.params.productId
            const product = await Products.findById(productId)
            // console.log("the product" + product);
            req.session.productDetails = product
            req.session.productDetails2=product

            res.status(200).json({ buynow: true })

        } catch (err) {
            console.log(err);
        }


    },


    Checkoutget: async (req, res) => {
        if (req.session.email) {
            try {
                const userId = req.session.userId;
                // console.log(userId);
                // console.log(req.session);

                let cart;
                const productId = req.session.productDetails
                const productDetails = await Products.findById(productId)
                const cartDetails = await Cart.findOne({ userId: req.session.userId })
                    .populate('products.productId');
                if (req.session.productDetails) {
                    cart = {
                        products: [
                            {
                                productId: productDetails,
                                quantity: 1,
                                price: productDetails.price
                            }
                        ]
                    }
                    delete req.session.productDetails
                } else {
                    cart = cartDetails
                }

                console.log(cart.products);
                const profile = await Profile.findOne({ userId: userId });
                const user = await User.findById(userId);

                let totalAmount = 0;
                if (cart && cart.products) {
                    for (let product of cart.products) {
                        if (product.productId && product.productId.price && product.quantity) {
                            totalAmount += product.productId.price * product.quantity;
                        }
                    }
                }
                cart.TotalAmount = totalAmount;
                console.log(`total  :${cart.TotalAmount}`);


                // console.log(user);
                // console.log(cart.products);

                res.render('checkOut', { cart, user, profile })
            } catch (err) {
                console.log(err);
            }
        }


    },

    Checkoutpost: async (req, res) => {
        if (req.session.email) {
            try {

                const userId = req.session.userId;
               
                console.log(userId);
               
                console.log(req.session);

                let cart;
                const productId = req.session.productDetails2
             
                const productDetails = await Products.findById(productId)
               
                console.log("there is the product :" + productId);


                const cartDetails = await Cart.findOne({ userId: req.session.userId })
                    .populate('products.productId');
                if (req.session.productDetails2) {
                    cart = {
                        products: [
                            {
                                productId: productDetails,
                                quantity: 1,
                                price: productDetails.price
                            }
                        ]
                    }

                    let totalAmount = 0;
                    if (cart && cart.products) {
                        for (let product of cart.products) {
                            if (product.productId && product.productId.price && product.quantity) {
                                totalAmount += product.productId.price * product.quantity;
                            }
                        }
                    }

                    cart.TotalAmount = totalAmount;
                    console.log(cart.TotalAmount);

                    const { address, pincode,coupon, payment } = req.body

                    console.log(req.body);
                    const order = new Order({
                        products: cart.products,
                        Address: address,
                        Pincode:parseInt(pincode),
                        Coupon:coupon,
                        TotalAmount: cart.TotalAmount,
                        Payment: payment,
                        userId: userId,
                        status: "Pending"
                    })

                 const orderplaced =   await order.save()
                 if(orderplaced){
                     console.log('order is =' + order);
                     console.log('order placed........................................................');
 
                     delete req.session.productDetails

                 }



                } else {
                    cart = cartDetails


                    let totalAmount = 0;
                    if (cart && cart.products) {
                        for (let product of cart.products) {
                            if (product.productId && product.productId.price && product.quantity) {
                                totalAmount += product.productId.price * product.quantity;
                            }
                        }
                    }

                    cart.TotalAmount = totalAmount;
                    console.log("hiiiiiiiii  "+cart.TotalAmount);

                    console.log("cart is =" + cart.products);
                    const { address, pincode, coupon ,payment } = req.body
                    console.log(`pincode ${pincode}`);

                    console.log(req.body);

                    const order = new Order({
                        products: cart.products,
                        Address: address,
                        Pincode:pincode,
                        Coupon:coupon,

                        TotalAmount: cart.TotalAmount,
                        Payment: payment,
                        userId: userId,
                        status: "Pending"
                    })

                    await order.save()

                    console.log('order is =' + order);
                }


                res.render('orderPlaced')

            } catch (err) {
                res.status(500).json({ success: false, message: 'Error creating order' });
            }

        }



        // console.log(req.body);
    },

}