
const { Admin } = require('../Model/AdminData');
const { Products, Category, Brand } = require('../Model/ProductDatas');
const express = require('express')
const { User, Profile, Token } = require('../Model/UserData')
const { default: mongoose } = require('mongoose')
const { ObjectId } = require('mongoose').Types;
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer')


const sendVarificationEmail = require('../utils/sendEmail')






module.exports = {

    admin_signupget: (req, res) => {

        if (req.session.email) {
            res.redirect('/dashBoard')
        } else {

            res.render('admin_Login_signup')
        }

        // res.render('admin_Login_signup')

    },
    admin_signuppost: (req, res) => {
        const defaultRole = 'admin';
        req.session.role = defaultRole;
        res.redirect('/admin_login')


    },
    admin_loginget: (req, res) => {
        if (req.session.email) {
            console.log('email found')
            res.redirect('/dashBoard')
        } else {
            const isVerified = {
                isVerified: false
            }
            const errorMessage = req.query.error
            res.render('admin_Login_signup', { isVerified: isVerified, errorMessage });

        }
        // res.render('admin_Login_signup')
    },
    admin_loginpost: async (req, res) => {
        console.log(req.body);
        const email = req.body.email
        console.log('email', email);
        const admin = await Admin.findOne({ email: email })
        console.log(admin);
        console.log(admin.isVerified)
        if (admin.isVerified === true) {
            console.log("redirecting to home")
            res.redirect('/dashBoard')

        } else {
            req.msg = 'Account not verified';
            return res.json({ success: false });
        }

    },
    EmailVerificationget: async (req, res) => {
        const token = req.params.token;
        try {
            const dToken = jwt.verify(token, process.env.JWT_SECRET);
            console.log("token", dToken)
            const updatedAdmin = await User.findOneAndUpdate({
                // isVerified:true,
                email: dToken.email
            }, {
                $set: {
                    isVerified: true
                }
            }, { new: true });

            console.log(updatedAdmin);
            if (!updatedAdmin) {
                throw Error("account not found")
            }

            return res.render('emailVerification')


        } catch (error) {
            console.error("Token verification failed:", error);
            return res.status(400).json({ error: "Token verification failed" });
        }
    },
    EmailVerificationpost: async (req, res) => {
        try {
            const adminId = req.params.id;

            // Fetch the user from the database by ID
            const admin = await Admin.findById(adminId);

            if (!admin) {
                return res.status(404).send({ status: 'fail', message: 'Account not found' });
            }

            // Mark the user's email as verified
            admin.isVerified = true;
            await admin.save();
            console.log(admin);

            console.log("Email verified successfully");
            if (admin.isVerified === true) {
                res.redirect('/login')
            }
            // Send a success response
            return res.status(200).send({ status: 'success', message: 'Email Verified', admin });

        } catch (error) {
            console.error("Error verifying email:", error);
            // Send a failure response
            return res.status(500).send({ status: 'fail', message: 'Something went wrong!' });
        }
    },
    resendEmailpost: async (req, res) => {
        const email = req.body.email;

        try {
            // Generate a new JWT token for email verification
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Find the user by email
            const admin = await Admin.findOne({ email });

            if (!admin) {
                // If admin not found, return an error response
                return res.status(404).json({ resend: false, error: 'Account not found' });
            }


            const name = admin.name;

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
    dashBoardget: async (req, res) => {

        // if (req.session.role === true) {
        //     const products = await Product.find()
        //     res.render("adminhome", { products })
        // } else {
        //     res.redirect('/login')
        // }
        // res.render('adminhome')
        const admin = await Admin.findById( {employeeId:req.session.employeeId} )
        console.log(admin)

        res.render('dashBoard', { admin })

    },
    dashBoardpost: (req, res) => {
    },

    Product_listget: async (req, res) => {

        Items = await Products.find()
        Type = await Category.find();
        company = await Brand.find();
        res.render('products', { Items, Type, company })

        

    },
    Product_listpost: (req, res) => {

    },
    customersget: async (req, res) => {

        newprofile = await User.find()

        res.render('customers', { newprofile });

    },
    customerspost: (req, res) => {

    },
    Ordersget: (req, res) => {
        res.render('order_List')
    },
    Orderspost: (req, res) => {

    },

    Add_Brandget: (req, res) => {



    },


    Add_Brandpost: async (req, res) => {

        const brandName = req.body;
        console.log(brandName);
        if (!brandName) {
            return res.status(400).json({ message: "please fill all fields" })

        } else {
            let newBrand = new Brand({
                brandName: brandName.brandName

            });
            await newBrand.save()
            console.log(newBrand)

            res.redirect('/addProduct');
        }

    },

    Add_Categoryget: (req, res) => {


    },
    Add_Categorypost: async (req, res) => {

        const categoryName = req.body;
        console.log(categoryName);
        if (!categoryName) {
            return res.status(400).json({ message: "please fill all fields" })

        } else {
            let newCategory = new Category({
                categoryName: categoryName.categoryName

            });
            await newCategory.save()
            console.log(newCategory)

            res.redirect('/addProduct');
        }

    },
    Add_Productget: (req, res) => {
        res.render('addProduct')

    },
    Add_Productpost: async (req, res) => {
        console.log(req.body);
        const { name, brand, category, discription, price } = req.body;
        if (!name || !price || !category || !discription || !brand) return res.send("Please fill out all fields")

        try {

            let foundCategory = await Category.findOne({ categoryName: category })
            let foundBrand = await Brand.findOne({ brandName: brand });

            console.log(foundCategory);
            console.log(foundBrand);


            const imageurl = req.file.filename
            const newProduct = new Products({
                imageurl:imageurl,
                name,
                brand: foundBrand,
                category: foundCategory.categoryName,
                discription,
                price
            })
            await newProduct.save()
            console.log(newProduct);
            res.redirect('/addProduct')

        } catch (e) {
            console.log(e)
        }
    },
    Update_Productget: (req, res) => {

    },
    Update_Productpost: (req, res) => {

    },
    Indboxget: (req, res) => {
        res.render('inbox')


    },
    Indboxpost: (req, res) => {

    },
    Manage_Revivewsget: (req, res) => {
        res.render('reviwes')

    },
    Manage_Revivewspost: (req, res) => {

    },
    Paymentsget: (req, res) => {
        res.render('payments')

    },
    Paymentspost: (req, res) => {

    },
    Stock_Detailsget: (req, res) => {
        res.render('stockDetails')

    },
    Stock_Detailspost: (req, res) => {

    },
    salesReportget: (req, res) => {
        res.render("salesReport")
    },
    salesReportpost: (req, res) => {
    }
}
