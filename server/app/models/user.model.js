const mongoose = require("mongoose");
const crypto = require("crypto");
const uniqueValidator = require("mongoose-unique-validator");
const jwt = require("jsonwebtoken");
const secret = require("../config").secret;

const user_schema = mongoose.Schema(
  {
    username: String,
    email: String,
    image: String,
    bio: String,
    hash: String,
    salt: String,
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
  
user_schema.methods.toAuthJSON = function(){
    return {
      username: this.username,
      email: this.email,
      token: this.generateJWT(),
      image: this.image,
      bio: this.bio,
    };
};

user_schema.methods.toProfileJSONFor = function(){
    return {
      username: this.username,
      bio: this.bio,
      image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
    //   following: user ? user.isFollowing(this._id) : false
    };
};

module.exports = mongoose.model('User', user_schema);
