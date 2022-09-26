const mongoose = require('mongoose');
const slug = require('slug');
const uniqueValidator = require('mongoose-unique-validator');

const furniture_schema = mongoose.Schema({
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
    owner: {
        type: String,
        required: true
    }
});

furniture_schema.plugin(uniqueValidator, { msg: "already taken" });

furniture_schema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    next();
});

furniture_schema.methods.slugify = function () {
    this.slug = slug(this.name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

module.exports = mongoose.model('Furniture', furniture_schema);