const path = require("path")

const fs = require("fs")

const brand = require("../models/brand");

const product = require("../models/product");

module.exports = {

    index: (req,res) => {
        res.send(brand.all())
        if(req.query.valid){
            console.log("Se agrego exitosamente")
        }
    },

    show: (req,res) => {
        return res.send(brand.one(req.params.id))
    },

    create: (req,res) => {
        return res.render(path.resolve(__dirname,"..","views","brands","create"))
    },

    edit: (req,res) => {
        let brand = brand.one(req.params.id)
        return res.send(path.resolve(__dirname,"..","views","brands","edit"),{brand})
    },

    save: (req,res) => {
        let brands = brand.all();
        
        let isValid = brands.find(b => b.name == req.body.name) != null ? false : true;

        if(isValid){

            let newBrand = {};

            newBrand.name = req.body.name;

            newBrand.image = req.file.filename;

            brands.push(newBrand);

            fs.writeFileSync(path.resolve(__dirname,"..","data","brands.json"),JSON.stringify(brands,null,2))
            
            return res.redirect("/brand/?valid=true")
        }

        let errors = {};

        errors.name = "La Marca ya esta registrada";

        errors.file = "La imagen no se pudo subir";

        let old = {}

        old.name = req.body.name

        fs.unlinkSync(path.resolve(__dirname,"..","..","public","upload","brand",req.file.filename));

        return res.render(path.resolve(__dirname,"..","views","brands","create"),{errors,old})

    },

    upload: (req,res) => {
        let brands = brand.all();
        req.body.id = req.params.id;
        let upload = brands.map(b => {
            if(b.id == req.body.id){
                return b = req.body;
            }
            return b;
        })
        fs.writeFileSync(path.resolve(__dirname,"..","data","brands.json"),JSON.stringify(upload,null,2))
        res.redirect('/brand');
    },

    destroy: (req,res) => {
        let brands = brand.all().filter(b => b.id != req.params.id);
        fs.writeFileSync(path.resolve(__dirname,"..","data","brands.json"),JSON.stringify(brands,null,2));
        let products = product.all().filter(p => p.brandId != req.params.id)
        fs.writeFileSync(path.resolve(__dirname,"..","data","products.json"),JSON.stringify(products,null,2));
        res.redirect('/brand');
    },



}