const { Admin } = require('../Model/AdminData');
const { Coupon } = require('../Model/CouponData');
const { Products, Category, Brand } = require('../Model/ProductDatas');
const { User, Profile } = require('../Model/UserData')









module.exports ={

    Product_listget: async (req, res) => {

        Items = await Products.find()
        Type = await Category.find();
        company = await Brand.find();
        res.render('products', { Items, Type, company })

        

    },
    Product_listpost: (req, res) => {

    },
    Add_Brandget: (req, res) => {



    },


    Add_Brandpost: async (req, res) => {

        const brandName = req.body;
        console.log(brandName);
        if (!brandName) {
            return res.status(400).json({ message: "please fill all fields" })

        } else {
            let newBrand = new Brand({
                brandName: brandName.brandName

            });
            await newBrand.save()
            console.log(newBrand)

            res.redirect('/addProduct');
        }

    },

    Add_Categoryget: (req, res) => {


    },
    Add_Categorypost: async (req, res) => {

        const categoryName = req.body;
        console.log(categoryName);
        if (!categoryName) {
            return res.status(400).json({ message: "please fill all fields" })

        } else {
            let newCategory = new Category({
                categoryName: categoryName.categoryName

            });
            await newCategory.save()
            console.log(newCategory)
        

            res.redirect('/addProduct');
        }

    },

    Add_Couponget: async (req, res) => {
        

        

    },
    Add_Couponpost: async (req, res) => {
        const {couponCode,discountPercentage,expireDate }= req.body;
        const  todayDate = new Date()
        let expire= new Date()
        expire.setDate(todayDate.getDate() + parseInt(expireDate))

        req.body.expireDate=expire;
        // console.log(expire);
        
        console.log(couponCode);
        if (!couponCode) {
            return res.status(400).json({ message: "please fill all fields" })

        } else {
           const newcoupon= await  Coupon.create(req.body)
           console.log(newcoupon);
        };
        

            res.redirect('/addProduct');
        


        
    },

    Add_Productget: (req, res) => {
        res.render('addProduct')

    },
    Add_Productpost: async (req, res) => {
        console.log(req.body);
        const { name, brand, category, discription, price } = req.body;
        if (!name || !price || !category || !discription || !brand) return res.send("Please fill out all fields")

        try {

            let foundCategory = await Category.findOne({ categoryName: category })
            let foundBrand = await Brand.findOne({ brandName: brand });

            console.log(foundCategory);
            console.log(foundBrand);


            const imageurl = req.file.filename
            const newProduct = new Products({
                imageurl:imageurl,
                name,
                brand: foundBrand,
                category: foundCategory.categoryName,
                discription,
                price
            })
            await newProduct.save()
            console.log(newProduct);
            res.redirect('/addProduct')

        } catch (e) {
            console.log(e)
        }
    },

    
    Show_Productget:async (req, res) => {
        if(req.session.email){

            try{
                const productId = req.params.productId 
                
                const product =await Products.findById(productId)

                if(product==null){
                   return res.json({success:false,msg:"No such product"})  
                }else{
                    res.json({success:true,data:product})
                }
            }catch(err){
                console.log(err);
            }



        }else{
            res.redirect('/admin_login')
        }

        



    },
    Update_Productpost: (req, res) => {

    },


}