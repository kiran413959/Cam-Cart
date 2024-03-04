const express = require('express')
const router = express.Router();
const { loginValidation, signupValidation } = require('../Middleware/Validation')
// ,


const {
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
  Homeget,
  Homepost,
  categoryget,
  categorypost,
  Profileget,
  Profilepost,
  Whishlistget,
  // Wishlistdataget,
  toggleWhishlistpost,
  cartget,
  addToCartPost,
  removeFromcartPost,
  deletefromcartPost,
  buyNowPost,
  Checkoutget,
  Checkoutpost,
  myOrdersget,
  myOrderspost,
  Errorget,
  logoutget,

} = require('../Controller/UserController')




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

  .get('/product', categoryget)
  .post('/product', categorypost)

  //Profile related routes

  .get('/Profile', Profileget)

  .post('/Profile', Profilepost)

  //WishList Related Routs

  .get('/Whishlist', Whishlistget)
  // .get('/wishlist/get',Wishlistdataget)
  .post('/Whishlist/add/:productId', toggleWhishlistpost)


  .get('/cart',cartget)
  .post('/cart/add/:productId', addToCartPost)
  .post('/cart/remove/:productId', removeFromcartPost)
  .post('/cart/delete/:productId', deletefromcartPost)


  
  //CheckOut
  
    .post('/buynow/:productId',buyNowPost)
    .get( '/checkout' , Checkoutget )
    .post( '/checkout' , Checkoutpost )


  //my Oders related Route

  .get('/myOrders', myOrdersget)
  .post('/myOrders', myOrderspost)


  //Error Handling 404 Page Not Found

  .get('/Error', Errorget)

  .get('/logout', logoutget)



module.exports = router