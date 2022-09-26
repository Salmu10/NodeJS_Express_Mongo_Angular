const router = require('express').Router();
// const router = express.Router();

const furnitures = require('../../controllers/furniture.controller.js');

//api/furnitures
router.post('/', furnitures.create_furniture);
router.get('/', furnitures.findAll_furniture);
router.get('/:id', furnitures.findOne_furniture);
router.put('/:id', furnitures.update_furniture);
router.delete('/:id', furnitures.delete_furniture);
router.delete('/', furnitures.deleteAll_furnitures);

module.exports = router;
