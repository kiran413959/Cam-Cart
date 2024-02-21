const express = require('express')
const router = express.Router()


const{
    Productget,
    Productpost,
    Oderget,
    Oderpost,
    OderStatusget,
    OderStatuspost,
    cartget,
    cartpost,
    Paymentget,
    Paymentpost


}=require('../Controller/ProductsController')

router.get('/Product',Productget)
      .post('/Product',Productpost)
      .get('/Oder',Oderget)
      .post('/Oder',Oderpost)
      .get('/OderStatus',OderStatusget)
      .post('/OderStatus',OderStatuspost)
      .get('/cart',cartget)
      .post('/cart',cartpost)
      .get('/Payment',Paymentget)
      .post('/Payment',Paymentpost)

module.exports=router