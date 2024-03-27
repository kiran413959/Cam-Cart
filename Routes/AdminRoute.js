
const express = require('express')
const router = express.Router();
const upload=require('../Middleware/Multer')
const {AdminloginValidation, AdminsignupValidation } = require('../Middleware/adminValidation')


const {
    admin_signupget,
    admin_signuppost,
    admin_loginget,
    admin_loginpost,
    EmailVerificationget,
    EmailVerificationpost,
    resendEmailpost,
}=require('../Controller/admin_Auth_Contrtoller')


const{
   
    dashBoardget,
    dashBoardpost,
    
    progress_chartget,
    progress_chartpost,

    customersget,
    customerspost,

   
   

    Indboxget,
    Indboxpost,

    Manage_Revivewsget,
    Manage_Revivewspost,

    Paymentsget,
    Paymentspost,

    coupons_Detailsget,
    coupons_Detailspost,

    salesReportget,
    salesReportpost,

} = require('../Controller/AdminController')

const{

    Ordersget,
    Orderspost,
    
}=require('../Controller/admin_Order_Controller')


const{
    Product_listget,
    Product_listpost,

    Add_Brandget,
    Add_Brandpost,

    Add_Categoryget,
    Add_Categorypost,

    Add_Couponget,
    Add_Couponpost,

    Add_Productget,
    Add_Productpost,

    Show_Productget,
    Update_Productpost,

}=require('../Controller/admin_Product_controller')

router.get('/admin_signup',admin_signupget)
      .post('/admin_signup',AdminsignupValidation,admin_signuppost)

      .get('/admin_login',admin_loginget)
      .post('/admin_login',AdminloginValidation,admin_loginpost)

      .get('/adminEmailVerification/:token',EmailVerificationget)
      .post('/adminEmailVerification/:token',EmailVerificationpost)

      .post('/resendEmail',resendEmailpost)


      .get('/dashBoard',dashBoardget)
      .post('/dashBoard',dashBoardpost)


      .get('/progress_chart',progress_chartget)
      .post('/progress_chart',progress_chartpost)


      
     

      .get('/products',Product_listget)
      .post('/products',Product_listpost)

      .get('/customers',customersget)
      .post('/customers',customerspost)

      .get('/order_List',Ordersget)
      .post('/order_List',Orderspost)

      
      .get('/addbrand',Add_Brandget)
      .post('/addbrand',Add_Brandpost)  
      
      .get('/addCategory',Add_Categoryget)
      .post('/addCategory',Add_Categorypost) 
      
      .get('/addProduct',Add_Productget)
      .post('/addProduct',upload.single('image'),Add_Productpost)   //multer
      
      .get('/addCoupon',Add_Couponget)
      .post('/addCoupon',Add_Couponpost)  
      
      .post('/show_Product/:productId',Show_Productget)
      .post('/Update_Product',Update_Productpost)

      .get('/inbox',Indboxget)
      .post('/inbox',Indboxpost)

      .get('/Manage_Revivews',Manage_Revivewsget)
      .post('/Manage_Revivews',Manage_Revivewspost)

      .get('/Payments',Paymentsget)
      .post('/Payments',Paymentspost)
      
      .get('/coupons',coupons_Detailsget)
      .post('/coupons',coupons_Detailspost)

      .get('/salesReport',salesReportget)
      .post('/salesReport',salesReportpost);

module.exports = router