const bcrypt = require('bcrypt')
const { User, Token } = require('../Model/UserData')
const { ObjectId } = require('mongoose').Types
const jwt = require("jsonwebtoken")
const Swal = require('sweetalert2')
require('dotenv').config()
const sendVarificationEmail = require('../utils/sendEmail')


const signupValidation = async (req, res, next) => {
    // console.log(req.body);
    // console.log(User);
    const { name, email, password } = req.body
    try {
        const existUser = await User.findOne({
            email: email
        });




        if (existUser) {
            return res.status(400).json({
                message: 'User already exists',
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(password, 10);
        console.log(salt);
        console.log(password);

        const userData = {
            name: name,
            email: email,
            password: hash_password,
            isVerified: false,
            access:true

        };

        const newUser = new User(userData);
        await newUser.save();

        const result = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isVerified: newUser.isVerified,
            access:newUser.access,
        };
        const token = await jwt.sign(result, process.env.JWT_SECRET, { expiresIn: 86400 })
        // return {user:payload,token:`Bearer ${token}`}

        sendVarificationEmail(newUser.email, newUser.name, token);
        next();
        return result;

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'Internal Server Error',
        });
    }
}


// const sendVarificationEmail=({_id,email},res)=>{}






const loginValidation = async (req, res, next) => {

    const { email,
        password
    } = req.body
    // console.log(req.body);
    if (!email || !password) {
        return res.json({success:false, message:'Please provide an email and a password'})
    }
    try {
        const user = await User.findOne({ email: email });
        // console.log(user);
        if (!user) {
            return res.json({success:false,message:"No user found",error: "UnAuthorised"});
        }

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {

            return res.json({ success: false, message: "Invalid Password" })
        }
        else {


            if (user.isVerified) {
                req.session.email = user.email
                req.session.role = user.role;
                req.session.userId = new ObjectId(user._id);
            } else {
                req.session.msg = 'Email not verified'

                return res.json({success:false,alert:false})
                // alert("Email is not Verified")/
            }

        }

        next()

        // const payload={
        //     userId : user._id ,
        //     name:user.name,
        //     email:user.email,
        //     isVerified:user.isVerified
        // }

        // const token=await jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:86400})
        // return {user:payload,token:`Bearer ${token}`}



    }
    catch (error) {
        console.error(error);
    }

}


const EmailVerification = async (token) => {
    try {
        const dToken = jwt.verify(token, process.env.JWT_SECRET);
        const updatedUser = await User.findOneAndUpdate({
            // isVarified:true,
            _id: dToken.id
        }, {
            $set: {
                isVerified: true
            }
        }, { new: true });

        if (!updatedUser) {
            throw new Error("User not found")
        }
        const payload = {
            userId: updatedUser[1][0]._id,
            name: updatedUser[1][0].name,
            email: updatedUser[1][0].email,
            isVerified: updatedUser[1][0].isVerified
        }
        const newToken = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 86400 })
        return { user: payload, token: `Bearer ${newToken}` }
    } catch (error) {
        throw new Error("Token verification ");
    }
}














module.exports = { signupValidation, loginValidation, EmailVerification }
