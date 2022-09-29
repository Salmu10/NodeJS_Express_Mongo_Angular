const Product = require("../models/product.model.js");
const Category = require("../models/category.model.js");

// Create and Save a new Product
exports.create_product = async (req, res) => {
  try {
    const product_data = {
        name: req.body.name || null,
        price: req.body.price || 0,
        description: req.body.description || null,
        id_category: req.body.id_category || null,
        owner: req.body.owner || null,
    };
    const product = new Product(product_data);
    const category = await Category.updateOne({slug: product.id_category}, {$push: {products: product._id}})
    const new_product = await product.save();
    res.json(new_product.toJSONFor());
  } catch (error) {
    res.status(500).send({message: error.message || "Some error occurred while creating the Product."});
  }
};

// Retrieve all Product from the database.
exports.findAll_product = async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (error) {
    res.status(400).send({ message: "Some error occurred while retrieving products." });
  }
}

exports.findOne_product = async (req, res) => {
  try {
      const id = req.params.id
      const product = await Product.findOne({ slug: id });
      if (!product) {
        res.status(404).send({message: `Product not found!`});
      } else {
        res.json(product);
      };
  } catch (error) {
      if (error.kind === 'ObjectId') {res.status(404).send({message: `Product not found!`}); }
      else {res.status(500).send({message: "An error has ocurred"});}
  }
};

// // Update a Product by the id in the request
exports.update_product = async (req, res) => {
  try {
      const id = req.params.id
      const old_product = await Product.findOne({ slug: id });

      if (old_product.name !== req.body.name && req.body.name !== undefined) {
        old_product.slug = null;
        // console.log('error');
      }

      old_product.name = req.body.name || old_product.name;
      old_product.price = req.body.price || old_product.price;
      old_product.description = req.body.description || old_product.description;
      old_product.id_category = req.body.owner || old_product.id_category;
      old_product.owner = req.body.owner || old_product.owner;
      const update = await old_product.save();

      if (!update) {res.status(404).send({message: `Cannot update Product with id=${id}. Maybe Product was not found!`}); }
      res.send({ message: "Product was updated successfully." });
  } catch (error) {
      if (error.kind === 'ObjectId') {res.status(404).send({message: `Product not found!`}); }
      else {res.status(500).send({message: "Error updating the Product"});}
  }
}

// // Delete a Product with the specified id in the request
exports.delete_product = async (req, res) => {
  try {
    const id = req.params.id
    const product = await Product.findOneAndDelete({ slug: id });
    if (!product) {res.status(404).send({ message: `Cannot delete Product with id=${id}. Maybe Product was not found!`}); }
    res.send({message: "Product was deleted successfully!"});
  } catch (error) {
    if (error.kind === 'ObjectId') {res.status(404).send({ message: `Product not found!`}); }
    else { res.status(500).send({ message: "Could not delete that Product" }); }
  }
}

exports.deleteAll_products = async (req, res) => {
  try {
    const deleteALL = await Product.deleteMany();
    res.send({message: `Products were deleted successfully!`});
  } catch (error) {
    res.status(500).send({message: error.message || "Some error occurred while removing all products."});
  }
}