
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
        }
    },
    dashBoardpost: (req, res) => {
    },

    
    customersget: async (req, res) => {

        newprofile = await User.find()

        res.render('customers', { newprofile });

    },
    customerspost: (req, res) => {

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
