const mongoose = require("mongoose");
const crypto = require("crypto");
const uniqueValidator = require("mongoose-unique-validator");
const jwt = require("jsonwebtoken");
const secret = require("../config").secret;

const user_schema = mongoose.Schema (
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
    },
    image: String,
    bio: String,
    hash: String,
    salt: String,
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  }, { timestamps: true }
);

user_schema.plugin(uniqueValidator, { message: "is already taken" });

user_schema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};
  
user_schema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

user_schema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
  
    return jwt.sign({
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

user_schema.methods.favorite = function (id) {
  if (this.favorites.indexOf(id) === -1) {
    this.favorites.push(id);
  }
  return this.save();
};

user_schema.methods.unfavorite = function (id) {
  this.favorites.remove(id);
  return this.save();
};

user_schema.methods.follow = function (id) {
  if (this.following.indexOf(id) === -1) {
    this.following.push(id);
  }
  return this.save();
};

user_schema.methods.unfollow = function (id) {
  this.following.remove(id);
  return this.save();
};

user_schema.methods.isFollowing = function (id) {
  return this.following.some(function (followId) {
      return followId.toString() === id.toString();
  });
};
  
user_schema.methods.toAuthJSON = function(){
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    image: this.image || 'https://avatars.dicebear.com/api/personas/' + this.username + '.svg',
    bio: this.bio,
  };
};

user_schema.methods.toProfileJSONFor = function (user) {
  return {
    username: this.username,
    bio: this.bio,
    image: this.image || 'https://avatars.dicebear.com/api/personas/' + this.username + '.svg',
    favorites: this.favorites,
    followers: this.followers,
    following: user ? user.isFollowing(this._id) : false
  };
};

user_schema.methods.toProfileCommentJSON = function () {
  return {
    username: this.username,
    image: this.image || 'https://avatars.dicebear.com/api/personas/' + this.username + '.svg',
  };
}

module.exports = mongoose.model('User', user_schema);
