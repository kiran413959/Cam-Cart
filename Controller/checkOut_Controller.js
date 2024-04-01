const { User, Profile, Whishlist } = require('../Model/UserData')
const { Products, Category } = require('../Model/ProductDatas')
const { Order } = require('../Model/OrderData')
const { Coupon } = require("../Model/CouponData")
const Razopay = require('razorpay')
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const { default: mongoose } = require('mongoose')
const { ObjectId } = require('mongoose').Types;
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer')
const { Cart } = require('../Model/CartData')


module.exports = {
    buyNowPost: async (req, res) => {
        try {

            let cart = await Cart.findOne({ userId: req.session.userId })

            const productId = req.params.productId
            const product = await Products.findById(productId)
            // console.log("the product" + product);
            req.session.productDetails = product
            req.session.productDetails2 = product

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

                let couponcode = req.body.coupon
                const CouponCode = await Coupon.findOne({ couponcode: couponcode })
                let couponId = CouponCode._id




                // console.log(cart.products);
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
                // console.log(`total  :${cart.TotalAmount}`);


                // console.log(user);
                // console.log(cart.products);

                res.render('checkOut', { cart, user, profile, cartDetails })
            } catch (err) {
                console.log(err);
            }
        }


    },

    Checkoutpost: async (req, res) => {
        if (req.session.email) {
            try {

                const userId = req.session.userId;

                let cart;

                const productId = req.session.productDetails2

                const productDetails = await Products.findById(productId)

                const cartDetails = await Cart.findOne({ userId: req.session.userId })
                    .populate('products.productId');

                let order;

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
                    // console.log(totalAmount);
                    cart.TotalAmount = totalAmount;

                    const { name, phone, address, pincode, coupon, payment } = req.body
                    console.log(" first body", req.body);
                    order = new Order({
                        products: cart.products,
                        Name: name,
                        Phone: phone,
                        Address: address,
                        Pincode: pincode,
                        Coupon: coupon,
                        TotalAmount: cart.TotalAmount,
                        Payment: [{ type: payment }],
                        PaymentStatus: "Pending",
                        userId: userId,
                        status: "Pending"
                    })
                    // Saving the order


                    if (!Coupon == "") {

                        const CouponCode = await Coupon.findOne({ couponcode: Coupon });
                        let couponId = CouponCode._id

                    }

                    const orderPlaced = await order.save()
                    console.log(orderPlaced, "Order placed");
                    console.log('order saved');

                    if (orderPlaced) {

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

                    const { name, phone, address, pincode, coupon, payment } = req.body

                    console.log("req body befor saving", req.body);

                    order = new Order({
                        products: cart.products,
                        Name: name,
                        Phone: phone,
                        Address: address,
                        Pincode: pincode,
                        Coupon: coupon,
                        TotalAmount: cart.TotalAmount,
                        Payment: [
                           {type: payment}
                        ],
                        PaymentStatus: "Pending",
                        userId: userId,
                        status: "Pending"
                    })


                    if (Coupon) {

                        const CouponCode = await Coupon.findOne({ couponcode: Coupon });
                        let couponId = CouponCode._id

                    }

                    await order.save()
                    console.log(" order placed  :", order);

                }

                if (req.body.payment == "COD") {

                    console.log("cod  is   :", req.body.payment);
                    res.status(200).json({ success: true, message: "Order Placed Successfully! Your order will be processed soon." })

                } else {

                    let Totalamount = order.TotalAmount;

                    var instance = new Razopay({
                        key_id: RAZORPAY_ID_KEY,
                        key_secret: RAZORPAY_SECRET_KEY
                    });


                    var options = {
                        amount: Totalamount,
                        currency: "INR",
                        receipt: toString(order._id)
                    };

                    const key_id = RAZORPAY_ID_KEY

                    instance.orders.create(options, function (err, CreateOrder) {
                        if (err) {
                            console.log(err);
                            return (err);
                        } else {
                            console.log("order is here " + JSON.stringify(CreateOrder));

                        }

                        res.json({ CreateOrder, key_id, order });
                    });
                }
            } catch (err) {
                console.log(err)
                res.status(500).json({ success: false, message: 'Error creating order' });
            }

        } else {
            res.redirect('/login')
        }

    },



    orderpalced_successget: (req, res) => {
        res.render('orderPlaced')
    },



    review_productget: async (req, res) => {
        res.render('productReview')
    },

    review_productpost: async (req, res) => {
    }

}
