const mongoose = require('mongoose');
const slug = require('slug');
const uniqueValidator = require('mongoose-unique-validator');

const category_schema = mongoose.Schema({
    slug: { 
        type: String, 
        lowercase: true, 
        unique: true 
    },
    id_cat: {
        type: String,
        required: true
    },
    category_name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

category_schema.plugin(uniqueValidator, { msg: "already taken" });

category_schema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    next();
});

category_schema.methods.slugify = function () {
    this.slug = slug(this.category_name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

module.exports = mongoose.model('Category', category_schema);