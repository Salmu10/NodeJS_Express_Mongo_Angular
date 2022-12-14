const Category = require("../models/category.model.js");

// Create and Save a new Category
exports.create_category = async (req, res) => {
  try {
    const category_data = {
      id_cat: req.body.id_cat || null,
      category_name: req.body.category_name || null,
      image: req.body.image || null,
      products: []
    };
    const category = new Category(category_data);
    const new_category = await category.save();
    res.json(new_category);
  } catch (error) {
    res.status(500).send({message: error.message || "Some error occurred while creating the Category."});
  }
};

// Retrieve all Category from the database.
exports.findAll_category = async (req, res) => {
  try {
    const { offset, limit } = req.query;
    const categories = await Category.find({}, {}, { skip: Number(offset), limit: Number(limit) }).populate('products');
    res.json(categories.map(category => category.toJSONFor()));
    // res.json(categories);
  } catch (error) {
    res.status(400).send({ message: "Some error occurred while retrieving categorys." });
  }
}

exports.findOne_category = async (req, res) => {
  try {
      const id = req.params.id
      const category = await Category.findOne({ slug: id }).populate('products');
      if (!category) {
          res.status(404).send({message: `Category not found!`});
      } else {
          res.json(category);
      };
  } catch (error) {
    console.log(error);
      if (error.kind === 'ObjectId') {res.status(404).send({message: `Category not found!`}); }
      else {res.status(500).send({message: "An error has ocurred"});}
  }
};

// // Update a Category by the id in the request
exports.update_category = async (req, res) => {
  try {
      const id = req.params.id
      const old_category = await Category.findOne({ slug: id });

      if (old_category.name !== req.body.name && req.body.name !== undefined) {
        old_category.slug = null;
        // console.log('error');
      }

      old_category.id_cat = req.body.id_cat || old_category.id_cat;
      old_category.category_name = req.body.category_name || old_category.category_name;
      old_category.image = req.body.image || old_category.image;
      old_category.products = req.body.products || old_category.products;
      const category = await old_category.save();

      if (!category) {res.status(404).send({message: `Cannot update Category with id=${id}. Maybe Category was not found!`}); }
      res.send({ message: "Category was updated successfully." });
  } catch (error) {
      if (error.kind === 'ObjectId') {res.status(404).send({message: `Category not found!`}); }
      else {res.status(500).send({message: "Error updating the Category"});}
  }
}

// // Delete a Category with the specified id in the request
exports.delete_category = async (req, res) => {
  try {
    const id = req.params.id
    const categorie = await Category.findOneAndDelete({ id });
    if (!categorie) {res.status(404).send({ message: `Cannot delete Category with id=${id}. Maybe Category was not found!`}); }
    res.send({message: "Category was deleted successfully!"});
  } catch (error) {
    if (error.kind === 'ObjectId') {res.status(404).send({ message: `Category not found!`}); }
    else { res.status(500).send({ message: "Could not delete that category" }); }
  }
}

exports.deleteAll_categories = async (req, res) => {
  try {
    const deleteALL = await Category.deleteMany();
    res.send({message: `Categories were deleted successfully!`});
  } catch (error) {
    res.status(500).send({message: err.message || "Some error occurred while removing all category."});
  }
}