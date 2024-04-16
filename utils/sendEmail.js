const nodemailer=require('nodemailer')
// const {signupValidation}=require("../validation")



const sendVarificationEmail= async(email,name,token)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user:process.env.AUTH_EMAIL,
            pass:process.env.AUTH_PASS
        },
    });

    console.log("email is ready");

    const link=`http://51.20.18.107:2003/EmailVerification/${token}`;

      const info = await transporter.sendMail({
        from: '"CamCart" <camcaart007@gmail.com>',
        to: email, 
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<div> <h1>hi ${name} </h1> <br/> <p> click the buttun to verify your email  <a href=${link} >click here </a> </p> </div>`, 
      });
    
      console.log("Message sent: %s", info.messageId);
}


module.exports=sendVarificationEmail;