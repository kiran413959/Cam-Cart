const { string } = require('joi')
const mongoose = require('mongoose')


adminSchema = new mongoose.Schema({

   name: {
      type: String,
      

   },
   employeeId: {
      type: Number,  //employee id from the database of employees

   },
 
   email: {
      type: String,
      required: true,
   },
 
   password: {
      type: String,
      required: true
   },

   isVerified: {
      type: Boolean,
      default: true
   },
   role: {
      type: String,
      default: true,
   }


})

module.exports = {
   Admin: mongoose.model("AdminDetais", adminSchema)
}