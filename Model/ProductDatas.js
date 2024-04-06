const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { string, ref, date } = require('joi')





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




const reviewSchema = new mongoose.Schema({
    productId :{
        type: mongoose.Types.ObjectId,
        ref:'product'
        },
    
    userId: {
        type: mongoose.Types.ObjectId,
        ref:'usersdetails',
    },
    review:{
        type:String
    },
    Created_At:{
        type:Date
    }

})






module.exports={ 
    Products:mongoose.model('products',poductSchema),
    Category:mongoose.model('Category',categorySchema),
    Brand:mongoose.model('Brand',brandSchema),
    Review:mongoose.model('Review',reviewSchema)
}