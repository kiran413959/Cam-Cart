const { User, Profile, Token } = require('../Model/UserData')
const { default: mongoose } = require('mongoose')




module.exports={

    Productget:(req,res)=>{

    },
    Productpost:(req,res)=>{

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
        const user= await  User.findById(req.session.userId)
        console.log(user)
        res.render('cart',{user})
    },
    cartpost:(req,res)=>{

    },
    Paymentget:(req,res)=>{

    },
    Paymentpost:(req,res)=>{

    }
}