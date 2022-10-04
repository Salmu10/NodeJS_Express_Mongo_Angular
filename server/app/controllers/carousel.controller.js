const Category = require("../models/category.model.js");

exports.get_carousel_category = async (req, res) => {
    try {
        const category = await Category.find();
        res.json(category.map(c => c.toJSONCarousel()));
    } catch (error) {
        res.status(500).send({message: "An error has ocurred"});
    }
}
