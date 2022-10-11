var router = require("express").Router();
var mongoose = require('mongoose');
const Product = require("../../models/product.model");
const Category = require("../../models/category.model");
var dummies = require('../../utils/dummies.json');
const { count } = require("../../models/product.model");

router.post("/", (req, res) => {
    try {
        Product.collection.drop();
        let product = [];
        dummies.map(dummy => {
            product.push(new Product({
                slug: dummy.slug || null,
                name: dummy.name || null,
                price: dummy.price || null,
                description: dummy.description || null,
                id_category: dummy.id_category || null,
                name_cat: dummy.name_cat || null,
                state: dummy.state || null,
                location: dummy.location || null,
                owner: dummy.owner || null,
                product_image: dummy.product_image || null
            }))
        })
        Product.insertMany(product);
    } catch (err) {
        res.send(err);
    }
})

module.exports = router;