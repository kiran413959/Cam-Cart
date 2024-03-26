const { User, Profile, Whishlist } = require('../Model/UserData')
const { Products, Category } = require('../Model/ProductDatas')
const { Order } = require('../Model/OrderData')
const { default: mongoose } = require('mongoose')
const { ObjectId } = require('mongoose').Types;
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer')
const { Cart } = require('../Model/CartData')


module.exports={

    categoryget: async (req, res) => {
        if(req.session.email){   

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

            let cart = await Cart.findOne({ userId: req.session.userId })


            // Render the 'allProducts' template with the retrieved products
            res.render('allProducts', { category, wishlist: wishlist,cart });
        } catch (error) {
            // Handle any errors that occur during database query or rendering
            console.error("Error retrieving products:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }

    }else{
        res.redirect('/login')
    }

    },
    categorypost: (req, res) => {




    },
     
    Oderget:(req,res)=>{

    },
    Oderpost:(req,res)=>{

    },
    OderStatusget:(req,res)=>{

    },
    OderStatuspost:(req,res)=>{

    },
    cartget: async(req,res)=>{
        if(req.session.email){
        const user= await  User.findById(req.session.userId)

        let cart = await Cart.findOne({ userId: req.session.userId })

        console.log(user)
        res.render('cart',{user,cart})
        }else{
            res.redirect('/login')
        }
    },
    cartpost:(req,res)=>{

    },
    Paymentget:(req,res)=>{

    },
    Paymentpost:(req,res)=>{

    }
}