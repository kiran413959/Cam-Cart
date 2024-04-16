const { User, Profile, Whishlist } = require('../Model/UserData')
const { Products, Category } = require('../Model/ProductDatas')
const { Order } = require('../Model/OrderData')
const { default: mongoose } = require('mongoose')
const { ObjectId } = require('mongoose').Types;
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer')
const { Cart } = require('../Model/CartData')





module.exports = {
    cartget: async (req, res) => {
        console.log(req.session.email);
        if (req.session.email) {
            try {
                const user = await User.findById(req.session.userId)
                let cart = await Cart.findOne({ userId: req.session.userId })
                    .populate('products.productId')
                // console.log(user);
                console.log(cart);

                // console.log(`hiii${cart.products}`);

                let totalAmount = 0;
                if (cart && cart.products) {
                    for (let product of cart.products) {
                        if (product.productId && product.productId.price && product.quantity) {
                            totalAmount += product.productId.price * product.quantity;
                        }
                    }
                    cart.TotalAmount = totalAmount;
                }else{
                    cart = {
                        products: [],
                    }
                    cart.TotalAmount=0
                }


                console.log(cart.TotalAmount);

                res.render('cart', { cart, user });

            } catch (err) {
                console.log(err);
            }
        } else {
            res.redirect('/login')
        }
    },

    cartcountpopst: async (req, res) => {

        if(req.session.email){
            try{

                const productId = req.params.productId;
                const productId1 = new mongoose.Types.ObjectId(productId);

                console.log("Product ID : " + productId);
                const userId = req.session.userId;
                console.log("User Id : "+userId);
                let cart = await Cart.findOne({ userId: req.session.userId }) 
                console.log("Cart : ", cart);
                const product = await Products.findById(productId1).lean()


                if (!cart) {
                    cart = new Cart({
                    products: [],
                    userId: userId,
                    TotalAmount: 0
                })
            }      


                let productExists = cart.products.find(item => item.productId == productId)


                console.log("Does the Product Exists ? ", productExists);
                
                if (!productExists) {

                    const product = await Products.findById(productId);
                    console.log(product);
                    // If the product doesn't exist, add it to the cart with quantity 1
                    cart.products.push({
                        productId: productId1,
                        quantity: 1,
                        price: product.price
                    });
                    cartCount=  cart.products.length;
                    res.json({ count: true  });

                }else{
                res.json({ count: false  });

                }
                // Calculate total amount and save the cart
                cart.TotalAmount = cart.products.reduce((total, product) => {
                    return total + product.price;
                }, 0)

                await cart.save();


                res.status(200).json({ success: true  });

            }catch(err){

                console.log(err);
            }
        }else {
            res.redirect('/login')
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
                
                const product = await Products.findById(productId1).lean()
                let cartCount
                
                if (!cart) {
                        cart = new Cart({
                        products: [],
                        userId: userId,
                        TotalAmount: 0
                    })
                }
                // console.log(cart);

                let productExists = cart.products.find(item => item.productId == productId)

                console.log(productExists);

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
                
                
                // if (!productExists) {
                //     const product = await Products.findById(productId);
                //     console.log(product);
                //     // If the product doesn't exist, add it to the cart with quantity 1
                //     cart.products.push({
                //         productId: productId1,
                //         quantity: 1,
                //         price: product.price
                //     });

                //     cartCount=  cart.products.length;
                //         //     console.log(cartCount , ":   is the count after");
                //     // res.json({ count: true });

                // }
                // Calculate total amount and save the cart
                cart.TotalAmount = cart.products.reduce((total, product) => {
                    return total + product.price;
                }, 0)
                

                await cart.save();

                // console.log(cart);
                res.status(200).json({ success: true  });
            } catch (err) {
                console.log(err)
            }
        } else {
            res.redirect('/login')
        }

    },
    removeFromcartPost: async (req, res) => {

        if (req.session.email) {
            try {
                const productId = req.params.productId;
                const userId = req.session.userId;
                const product = await Products.findById(productId);
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
                        cart.products[productIndex].price = product.price * 1  ;

                        return res.status(200).json({ success: true, error: "Minimum quantity reached" });
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

        if (req.session.email) {
            try {
                const userId = req.session.userId;
                const productId = req.params.productId;
                console.log(productId);
                const cart = await Cart.findOne({ userId: userId });
                console.log('cart before removing:', cart);
                cart.products.pull({ productId: productId });
                //  cart.TotalAmount -= cart.products.id(productId).price;  

                const deletedProduct = cart.products.id(productId);
                if (deletedProduct) {
                    cart.TotalAmount -= deletedProduct.price;
                }

                await cart.save()

                // 
                console.log('cart after removing:', cart);
                if (!cart)
                    throw new Error("No such cart exists!");
                res.status(200).json({ success: true, message: "Deleted from cart!" })
            } catch (err) {
                console.log(err);
            }


        } else {
                res,redirect( '/login' )
                // return res.status(401).json({ success: false, error: "User is not logged In!" })
        }


    },
}