
const { Admin } = require('../Model/AdminData');
const { Products, Category, Brand } = require('../Model/ProductDatas');
const { Order } = require('../Model/OrderData')

const express = require('express')
const { User, Profile } = require('../Model/UserData')
const { default: mongoose } = require('mongoose')
const { ObjectId } = require('mongoose').Types;
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer')


const sendVarificationEmail = require('../utils/sendEmail')






module.exports = {

    dashBoardget: async (req, res) => {
        if(req.session.employeeId){
    
        console.log(req.session.employeeId)
        const admin = await Admin.findOne( {employeeId:req.session.employeeId} )
        console.log(admin)

        res.render('dashBoard', { admin })
        }else{
            res.redirect('/admin_login')
        }
    },
    dashBoardpost: (req, res) => {
    },


    progress_chartget: async (req,res)=>{

    },
    progress_chartpost: async (req,res)=>{
        

    },

    
    customersget: async (req, res) => {
        if(req.session.email){
            try{
                const admin = await Admin.findOne( {employeeId:req.session.employeeId} )
                console.log(admin)
                
                let  userdata = await User.find()
                
                console.log(userdata);

                const profiledata= await Profile.find()
                
                console.log(profiledata);


                const OrdersData= await  Order.find().populate({ path:'products.productId',model:'products'})
                console.log(OrdersData);
                  
                
                res.render('customers', { userdata,admin,profiledata,OrdersData });
            }catch(err){
                console.log(err);
            }
        }else{
            res.redirect('/admin_login')
        }

    },
    customerspost: (req, res) => {

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
    coupons_Detailsget: (req, res) => {
        res.render('coupon')

    },
    coupons_Detailspost: (req, res) => {

    },
    salesReportget: (req, res) => {
        res.render("salesReport")
    },
    salesReportpost: (req, res) => {
    }
}
