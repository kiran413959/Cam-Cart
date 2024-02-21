const mongoose = require('mongoose')
const bcrypt = require('bcrypt')









const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },

    email: {
        type: String,
        required: true,

    },

    password: {
        type: String,
        required: true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    role: {
        type: Boolean,
        default: false
    },
})



const tokenSchema =new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,  
        ref:"User"  //referencing to the User model
    } ,
    tokens:{
        type : String,
        required: true
        },
    createdAt:{

        type:Date,
        default: Date.now(),
        required:true,
        expires: 3600, //expire after one hour
    }    
});

//creating a virtual field "token" which will be accessible as user.tokens
// tokenSchema.virtual("token").get(function () {
//     return this.tokens[this.tokens.length -1];
// });

// const Token=mongoose.model("Token",tokenSchema);
    




const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    // profilepicture:{
    //     type:String,

    // }
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }


});




const WhishlistSchema=new mongoose.Schema({
    products:[        
            mongoose.Types.ObjectId ,                                   
    ],
    userId:{
        type:mongoose.Types.ObjectId,
    }
})




module.exports = {
      User: mongoose.model("usersdetails", userSchema),
    Profile: mongoose.model("profiles", profileSchema),
    Token: mongoose.model("tokens", tokenSchema),
    Whishlist: mongoose.model("whishlist",WhishlistSchema)
}
