const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { string } = require('joi')





const poductSchema = new mongoose.Schema({
    imageurl: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    brand:{
        type:String
        // type: mongoose.Types.ObjectId,  //reference to the Brand model
    },
    category:{
        type:String
      
    },
    discription: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
})



const categorySchema= new mongoose.Schema({
    categoryName: { 
        type:String ,
        required: true  
    } ,
})


const brandSchema= new mongoose.Schema({
    brandName: { 
        type:String ,
        required: true  
    } ,
})

module.exports={ 
    Products:mongoose.model('products',poductSchema),
    Category:mongoose.model('Category',categorySchema),
    Brand:mongoose.model('Brand',brandSchema)
}