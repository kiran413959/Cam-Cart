const bcrypt = require('bcrypt');
const { Admin } = require('../Model/AdminData')
const { ObjectId } = require('mongoose').Types
const jwt = require("jsonwebtoken")
const Swal = require('sweetalert2')
// // const nodemailer=require('nodemailer')
require('dotenv').config()
// const sendVarificationEmail = require('../utils/sendEmail')


// const AdminsignupValidation = async (req, res, next) => {
//     // console.log(req.body);
    
//     const { name,employeeId, email, password } = req.body
//     try {
//         const existAdmin = await Admin.findOne({
//             email: email
//         });

//         if (existAdmin) {
//             return res.status(400).json({
//                 message: 'Account already exists',
//             });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hash_password = await bcrypt.hash(password, 10);
//         console.log(salt);
//         console.log(password);

//         const adminData = {
//             name: name,
//             email: email,
//             employeeId: employeeId,
//             password: hash_password,
//             isVerified: false
//         };

//         const newAdmin = new Admin(adminData);
//         await newAdmin.save();

//         const result = {
//             id: newAdmin._id,
//             name: newAdmin.name,
//             email: newAdmin.email,
//             employeeId: newAdmin.employeeId,
//             isVerified: newAdmin.isVerified,
//         };
     
      
//         console.log(result);
        
//         return result;

//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             message: 'Internal Server Error',
//         });
//     }
// }


// // const sendVarificationEmail=({_id,email},res)=>{}







// const AdminloginValidation = async (req, res, next) => {

//     const { email,
//         password,
//         secretkey
//     } = req.body
//     console.log(req.body);
//     console.log(`this is${secretkey}`);
//     // if (!email || !password || !secretkey) {
//     //     return res.json({message:'Please provide an email and a password'})
//     // }
//     try {
//         const admin = await Admin.findOne({ email: email });
//         console.log(admin);
//         if (!admin) {
//             return res.json({message:"No Account found",});
//         }
        
        
//         const validatePassword = await bcrypt.compare(password, admin.password);
//         if (!validatePassword) {
            
//             return res.json({ message: "Invalid Password" })
//         }
//         const employeesecret = admin.employeeId;

//         console.log(employeesecret);
//         if(secretkey==employeesecret){  
//             console.log(secretkey);
//             // return  res.status(401).json({message:`Your Secret key is invalid`})
//         // }else {
//                 req.session.email = admin.email
//                 req.session.role = admin.role;
//                 req.session.employeeId=admin.employeeId;
//                 req.session.adminId = new ObjectId(admin._id);
        
//         }


//         next()

      

//     }
//     catch (error) {
//         console.error(error);
//     }

// }

















// module.exports = { AdminsignupValidation, AdminloginValidation}













const AdminsignupValidation = async (req, res, next) => {
    const { name, employeeId, email, password } = req.body;
    try {
        const existAdmin = await Admin.findOne({ email: email });

        if (existAdmin) {
            return res.status(400).json({ message: 'Account already exists' });
        }

        const hash_password = await bcrypt.hash(password, 10);

        const adminData = {
            name: name,
            email: email,
            employeeId: employeeId,
            password: hash_password,
            isVerified: false,
        };
        

        const newAdmin = new Admin(adminData);
        await newAdmin.save();

        const result = {
            id: newAdmin._id,
            name: newAdmin.name,
            email: newAdmin.email,
            employeeId: newAdmin.employeeId,
            isVerified: newAdmin.isVerified
        };

        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

const AdminloginValidation = async (req, res, next) => {
    const { email, password, secretkey } = req.body;

    console.log(req.body);
    if (!email || !password || !secretkey) {
        return res.status(400).json({ message: 'Please provide an email, password, and secret key' });
    }

    try {
        const admin = await Admin.findOne({ email: email });
        console.log(admin);
        if (!admin) {
            return res.status(404).json({ message: 'No Account found' });
        }

        const validatePassword = await bcrypt.compare(password, admin.password);

        if (!validatePassword) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        if (parseInt(secretkey) !== admin.employeeId) {
            return res.status(401).json({ message: 'Invalid Secret Key' });
        }

        req.session.email = admin.email;
        req.session.role = admin.role;
        req.session.employeeId = admin.employeeId;
        req.session.adminId = admin._id;

        next();
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

module.exports = { AdminsignupValidation, AdminloginValidation };
