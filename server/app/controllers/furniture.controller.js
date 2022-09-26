const Furniture = require("../models/furniture.model.js");

// Create and Save a new Furniture
exports.create_furniture = async (req, res) => {
  try {
    const furniture_data = {
        name: req.body.name || null,
        price: req.body.price || 0,
        description: req.body.description || null,
        owner: req.body.owner || null,
    };
    const furniture = new Furniture(furniture_data);
    const new_furniture = await furniture.save();
    res.json(new_furniture);
  } catch (error) {
    res.status(500).send({message: error.message || "Some error occurred while creating the Furniture."});
  }
};

// Retrieve all Furniture from the database.
exports.findAll_furniture = async (req, res) => {
  try {
    const furniture = await Furniture.find();
    res.json(furniture);
  } catch (error) {
    res.status(400).send({ message: "Some error occurred while retrieving furnitures." });
  }
}

exports.findOne_furniture = async (req, res) => {
  try {
      const id = req.params.id
      const furniture = await Furniture.findOne({ slug: id });
      if (!furniture) {
          res.status(404).json(FormatError("Furniture not found", res.statusCode));
      } else {
          res.json(furniture);
      };
  } catch (error) {
      if (error.kind === 'ObjectId') { res.status(404).json(FormatError("Furniture not found", res.statusCode)); }
      else { res.status(500).json(FormatError("An error has ocurred", res.statusCode)); }
  }
};

// // Update a Furniture by the id in the request
exports.update_furniture = async (req, res) => {
  try {
      const id = req.params.id
      const old_furniture = await Furniture.findOne({ slug: id });

      if (old_furniture.name !== req.body.name && req.body.name !== undefined) {
        old_furniture.slug = null;
        // console.log('error');
      }

      old_furniture.name = req.body.name || old_furniture.name;
      old_furniture.price = req.body.price || old_furniture.price;
      old_furniture.description = req.body.description || old_furniture.description;
      old_furniture.owner = req.body.owner || old_furniture.owner;
      const update = await old_furniture.save();

      if (!update) {res.status(404).send({message: `Cannot update Furniture with id=${id}. Maybe Furniture was not found!`}); }
      res.send({ message: "Furniture was updated successfully." });
  } catch (error) {
      if (error.kind === 'ObjectId') {res.status(404).send({message: `Furniture not found!`}); }
      else {res.status(500).send({message: "Error updating Furniture with id=" + id});}
  }
}

// // Delete a Furniture with the specified id in the request
exports.delete_furniture = async (req, res) => {
  try {
    const id = req.params.id
    const furniture = await Furniture.findOneAndDelete({ slug: id });
    if (!furniture) {res.status(404).send({ message: `Cannot delete Furniture with id=${id}. Maybe Furniture was not found!`}); }
    res.send({message: "Furniture was deleted successfully!"});
  } catch (error) {
    if (error.kind === 'ObjectId') {res.status(404).send({ message: `Furniture not found!`}); }
    else { res.status(500).send({ message: "Could not delete that furniture" }); }
  }
}

exports.deleteAll_furnitures = async (req, res) => {
  try {
    const deleteALL = await Furniture.deleteMany();
    res.send({message: `Furnitures were deleted successfully!`});
  } catch (error) {
    res.status(500).send({message: error.message || "Some error occurred while removing all furnitures."});
  }
}