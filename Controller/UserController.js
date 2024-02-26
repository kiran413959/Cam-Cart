const express = require('express')
const { User, Profile, Token, Whishlist } = require('../Model/UserData')
const { Products, Category } = require('../Model/ProductDatas')
const { default: mongoose } = require('mongoose')
const { ObjectId } = require('mongoose').Types;
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer')
const { Cart } = require('../Model/CartData')


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
        const email = req.body.email
        console.log('email', email);
        const user = await User.findOne({ email: email })
        console.log(user);
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
            // console.log('category:', category);

            // console.log(category);
            if (!category) {
                // Handle case where no products are found for the specified category
                return res.status(404).json({ error: "No products found for the specified category" });
            }
            const wishlist = await Whishlist.findOne({ userId: req.session.userId })
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

                // console.log('wishlist:', wishlist.products);


            } catch (err) {
                console.log(err)
            }
        }



    },

    cartget: async (req, res) => {
        console.log(req.session.email);
        if (req.session.email) {
            try {
                const user = await User.findById(req.session.userId)
                const cart = await Cart.findOne({ userId: req.session.userId })
                    .populate('products.productId')
                // console.log(user);

                console.log(`hiii${cart.products}`);
              
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
              
                res.render('cart', {  cart, user });

            } catch (err) {
                console.log(err);
            }
        }
    },

    addToCartPost: async (req, res) => {
        if (req.session.email) {
            // console.log(req.session.userId);
            try {
                const productId = req.params.productId;
                const productId1 = new mongoose.Types.ObjectId(productId);
                const userId = req.session.userId;
                console.log(userId);
                console.log("hiiiii" + productId);
                let cart = await Cart.findOne({ userId: userId })
                const   product=await Products.findById(productId1).lean()
                if (!cart) {
                    cart = new Cart({
                        products: [],
                        userId: userId,
                        TotalAmount: 0
                    })
                }
                console.log(cart);

                let productExists = cart.products.find(item => item.productId == productId)


                if (productExists) {
                    // Check if the product exists in the cart
                    for (let product of cart.products) {
                        if (product.productId.toString() === productId) {
                            product.quantity++;
                            break;
                        }
                    }
                    productExists.price = product.price * productExists.quantity;
                  
                    await productExists.save();
                }


                if (!productExists) {
                    const product = await Products.findById(productId);
                    console.log(product);
                    // If the product doesn't exist, add it to the cart with quantity 1
                    cart.products.push({
                        productId: productId1,
                        quantity: 1,
                        price:product.price
                    });
                }
                // Calculate total amount and save the cart
                cart.TotalAmount = cart.products.reduce((total, product) => {
                    return total + product.price;
                }, 0)

                await cart.save();

                console.log(cart);
                res.status(200).json({ success: true });
            } catch (err) {
                console.log(err)
            }
        }

    },
    removeFromcartPost: async (req, res) => {

        if (req.session.email) {
            try {
                const productId = req.params.productId;
                const userId = req.session.userId;
                const product=await Products.findById(productId);
                console.log(userId);
                console.log("hlooooo" + productId);

                let cart = await Cart.findOne({ userId: userId })

                let productIndex = cart.products.findIndex(item => item.productId.toString() === productId)

                if (productIndex !== -1) {
        // If the product exists in the cart, decrement its quantity by 1
                    if (cart.products[productIndex].quantity > 1) {
                        cart.products[productIndex].quantity--;
                        cart.products[productIndex].price = product.price * cart.products[productIndex].quantity
                    } else {
                         // If the quantity is already 1, do not decrement further
                         return res.status(400).json({ success: false, error: "Minimum quantity reached" });
                    }
                } else {
                    return res.status(404).json({ success: false, error: "Product not found in cart" });
                }


                // Calculate total amount and save the cart
                cart.TotalAmount = product.price * cart.products[productIndex].quantity;
              
                

                // Save the updated cart to the database
                await cart.save();

                console.log(cart);
                res.status(200).json({ success: true });


            } catch (err) {
                console.log(err)
                res.status(500).json({ success: false, error: "Internal Server Error" });
            }
        } else {
            res.status(401).json({ success: false, error: "Unauthorized" });
        }


    },
    deletefromcartPost: async (req, res) => {

        try{
            if(req.session.email){
                const userId = req.session.userId;
                const productId = req.params.productId;
                const cart=await Cart.findOne({userId:userId});
                await cart.products.deleteOne({productId:productId})
                
                await cart.save()
                .then(()=>res.status(200).send())
                .catch(()=>res.status(404))

                console.log(cart);
                if(!cart)
                   throw new Error("No such cart exists!");
                res.status(200).json({success:true,message:"Deleted from cart!"})
            }else{
               return res.status(401).json({success:false,error:"User is not logged In!"})
            }
             
        

        }catch(err){
            console.log(err);
        }



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


