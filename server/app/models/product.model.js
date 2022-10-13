const mongoose = require('mongoose');
const slug = require('slug');
const uniqueValidator = require('mongoose-unique-validator');

const product_schema = mongoose.Schema({
    slug: { 
        type: String, 
        lowercase: true, 
        unique: true 
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    id_category: {
        type: String,
        required: true
    },
    name_cat: {
        type: String,
        requiered: true
    },
    state: {
        type: String,
        requiered: true
    },
    location: {
        type: String,
        requiered: true
    },
    owner: {
        type: String,
        required: true
    },
    product_image: {
        type: [String],
        required: true
    }
});

product_schema.plugin(uniqueValidator, { msg: "already taken" });

product_schema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    next();
});

product_schema.methods.slugify = function () {
    this.slug = slug(this.name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

product_schema.methods.toJSONFor = function(){
    return {
      slug: this.slug,
      name: this.name,
      price: this.price,
      description: this.description,
      id_category: this.id_category,
      name_cat: this.name_cat,
      state: this.state,
      location: this.location,
      owner: this.owner,
    };
};

product_schema.methods.toNameJSONFor = function () {
    return {
      name: this.name,
    };
  };

module.exports = mongoose.model('Product', product_schema);