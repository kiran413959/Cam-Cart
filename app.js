const express = require('express')
const port = process.env.port || 2003

const path = require('path')
const app = express()
const env = require('dotenv')
const cache = require('nocache')
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser=require("body-parser")



const userRouters = require('./Routes/UserRoute')
const productRouters=require('./Routes/ProductsRoute')
const adminRouters=require('./Routes/AdminRoute')



mongoose.connect('mongodb://localhost/CamCart',).then(()=>{
    console.log('DB is running');
})
.catch((err)=>{
    console.log(err);
})

//enviornment variable
env.config();


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
// app.use(express.json())

app.use(bodyParser.json());

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "view"))




// session configuration

app.use(session({
    secret: 'secret',
    saveUninitialized: false,
    resave: true
}))



// app.get("/", (req,res)=>{
//     res.render("userHome")
// })
app.use('/',userRouters)
app.use('/',productRouters)
app.use('/',adminRouters)


//catching middelware
app.use(cache())






app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})