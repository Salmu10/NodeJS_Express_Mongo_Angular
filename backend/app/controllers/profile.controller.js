var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
// var auth = require('../auth');

exports.param_username = async (req, res, next, username) => {
    try {
        const user = await User.findOne({ username: username });
        if (!user) { return res.status(404).send({message: "Profile not found"}); }
        req.profile = user;
        return next();
    } catch (error) {
        res.status(500).send({message: "An error has ocurred"});
    }
}

exports.find_profile = async (req, res) => {
    if (req.auth) {
        const user_auth = await User.findById(req.auth.id);
        // console.log(user_auth);
        res.json(req.profile.toProfileJSONFor(user_auth));
    } else {
        res.json(req.profile.toProfileJSONFor());
    }
}

exports.follow = async (req, res) => {
    try {
        const user = await User.findById(req.auth.id);
        if (!user) {
            return res.status(404).send({message: "Profile not found"});
        }
        const follow_user = await User.findOne({ username: req.profile.username });
        user.follow(follow_user._id);
        res.json("User followed");
    } catch (error) {
        res.status(500).send({message: "An error has ocurred"});
    }
}

exports.unfollow = async (req, res) => {
    try {
        const user = await User.findById(req.auth.id);
        if (!user) {
            return res.status(404).send({message: "Profile not found"});
        }
        const follow_user = await User.findOne({ username: req.profile.username });
        user.unfollow(follow_user._id);
        res.json("User unfollowed");
    } catch (error) {
        res.status(500).send({message: "An error has ocurred"});
    }
}