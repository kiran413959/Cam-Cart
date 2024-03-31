const { default: mongoose } = require("mongoose");
const { Admin } = require("../Model/AdminData");
const { Coupon } = require("../Model/CouponData");
const { Products, Category, Brand } = require("../Model/ProductDatas");
const { User, Profile } = require("../Model/UserData");
const {ObjectId}=require('mongodb')

module.exports = {
    Product_listget: async (req, res) => {
        if (req.session.email) {
            let adminId = req.session.adminId;

            const admin = await Admin.findById(adminId);
            const Items = await Products.find();
            const Type = await Category.find();
            const company = await Brand.find();
            res.render("products", { Items, Type, company, admin });
        } else {
            res.redirect("/admin_login");
        }
    },
    Product_listpost: (req, res) => { },
    Add_Brandget: (req, res) => { },

    Add_Brandpost: async (req, res) => {
        const brandName = req.body;
        console.log(brandName);
        if (!brandName) {
            return res.status(400).json({ message: "please fill all fields" });
        } else {
            let newBrand = new Brand({
                brandName: brandName.brandName,
            });
            await newBrand.save();
            console.log(newBrand);

            res.redirect("/addProduct");
        }
    },

    Add_Categoryget: (req, res) => { },
    Add_Categorypost: async (req, res) => {
        const categoryName = req.body;
        console.log(categoryName);
        if (!categoryName) {
            return res.status(400).json({ message: "please fill all fields" });
        } else {
            let newCategory = new Category({
                categoryName: categoryName.categoryName,
            });
            await newCategory.save();
            console.log(newCategory);

            res.redirect("/addProduct");
        }
    },

    Add_Couponget: async (req, res) => { },
    Add_Couponpost: async (req, res) => {
        const { couponCode, discountPercentage, expireDate } = req.body;
        const todayDate = new Date();
        let expire = new Date();
        expire.setDate(todayDate.getDate() + parseInt(expireDate));

        req.body.expireDate = expire;
        // console.log(expire);

        console.log(couponCode);
        if (!couponCode) {
            return res.status(400).json({ message: "please fill all fields" });
        } else {
            const newcoupon = await Coupon.create(req.body);
            console.log(newcoupon);
        }

        res.redirect("/addProduct");
    },

    Add_Productget: (req, res) => {
        res.render("addProduct");
    },
    Add_Productpost: async (req, res) => {
        console.log(req.body);
        const { name, brand, category, discription, price } = req.body;
        if (!name || !price || !category || !discription || !brand)
            return res.send("Please fill out all fields");

        try {
            let foundCategory = await Category.findOne({ categoryName: category });
            let foundBrand = await Brand.findOne({ brandName: brand });

            console.log(foundCategory);
            console.log(foundBrand);

            const imageurl = req.file.filename;
            const newProduct = new Products({
                imageurl: imageurl,
                name,
                brand: foundBrand.brandName,
                category: foundCategory.categoryName,
                discription,
                price,
            });
            await newProduct.save();
            console.log(newProduct);
            res.redirect("/addProduct");
        } catch (e) {
            console.log(e);
        }
    },

    Show_Productget: async (req, res) => {
        if (req.session.email) {
            try {
                const productId = req.params.productId;

                const product = await Products.findById(productId);

                if (product == null) {
                    return res.json({ success: false, msg: "No such product" });
                } else {
                    res.json({ success: true, data: product });
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            res.redirect("/admin_login");
        }
    },
    Update_Productpost: async (req, res) => {
        if (req.session.email) {
            try {
                const productId = req.params.productId;

                const { name, price, category } = req.body;

                console.log(productId);
                console.log(req.body);

                await Products.updateOne(
                    { _id: productId },
                    { $set: { name, price, category } }
                );

                res.redirect("/products");
            } catch (err) {
                console.log(err);
            }
        } else {
            res.redirect("/admin_login");
        }
    },

    Delete_Productpost: async (req, res) => {
        console.log("hiiii");
        if (req.session.email) {
            try {
                const productId = req.params.productId;
                console.log(productId);

                let deletedProduct = await Products.deleteOne({ _id: productId });
                console.log("deleted", deletedProduct);
                res
                    .status(200)
                    .json({ success: true, message: "Deleted Successfully" });
                if (!deletedProduct) {
                    return res
                        .status(500)
                        .json({ success: false, message: "no product found" });
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            res.redirect("/admin_login");
        }
    },

    Delete_Categorypost: async (req, res) => {
        if (req.session.email) {
            try {
                // const catID = req.params.categoryId;
                // const catId= catID.trim()
                const categoryId = req.params.categoryId.trim();

                // const categoryId= ObjectId(catId)

                console.log(categoryId);
                const category= await Category.findById(categoryId)
                console.log(category);
                console.log(category.categoryName);


                //find all products with this category and delete them first
                let products = await Products.find({ category:category.categoryName });
                console.log(products);

                for (let i = 0; i < products.length; i++) {
                    await Products.deleteOne({ _id: products[i]._id })
                }

                let deletedCategory = await Category.deleteOne({ _id: categoryId });

                res.status(200).json({success:true , message:"Category deleted successfully"})

                if (!deletedCategory) {
                    return res.status(500).json({ success: false, message: "No Category Found" })
                }
            }catch (err) {
                    console.log(err);
                }

        } else {
            res.redirect("/admin_login");
        }
    },

    Delete_Brandpost: async (req, res) => {
        if (req.session.email) {
            try {
            
                const barndId = req.params.brandId.trim();


                console.log(barndId);
                const brand= await Brand.findById(barndId)
                console.log(brand);
                // console.log(category.categoryName);


                //find all products with this Brand and delete them first
                let products = await Products.find({ brand:brand.brandName });
                console.log(products);

                for (let i = 0; i < products.length; i++) {
                    await Products.deleteOne({ _id: products[i]._id })
                }

                let deletedBrand = await Brand.deleteOne({ _id: barndId });

                res.status(200).json({success:true , message:"Brand deleted successfully"})

                if (!deletedBrand) {
                    return res.status(500).json({ success: false, message: "No Brand Found" })
                }
            }catch (err) {
                    console.log(err);
                }

        } else {
            res.redirect("/admin_login");
        }

    }
};
