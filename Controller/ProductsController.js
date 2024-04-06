const { User, Profile, Whishlist } = require('../Model/UserData')
const { Products, Category,Brand,Review } = require('../Model/ProductDatas')
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

    },
    
    review_productget: async (req, res) => {

        if(req.session.email){
            try{
                // console.log(req.session);
             const userId=req.session.userId
             let productId= req.params.productId
             console.log(productId);
              const order = await Order.find({ userId: userId }).populate('products.productId');
              const user = await User.findById(userId)

             // Extract product details from orders
             const products = order.flatMap(order => order.products.map(product => product.productId));
            // console.log("Products:", products);
            // Find the specific product that was requested
          
                let showbutton=false

            products.forEach((product)=>{
                if(product._id==productId){
                    productId= product._id
                    // console.log(productId);
                    showbutton=true
                }
                
            })

            
            
            
            const product = await Products.findById(productId)
            const reviews = await Review.find({productId:productId}).populate('userId')
            console.log(reviews);

            res.render( 'productReview', {product,user,reviews,showbutton}); 
             
          
            }catch(err){
                console.log(err);
                return res.status(500).json({ message : "Internal Server Error" });
            }





        }else{
            res.redirect('/login');
        }




        
    },

    review_productpost: async (req, res) => {
        if(req.session.email){
            try{
               console.log( req.body);
              let  productId= req.params.productId
              let userId = req.session.userId

              console.log(productId);

              const user = await User.findById(userId)
              console.log("user is ", user);
              const product = await Products.findById(productId)
              console.log(product);
            //   const reviews= await Review.findById(userId)
            
            //   console.log(reviews);

              const {review}=req.body

              if(product){

                const userReview = new Review({
                    productId:productId,
                    userId:userId,
                    review:review,
                    Created_At:Date.now()
                })
                await userReview.save()

                
            }


            res.status(200).json({success:true, message: "review Added"})

            }catch(err){
                res.status(500).json({success:false, message: "error while adding review"})
                console.log(err);
            }

        }else{
            res.redirect('/login')
        }






    }
}