const mongoose = require('mongoose');
const slug = require('slug');
const uniqueValidator = require('mongoose-unique-validator');
const User = require('./user.model')

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
    location: String,
    owner: String,
    product_image: [String],
    favorites: Number,
    favorited: {
        type: Boolean,
        default: false,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
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

product_schema.methods.favoriteCount = function () {
    var product = this;
  
    return User.countDocuments({ favorites: { $in: [product._id] } }).then(function (count) {
        product.favorites = count;
        return product.save();
      }
    );
};

product_schema.methods.addFavorite = function () {
    this.favorites = this.favorites + 1;
    this.save();
}

product_schema.methods.removeFavorite = function () {
    if (this.favorites > 0) { this.favorites = this.favorites - 1; }
    this.save();
}

product_schema.methods.toFavoriteJSON = function (user) {
    if (user.favorites.indexOf(this._id) !== -1) { this.favorited = true; }
    return this;
}

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
        favorites: this.favorites || 0,
    };
};

product_schema.methods.toNameJSONFor = function () {
    return {
      name: this.name,
    };
};

module.exports = mongoose.model('Product', product_schema);