const router = require('express').Router();

const carousel = require('../../controllers/carousel.controller.js');
  
//api/categories/carousel
router.get('/', carousel.get_carousel_category);

module.exports = router;