const router = require('express').Router();
const auth = require('../auth.js');

const products = require('../../controllers/product.controller.js');

//api/products
// router.param('/', products.preload_product);
router.post('/', products.create_product);
router.get('/', auth.optional, products.findAll_product);
router.get('/category/:id', auth.optional, products.find_products_category);
router.get('/list-search/:search', products.find_product_name);
router.get('/:id', auth.optional, products.findOne_product);
router.get('/user/products', auth.required, products.find_products_user);
router.put('/:id', products.update_product);
router.delete('/:id', products.delete_product);
router.delete('/', products.deleteAll_products);
router.post('/:slug/favorite', auth.required, products.favorite);
router.delete('/:slug/favorite', auth.required, products.unfavorite);
router.get('/user/favorites', auth.required, products.get_favorites);

module.exports = router;
