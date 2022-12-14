const Product = require("../models/product.model.js");
const Category = require("../models/category.model.js");
const Comment = require("../models/comment.model.js");
const User = require("../models/user.model.js");

// Create and Save a new Product
exports.create_product = async (req, res) => {
  try {
    const product_data = {
        name: req.body.name || null,
        price: req.body.price || 0,
        description: req.body.description || null,
        id_category: req.body.id_category || null,
        name_cat: req.body.name_cat || null,
        state: req.body.state || null,
        location: req.body.location || null,
        product_images: req.body.product_images || null,
        author: req.body.author || null,
        comments: req.body.comments || null,
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

    let query = {};
    let transUndefined = (varQuery, otherResult) => {
      return varQuery != "undefined" && varQuery ? varQuery : otherResult;
    };

    let limit = transUndefined(req.query.limit, 3);
    let offset = transUndefined(req.query.offset, 0);
    let category = transUndefined(req.query.category, "");
    let name = transUndefined(req.query.name, "");
    let state = transUndefined(req.query.state, "");
    let price_min = transUndefined(req.query.price_min, 0);
    let price_max = transUndefined(req.query.price_max, Number.MAX_SAFE_INTEGER);
    let favorited = transUndefined(req.query.favorited, null);
    let author = transUndefined(req.query.author, null);
    let id_user = req.auth ? req.auth.id : null;
    let nameReg = new RegExp(name);

    query = {
      name: { $regex: nameReg },
      $and: [{ price: { $gte: price_min } }, { price: { $lte: price_max } }],
    };

    if (state != "") {
      query.state = state;
    }

    if (category != "") {
      query.id_category = category;
    }

    if (favorited) {
      const favoriter = await User.findOne({ username: favorited });
      query._id = { $in: favoriter.favorites };
    }

    if (author) {
      const author1 = await User.findOne({ username: author });
      query.author = { $in: author1._id };
    }

    const products = await Product.find(query).sort("name").limit(Number(limit)).skip(Number(offset)).populate("author");
    const product_count = await Product.find(query).countDocuments();

    const user = await User.findById(id_user);

    if (!products) {
      res.status(404).json({ msg: "No existe el product" });
    }

    return res.json({products: products.map(product => product.toJSONAuthorFor(user)), product_count: product_count});
  } catch (error) {
    res.status(400).send({ message: "Some error occurred while retrieving products." });
  }
}

// Retrieve all Category from the database.
exports.find_products_category = async (req, res) => {
  try {
    let id_user = req.auth ? req.auth.id : null;
    const id = req.params.id;
    const { offset, limit } = req.query;
    const products = await Product.find({ id_category: id }).sort("name").limit(Number(limit)).skip(Number(offset)).populate("author");
    const product_count = await Product.find({ id_category: id }).countDocuments();
    const user = await User.findById(id_user);
    if (!products) {
      res.status(404).json({ msg: "No existe el product" });
    }
    return res.json({products: products.map(product => product.toJSONAuthorFor(user)), product_count: product_count});
  } catch (error) {
    res.status(400).send({ message: "Some error occurred while retrieving categorys." });
  }
}

exports.find_product_name = async (req, res) => {
  try {
    let search = new RegExp(req.params.search);
    
    const product = await Product.find({ name: { $regex: search } }).limit(20);
    
    if (!product) {
      res.status(404).json({ msg: "No existe el product" });
    }

    res.json(product.map((product) => product.toNameJSONFor()));

  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en router.get /search/:search");
  }
};

exports.findOne_product = async (req, res) => {
  try {
    let id_user = req.auth ? req.auth.id : null;
    const id = req.params.id;
    const product = await Product.findOne({ slug: id }).populate("author");
    const user = await User.findById(id_user);
    if (!product) {
      res.status(404).send({message: `Product not found!`});
    } else {
      res.json(product.toJSONAuthorFor(user));
    };
  } catch (error) {
      if (error.kind === 'ObjectId') {res.status(404).send({message: `Product not found!`}); }
      else {res.status(500).send({message: "An error has ocurred"});}
  }
};

exports.find_products_user = async (req, res) => {
  try {
    const user = await User.findById(req.auth.id);
    if (user) {
      const products = await Product.find({ author: user._id }).sort("name").populate("author");
      if (!products) {
        res.status(404).send({message: `Product not found!`});
      } else {
        return res.json(products.map(product => product.toJSONAuthorFor(user)));
      };
    } else {
      res.status(404).send({message: `User not found!`});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({message: "An error has ocurred"});
  }
}

// Update a Product by the id in the request
exports.update_product = async (req, res) => {
  try {
      const id = req.params.id
      const old_product = await Product.findOne({ slug: id });

      if (old_product.name !== req.body.name && req.body.name !== undefined) {
        old_product.slug = null;
      }

      old_product.name = req.body.name || old_product.name;
      old_product.price = req.body.price || old_product.price;
      old_product.description = req.body.description || old_product.description;
      old_product.id_category = req.body.id_category || old_product.id_category;
      old_product.name_cat = req.body.name_cat || null,
      old_product.state = req.body.state || null,
      old_product.locatio = req.body.location || null,
      old_product.product_images = req.body.product_images || null,
      old_product.author = req.body.author || null,
      old_product.comments = req.body.comments || null;

      const update = await old_product.save();

      if (!update) {res.status(404).send({message: `Cannot update Product with id=${id}. Maybe Product was not found!`}); }
      res.send({ message: "Product was updated successfully." });
  } catch (error) {
      if (error.kind === 'ObjectId') {res.status(404).send({message: `Product not found!`}); }
      else {res.status(500).send({message: "Error updating the Product"});}
  }
}

// Delete a Product with the specified id in the request
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

// Favorite a product
exports.favorite = async (req, res) => {
  try {
    const product_slug = req.params.slug;
    const user = await User.findById(req.auth.id);
    const product = await Product.findOne({ slug: product_slug });
    if (user && product) {
      user.favorite(product);
      res.json('Favorite added correctly');
    } else {
      res.status(404).json({msg: "Product not found"});
    }
  } catch (error) {
    res.status(500).json({msg: "An error has ocurred"});
  }
};

// Unfavorite a product
exports.unfavorite = async (req, res) => {
  try {
    const product_slug = req.params.slug;
    const user = await User.findById(req.auth.id);
    const product = await Product.findOne({ slug: product_slug });
    if (user && product) {
      user.unfavorite(product);
      res.json('Unfavorite added correctly');
    } else {
      res.status(404).json({msg: "Product not found"});
    }
  } catch (error) {
    res.status(500).json({msg: "An error has ocurred"});
  }
};

exports.get_favorites = async (req, res) => {
  try {
    const user = await User.findById(req.auth.id);
    const products = await Product.find({_id: user.favorites}).sort("name").populate("author");
    if (products) {
      return res.json(products.map(product => product.toJSONAuthorFor(user)));
    } else {
      res.status(404).json({msg: "No products favorited"});
    }
  } catch (error) {
    res.status(500).json({msg: "An error has ocurred"});
  }
};