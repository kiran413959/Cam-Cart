const Razopay=require('razorpay')
const {RAZORPAY_ID_KEY,RAZORPAY_SECRET_KEY}=process.env;
const { Order } = require('../Model/OrderData')





module.exports = {

    razopayGet:async (req,res)=>{
        // try{

        //     let razopay = new Razopay({
        //         key_id: RAZORPAY_ID_KEY ,
        //         key_secret: RAZORPAY_SECRET_KEY
        //       });
          
        //       res.redirect('/checkOut')


        // }catch(err){
        //     console.log("Error in getting the payment gateway details", err);
        // }


    },
    razopayPost:async (req,res) =>{
       
console.log("hello")
            
            // console.log("hiiii razorpay");

            console.log("total amount : ",req.body.Paid_Amount)
            
            try{
                const orderId = req.body.orderId
                console.log(" order Id  :", orderId);

                const order=await Order.findById(orderId);

                console.log("order befor payment  : ",order );

                if(!order){
                        throw "Order not found"
                }else{

                    const payment = {
                        PaymentId: req.body.razorpay_payment_id,
                        Amount: req.body.Paid_Amount
                    };

                    order.Payment.push(payment);
                    order.PaymentStatus = "Successful";
                    await order.save();
                //    return res.send   
                    console.log("order after payment  : ",order );


                    return res.status(200).json({success:true,message:"Payment Successfull!!"})
                }
                


            }catch(err){
                console.log("Error in getting the payment gateway details", err);
            }
    
        }


    



}