const express = require('express')
const router = express.Router()





const{
    categoryget,
    categorypost,

    Oderget,
    Oderpost,
    review_productget,
    review_productpost,

    OderStatusget,
    OderStatuspost,
    Paymentget,
    Paymentpost,


}=require('../Controller/ProductsController')


const {
    Whishlistget,
    // Wishlistdataget,
    toggleWhishlistpost,
}=require('../Controller/WishlistController')


const {

    cartget,
    cartcountpopst,
    addToCartPost,
    removeFromcartPost,
    deletefromcartPost,

}=require('../Controller/cartController')




router
.get('/product', categoryget)
.post('/product', categorypost)


 //WishList Related Routs

 .get('/Whishlist', Whishlistget)
 // .get('/wishlist/get',Wishlistdataget)
 .post('/Whishlist/add/:productId', toggleWhishlistpost)


      .get('/Oder',Oderget)
      .post('/Oder',Oderpost)
      .get('/OderStatus',OderStatusget)
      .post('/OderStatus',OderStatuspost)


      .get('/cart',cartget)
      .post('/cart/count/:productId', cartcountpopst)
      .post('/cart/add/:productId', addToCartPost)
      .post('/cart/remove/:productId', removeFromcartPost)
      .post('/cart/delete/:productId', deletefromcartPost)


      .get('/Payment',Paymentget)
      .post('/Payment',Paymentpost)



      // review product

      .get('/review_product/:productId',review_productget)
      .post( '/addReview/:productId' , review_productpost)


module.exports=router