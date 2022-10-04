const router = require('express').Router();

const carousel = require('../../controllers/carousel.controller.js');
  
//api/categories/carousel
// router.post('/', carousel.create_carousel);
router.get('/', carousel.get_carousel_category);
// router.delete('/:id', carousel.delete_carousel);

module.exports = router;