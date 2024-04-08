const { User, Profile, Whishlist } = require('../Model/UserData')
const jwt = require("jsonwebtoken")
const sendVarificationEmail= require('../utils/sendEmail')





module.exports = {


    /////*****************  USER  *******************/////



    signupget: (req, res) => {
        if (req.session.email) {
            res.redirect('/Home')
        } else {

            res.render('signup')
        }
        // res.render('signup')

    },
    signuppost: (req, res) => {
        const defaultRole = 'user';
        req.session.role = defaultRole;
        res.redirect('/login')

    },
    EmailVerificationget: async (req, res) => {

        const token = req.params.token;
        try {
            const dToken = jwt.verify(token, process.env.JWT_SECRET);
            console.log("token", dToken)
            const updatedUser = await User.findOneAndUpdate({
                // isVerified:true,
                email: dToken.email
            }, {
                $set: {
                    isVerified: true
                }
            }, { new: true });

            console.log(updatedUser);
            if (!updatedUser) {
                throw Error("User not found")
            }

            return res.render('emailVerification')


        } catch (error) {
            console.error("Token verification failed:", error);
            return res.status(400).json({ error: "Token verification failed" });
        }
    },
    EmailVerificationpost: async (req, res) => {
        try {
            const userId = req.params.id;

            // Fetch the user from the database by ID
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).send({ status: 'fail', message: 'User not found' });
            }

            // Mark the user's email as verified
            user.isVerified = true;
            await user.save();
            console.log(user);

            console.log("Email verified successfully");
            if (user.isVerified === true) {
                res.redirect('/login')
            }
            // Send a success response
            return res.status(200).send({ status: 'success', message: 'Email Verified', user });

        } catch (error) {
            console.error("Error verifying email:", error);
            // Send a failure response
            return res.status(500).send({ status: 'fail', message: 'Something went wrong!' });
        }
    },
    resendEmailget: async (req, res) => {

    },
    resendEmailpost: async (req, res) => {
        const email = req.body.email;

        try {
            // Generate a new JWT token for email verification
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Find the user by email
            const user = await User.findOne({ email });

            if (!user) {
                // If user not found, return an error response
                return res.status(404).json({ resend: false, error: 'User not found' });
            }


            const name = user.name;

            // Send verification email
            await sendVarificationEmail(email, name, token);

            // Send success response
            return res.status(200).json({ resend: true, msg: 'Verification Email has been Sent!' });
        } catch (error) {
            console.error("Error sending verification email:", error);
            // Send error response
            return res.status(500).json({ resend: false, error: "Failed to send verification email" });
        }
    },


    loginget: (req, res) => {
        if (req.session.email) {
            console.log('email found')
            res.redirect('/Home')
        } else {
            const isVerified = {
                isVerified: false
            }
            const errorMessage = req.query.error
            res.render('login', { isVerified: isVerified, errorMessage });

        }
        // res.render('login');

    },
    loginpost: async (req, res) => {
        const email = req.body.email

        const user = await User.findOne({ email: email })
        console.log(user);
        if (user.isVerified === true && user.access=== true) {

            // console.log("redirecting to home")
            return res.json({ success: true, alert: true })
        } else {
            req.msg = 'user not verified';
            return res.json({ success: false });
        }
    },
    fotgetPasswordget: (req, res) => {

    },
    fotgetPasswordpost: (req, res) => {

    },
    OtpValidationget: (req, res) => {

    },
    OtpValidationpost: (req, res) => {

    },




}


