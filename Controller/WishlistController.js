const { User, Profile, Whishlist } = require('../Model/UserData')
const { Products, Category } = require('../Model/ProductDatas')
const { Order } = require('../Model/OrderData')
const { default: mongoose } = require('mongoose')
const { ObjectId } = require('mongoose').Types;
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer')
const { Cart } = require('../Model/CartData')



module.exports ={
    Whishlistget: async (req, res) => {
        try {
            if (req.session.email) {


                let cart = await Cart.findOne({ userId: req.session.userId })

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

                res.render('whishlist', { wishLists, user, products: products,cart });
            }
            else {
                res.redirect("/login")
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
        }else{
            res.redirect('/login')
        }



    },

}