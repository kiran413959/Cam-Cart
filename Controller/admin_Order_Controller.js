
const { Admin } = require('../Model/AdminData');
const { Products, Category, Brand } = require('../Model/ProductDatas');
const { Order } = require('../Model/OrderData')

const express = require('express')
const { User, Profile } = require('../Model/UserData')
const { default: mongoose } = require('mongoose')
const { ObjectId } = require('mongoose').Types;
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer')


module.exports={

    Ordersget: async (req, res) => {
        const orders = await  Order.find().populate({ path:'products.productId',model:'products'})
        // console.log(orders[0].products);
      
        
        if (!orders[0]) return res.status(401).send({ msg: "No data found" });
        else{  

        
        console.log(orders,"Orders");
        res.render('order_List',{orders})
        }
    },
    Orderspost: (req, res) => {

    },



}