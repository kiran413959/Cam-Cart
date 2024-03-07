const { Admin } = require('../Model/AdminData');
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

    Add_Couponget: (req, res) => {


    },
    Add_Couponpost: async (req, res) => {



        
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
}