const express = require('express')
const { User, Profile, Token, Whishlist } = require('../Model/UserData')
const { Products, Category } = require('../Model/ProductDatas')
const { default: mongoose } = require('mongoose')
const { ObjectId } = require('mongoose').Types;
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer')
const {Cart}=require('../Model/CartData')


const sendVarificationEmail = require('../utils/sendEmail')







module.exports = {

    signupget: (req, res) => {
        if (req.session.email) {
            res.redirect('/Home')
        } else {

            res.render('signup')
        }
        // res.render('signup')

    },
    signuppost: (req, res) => {
        const defaultRole = 'user';
        req.session.role = defaultRole;
        res.redirect('/login')

    },
    EmailVerificationget: async (req, res) => {

        const token = req.params.token;
        try {
            const dToken = jwt.verify(token, process.env.JWT_SECRET);
            console.log("token", dToken)
            const updatedUser = await User.findOneAndUpdate({
                // isVerified:true,
                email: dToken.email
            }, {
                $set: {
                    isVerified: true
                }
            }, { new: true });

            console.log(updatedUser);
            if (!updatedUser) {
                throw Error("User not found")
            }

            return res.render('emailVerification')


        } catch (error) {
            console.error("Token verification failed:", error);
            return res.status(400).json({ error: "Token verification failed" });
        }
    },
    EmailVerificationpost: async (req, res) => {
        try {
            const userId = req.params.id;

            // Fetch the user from the database by ID
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).send({ status: 'fail', message: 'User not found' });
            }

            // Mark the user's email as verified
            user.isVerified = true;
            await user.save();
            console.log(user);

            console.log("Email verified successfully");
            if (user.isVerified === true) {
                res.redirect('/login')
            }
            // Send a success response
            return res.status(200).send({ status: 'success', message: 'Email Verified', user });

        } catch (error) {
            console.error("Error verifying email:", error);
            // Send a failure response
            return res.status(500).send({ status: 'fail', message: 'Something went wrong!' });
        }
    },
    resendEmailget: async (req, res) => {

    },
    resendEmailpost: async (req, res) => {
        const email = req.body.email;

        try {
            // Generate a new JWT token for email verification
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Find the user by email
            const user = await User.findOne({ email });

            if (!user) {
                // If user not found, return an error response
                return res.status(404).json({ resend: false, error: 'User not found' });
            }


            const name = user.name;

            // Send verification email
            await sendVarificationEmail(email, name, token);

            // Send success response
            return res.status(200).json({ resend: true, msg: 'Verification Email has been Sent!' });
        } catch (error) {
            console.error("Error sending verification email:", error);
            // Send error response
            return res.status(500).json({ resend: false, error: "Failed to send verification email" });
        }
    },


    loginget: (req, res) => {
        if (req.session.email) {
            console.log('email found')
            res.redirect('/Home')
        } else {
            const isVerified = {
                isVerified: false
            }
            const errorMessage = req.query.error
            res.render('login', { isVerified: isVerified, errorMessage });

        }
        // res.render('login');

    },
    loginpost: async (req, res) => {
        console.log(req.body);
        const email = req.body.email
        console.log('email', email);
        const user = await User.findOne({ email: email })
        console.log(user);
        console.log(user.isVerified)
        if (user.isVerified === true) {
            console.log("redirecting to home")
            return res.json({ success: true, alert: true })
        } else {
            req.msg = 'user not verified';
            return res.json({ success: false });
        }
    },
    fotgetPasswordget: (req, res) => {

    },
    fotgetPasswordpost: (req, res) => {

    },
    OtpValidationget: (req, res) => {

    },
    OtpValidationpost: (req, res) => {

    },
    Homeget: async (req, res) => {
        const user = await User.findById(req.session.userId)
        console.log(user)


        // console.log(id);

        res.render('userHome', { user });

    },
    Homepost: (req, res) => {


    },
    categoryget: async (req, res) => {

        try {
            const catName = req.query.category;

            // Query the database for products in the specified category
            const category = await Products.find({ category: catName });
            console.log('category:', category);

            // console.log(category);
            if (!category) {
                // Handle case where no products are found for the specified category
                return res.status(404).json({ error: "No products found for the specified category" });
            }
            const wishlist = await Whishlist.findOne({ userId: req.session.userId })
            // console.log('wishlist:', wishlist);
            // Render the 'allProducts' template with the retrieved products
            res.render('allProducts', { category, wishlist: wishlist });
        } catch (error) {
            // Handle any errors that occur during database query or rendering
            console.error("Error retrieving products:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }

    },
    categorypost: (req, res) => {




    },
    Profileget: async (req, res) => {

        try {
            if (req.session.email) {

                const email = req.session.email;
                // console.log(email);
                const user = await User.findOne({ email })
                // console.log(user);     
                const userId = new mongoose.Types.ObjectId(user._id)
                const userData = await User.aggregate([
                    {
                        $match: { _id: userId },

                    },

                    {
                        $lookup: {
                            from: "profiles",
                            localField: "_id",
                            foreignField: "userId",
                            as: 'info'

                        },
                    },

                ])
                const userProfile = userData[0]
                const userProfile2 = userData[0].info[0]
                console.log(userProfile);
                res.render("profile", { user: userProfile, user2: userProfile2 })
            } else {
                res.redirect('/login')
            }
        }
        catch (error) {
            console.log(error);
        }
    },
    Profilepost: (req, res) => {


    },
    Whishlistget: async (req, res) => {
        try {
            if (req.session.email) {
                let wishLists = await Whishlist.find({ userId: req.session.userId });
                console.log(wishLists);
                const userEmail = req.session.email;
                console.log(userEmail);
                const user = await User.findOne({ email: userEmail });


                const products = [];

                // Iterate over each wishlist
                for (const wishList of wishLists) {
                    // Iterate over each product ID in the wishlist
                    for (const productId of wishList.products) {
                        // Find the product by its ID and push it to the products array
                        const product = await Products.findById(productId);
                        products.push(product);
                    }
                }

                console.log(products);

                //console.log(whishList);

                res.render('whishlist', { wishLists, user, products: products });
            }
            else {
                res.redirect("/Home")
            }
        } catch (err) {
            console.log(err);
        }
        // , {user , wishlistProducts }
    },

    // 
    // Wishlistdataget: async (req, res) => {
    //     // Wishlist = await Whishlist.findOne({ userId: req.session.userId })

    //     // res.json({ products: Wishlist.products })
    // },


    toggleWhishlistpost: async (req, res) => {

        if (req.session.email) {
            // console.log(req.session.userId);
            try {
                const productId = req.params.productId;
                const userId = req.session.userId;

                let wishlist = await Whishlist.findOne({ userId: userId });
                // console.log(wishlist);
                if (!wishlist) {
                    wishlist = new Whishlist({
                        products: [],
                        userId: userId
                    })
                }
                console.log(req.body)

                const { active } = req.body
                // console.log(active);
                removeWishlist = active === "false" ? true : false;
                //    console.log(`heyyyyyyyyy${removeWishlist}`);


                if (removeWishlist) {

                    wishlist.products.push(productId)
                    res.status(200).json({ success: true, update: true, message: "Added to Wishlist" });

                }
                else {
                    wishlist.products.pull(productId)
                    res.status(200).json({ success: true, update: false, message: "Removed from WishList" });


                }

                await wishlist.save();
                // res.status(200).json({ success: true ,update:true }); 
                //    console.log(wishlist);

                console.log('wishlist:', wishlist.products);


            } catch (err) {
                console.log(err)
            }
        }



    },


    addToCartPost: async (req, res) => {
        if (req.session.email) {
            // console.log(req.session.userId);
            try {
                const productId = req.params.productId;
                const userId = req.session.userId;
                let cart = await Cart.findOne({ userId: userId })
                if (!cart) {
                    cart = new Cart({ 
                        products:[],
                        userId: userId })
                }
                const productExist = cart.products.some((item) => item.id == productId)
                if (!productExist) {
                    const product = await Products.findById(productId)
    
                    cart.products.push(product)
                    res.status(200).json({ success:true, update:true, message: "Product added to the cart" })
                } else {
                    for (let i = 0; i < cart.products.length; i++) {
                        if (cart.products[i].id == productId) {
                            cart.products[i].quantity += parseInt(req.body.qty) || 1;
                            break;
                        }
                    }
                }
                await cart.save();
                res.redirect('/');


            } catch (err) {
                console.log(err)
            }
        }

    },
    removeFromcartPost: async (req, res) => {


    },
    cartCountGet: async (req, res) => {


    },






    myOrdersget: async (req, res) => {

        res.render('myOrders');
    },
    myOrderspost: async (req, res) => {
    },
    Errorget: (req, res) => {

    },
    logoutget: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);

            }
            res.redirect('/login')
        })
    },

}


