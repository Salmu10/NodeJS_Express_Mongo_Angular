const router = require('express').Router();

const products = require('../../controllers/product.controller.js');

//api/products
router.post('/', products.create_product);
router.get('/', products.findAll_product);
router.get('/category/:id', products.find_products_category);
router.get('/list-search/:search', products.find_product_name);
router.get('/:id', products.findOne_product);
router.put('/:id', products.update_product);
router.delete('/:id', products.delete_product);
router.delete('/', products.deleteAll_products);

module.exports = router;
