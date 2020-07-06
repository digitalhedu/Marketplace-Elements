const path = require("path")

const fs = require("fs")

const category = require("../models/category");

const product = require("../models/product");

module.exports = {

    index: (req,res) => {
        res.send(category.all())
        if(req.query.valid){
            console.log("Se agrego exitosamente")
        }
    },

    show: (req,res) => {
        return res.send(brand.one(req.params.id))
    },

    create: (req,res) => {
        return res.render(path.resolve(__dirname,"..","views","categories","create"))
    },

    edit: (req,res) => {
        let brand = brand.one(req.params.id)
        return res.send(path.resolve(__dirname,"..","views","categories","edit"),{brand})
    },

    save: (req,res) => {
        let categories = category.all();
        
        let isValid = categories.find(cat => cat.name == req.body.name) != null ? false : true;

        if(isValid){

            let newCategory = {};

            newCategory.name = req.body.name;

            newCategory.image = req.file.filename;

            categories.push(newCategory);

            fs.writeFileSync(path.resolve(__dirname,"..","data","categories.json"),JSON.stringify(categories,null,2))
            
            return res.redirect("/category/?valid=true")
        }

        let errors = {};

        errors.name = "Esta categoria ya esta registrada";

        errors.file = "La imagen no se pudo subir";

        let old = {}

        old.name = req.body.name

        fs.unlinkSync(path.resolve(__dirname,"..","..","public","upload","category",req.file.filename));

        return res.render(path.resolve(__dirname,"..","views","categories","create"),{errors,old})

    },

    upload: (req,res) => {
        let categories = category.all();
        req.body.id = req.params.id;
        let upload = categories.map(cat => {
            if(cat.id == req.body.id){
                return cat = req.body;
            }
            return cat;
        })
        fs.writeFileSync(path.resolve(__dirname,"..","data","categories.json"),JSON.stringify(upload,null,2));
        return res.redirect("/category/?valid=true")
    },

    destroy: (req,res) => {
        let categories = category.all().filter(cat => cat.id != req.params.id);
        fs.writeFileSync(path.resolve(__dirname,"..","data","categories.json"),JSON.stringify(categories,null,2));
        let products = product.all().filter(p => p.brandId != req.params.id)
        fs.writeFileSync(path.resolve(__dirname,"..","data","products.json"),JSON.stringify(products,null,2));
        return res.redirect("/category/?valid=true")
    },



}