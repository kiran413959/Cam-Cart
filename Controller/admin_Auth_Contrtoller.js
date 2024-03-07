const { Admin } = require('../Model/AdminData');
const { Products, Category, Brand } = require('../Model/ProductDatas');
const express = require('express')
const { User, Profile } = require('../Model/UserData')
const { default: mongoose } = require('mongoose')
const { ObjectId } = require('mongoose').Types;
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer')





module.exports={


    /////*****************  ADMIN  *******************/////

    
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
    admin_loginpost:async  (req, res) => {
       try {
        console.log(req.body,"req");
        const email = req.body.email
        console.log('email', email,"email");
        const admin = await Admin.findOne({ email: email })
        console.log(admin ,"admin");
        console.log(admin.isVerified)
        if (admin.isVerified === true) {
            req.session.employeeId = admin.employeeId
            console.log("redirecting to home")
            res.redirect('/dashBoard')

        } else {
            req.msg = 'Account not verified';
            return res.json({ success: false });
        }
       } catch (error) {
        console.log(error);
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
}
