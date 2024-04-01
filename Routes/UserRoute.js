const express = require('express')
const router = express.Router();
const { loginValidation, signupValidation } = require('../Middleware/Validation')

// ,

const{
  signupget,
  signuppost,
  EmailVerificationget,
  EmailVerificationpost,
  resendEmailget,
  resendEmailpost,
  loginget,
  loginpost,
  OtpValidationget,
  OtpValidationpost,
  fotgetPasswordget,
  fotgetPasswordpost,
}= require('../Controller/user_Auth_Controller')



const {
  Homeget,
  Homepost,
  
  Profileget,
  Profilepost,
 
  Errorget,
  logoutget,

} = require('../Controller/UserController')



const {
  myOrdersget,
  myOrderspost,
}=require("../Controller/Order_Controller")

const {
  buyNowPost,
  Checkoutget,
  Checkoutpost ,
  orderpalced_successget,
  review_productget,
  review_productpost

}=require('../Controller/checkOut_Controller')


const {
  couponApplyget,
  couponApplypost
}=require('../Controller/coupon_Controller');


const {
    razopayGet,
    razopayPost
 }=require('../Controller/Payment_Controller')

router.get('/signup', signupget)
      .post('/signup', signupValidation, signuppost)

  //For OTP Validation

      .get('/OtpValidation', OtpValidationget)
      .post('/OtpValidation', OtpValidationpost)

  //Middleware for protect the route
  //   

      .get('/login', loginget)
      .post('/login', loginValidation, loginpost)

  // Route for sending email to user's registered email id

      .get('/EmailVerification/:token', EmailVerificationget)
      .post('/EmailVerification/:token', EmailVerificationpost)

  //route for resend email
      .get('/resendEmail', resendEmailget)
      .post('/resendEmail', resendEmailpost)


  //Route For Forgot Password

      .get('/fotgetPassword', fotgetPasswordget)
      .post('/fotgetPassword', fotgetPasswordpost)  

  //All Routes are protected from here


      .get('/Home', Homeget)
      .post('/Home', Homepost)

  // CRUD operation on Category

  

  //Profile related routes

      .get('/Profile', Profileget)

      .post('/Profile', Profilepost)

 
  //CheckOut
  
      .post('/buynow/:productId',buyNowPost)
      .get( '/checkout' , Checkoutget )
      .post( '/checkout' , Checkoutpost )
    
    .get('/Order_Placed_Success', orderpalced_successget  )
  
  .get('/review_product',review_productget)
  .post( '/addReview' , review_productget)


  //my Oders related Route

      .get('/myOrders', myOrdersget)
      .post('/myOrders', myOrderspost)


  // Coupon Routes

      .get('/couponApply',couponApplyget)
      .post('/couponApply',couponApplypost)



    //  RAZOPAY Payment  Gateway API Calls

    .get('/razopay', razopayGet)
    .post('/razorpay-payment-successful',razopayPost)


  //Error Handling 404 Page Not Found

      .get('/Error', Errorget)

      .get('/logout', logoutget)



module.exports = router