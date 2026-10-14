/*//const nodemailer=require('nodemailer')
// const {signupValidation}=require("../validation")



const sendVarificationEmail= async(email,name,token)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user:process.env.AUTH_EMAIL,
            pass:process.env.AUTH_PASS
      //  },
    //});

    console.log("email is ready");

    const link=`http://51.20.18.107:2003/EmailVerification/${token}`;

      const info = await transporter.sendMail({
        from: '"CamCart" <camcaart007@gmail.com>',
        to: email, 
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<div> <h1>hi ${name} </h1> <br/> <p> click the button to verify your email  <a href=${link} >click here </a> </p> </div>`, 
    //  });
    
      console.log("Message sent: %s", info.messageId);
//}


module.exports=sendVarificationEmail;*/

const nodemailer = require('nodemailer');
// const { signupValidation } = require("../validation");

const sendVerificationEmail = async (email, name, token) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS
        },
    });

    console.log("email is ready");

    // Fixed: Removed accidental spaces
    const link = `http://51.20.18.107:2003/EmailVerification/${token}`;

    const info = await transporter.sendMail({
        from: '"CamCart" <camcaart007@gmail.com>',
        to: email,
        subject: "Email Verification ✔",
        text: `Hello ${name}, please click the following link to verify your email: ${link}`,
        html: `<div>
            <h1>Hi ${name}</h1>
            <br/>
            <p>Click the button below to verify your email:</p>
            <a href="${link}" style="padding: 10px 15px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
        </div>`,
    });

    console.log("Message sent: %s", info.messageId);
};

module.exports = sendVerificationEmail;
