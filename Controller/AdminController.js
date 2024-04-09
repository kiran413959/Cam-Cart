
const { Admin } = require('../Model/AdminData');
const { Products, Category, Brand } = require('../Model/ProductDatas');
const { Order } = require('../Model/OrderData')

const express = require('express')
const { User, Profile } = require('../Model/UserData')
const { default: mongoose } = require('mongoose')
const { ObjectId } = require('mongoose').Types;
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer')


const sendVarificationEmail = require('../utils/sendEmail');
const { json } = require('body-parser');






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
                
                
                let  userdata = await User.find()
                

                const profiledata= await Profile.find()
                


                const OrdersData= await  Order.find().populate({ path:'products.productId',model:'products'})
                  
                  
                
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

    BlockUserPost:async (req,res)=>{
        if(req.session.email){

            try {
                
                let userId = req.params.UserId.trim();
                console.log("userId",userId)

                let user = await User.findById(userId)
                console.log(user);

                if(user.access==false){
                    res.status(401).json({ block:true , message:"This account is already blocked"});
                }else{

                    user.access=false;
                    await user.save();
                    res.status(200).json({ success:true,  message:"User has been blocked"});
                    console.log("user after",user);
                }


            } catch (error) {
                res.status(500).json({message:"Server Error!"});
                console.log(error);
            }

        }else{
            res.redirect('/admin_login');
        }

     




    },

    UnblockUserPost:async (req,res)=> {


 if(req.session.email){

            try {
                
                let userId = req.params.UserId.trim();
                console.log("userId",userId)

                let user = await User.findById(userId)
                console.log(user);

                if(user.access==true){
                    res.status(401).json({ unblock:true , message:"This account is already unblocked"});
                }else{

                    user.access=true;
                    await user.save();
                    res.status(200).json({ success:true,  message:"User has been unblocked"});
                    console.log("user after",user);
                }


            } catch (error) {
                res.status(500).json({message:"Server Error!"});
                console.log(error);
            }

                
           

        }else{
            res.redirect('/admin_login');
        }

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
    },


    logoutget: (req, res) => {

        req.session.destroy((err) => {
            if (!err) {
              console.error("Error destroying session:", err);
              return res.redirect('/admin_login')

            }
        
          });
 



    }



    


}
