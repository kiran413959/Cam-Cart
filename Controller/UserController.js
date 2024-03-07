const express = require('express')
const { User, Profile, Whishlist } = require('../Model/UserData')
const { Products, Category } = require('../Model/ProductDatas')
const { Order } = require('../Model/OrderData')
const { default: mongoose } = require('mongoose')
const { ObjectId } = require('mongoose').Types;
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer')
const { Cart } = require('../Model/CartData')


const sendVarificationEmail = require('../utils/sendEmail')



module.exports = {

   
    Homeget: async (req, res) => {
        const user = await User.findById(req.session.userId)
        // console.log(id);

        res.render('userHome', { user });

    },
    Homepost: (req, res) => {


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
    Profilepost: async (req, res) => {
        const userId = req.session.userId
        const { phone, age, address } = req.body
        const profile = await Profile.findOneAndUpdate({ userId },

            { phone, age, address }, { upsert: true, new: true })

        if (profile) {
            res.redirect('/profile')
        } else {
            return res.sendStatus(406)
        }
        // console.log(profile);
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


