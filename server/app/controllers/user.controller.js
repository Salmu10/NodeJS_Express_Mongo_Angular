var mongoose = require('mongoose')
var passport = require('passport');
// const User = require("../models/user.model.js");
var User = mongoose.model('User');

exports.create_user = async (req, res) => {
    try {
        if (!req.body.username) {
            return res.status(422).send({message: `Username can't be void!`});
        }

        if (!req.body.email) {
            return res.status(422).send({message: `Email can't be void!`});
        }
    
        if (!req.body.password) {
            return res.status(422).send({message: `Password can't be void!`});
        }

        const user_exist = await User.findOne({$or: [{ username: req.body.username }, { email: req.body.email }]});
        if (user_exist === null) {
            const user = new User();

            user.username = req.body.username;
            user.email = req.body.email;
            user.setPassword(req.body.password);

            const new_user = await user.save();
            res.json(new_user.toAuthJSON());

        } else {
            res.json({type: "Error"});
            // return res.status(200).json({type: "Error", msg: "An error has ocurred"});
        }
    } catch (error) {
        res.status(500).send({message: "An error has ocurred"});
    }
}

exports.login = async (req, res, next) => {
    if (!req.body.user.username) {
        return res.status(422).send({message: `Username can't be void!`});
    }

    if (!req.body.user.password) {
        return res.status(422).send({message: `Password can't be void!`});
    }

    passport.authenticate('local', { session: false }, function (err, user, info) {
        if (err) { return next(err); }
        if (user) {
            return res.json(user.toAuthJSON());
        } else {
            return res.status(422).json(info);
        }
    })(req, res, next);
}


exports.get_user = async (req, res) => {
    try {
        const id = req.auth.id;
        if (id) {
            const user = await User.findOne({ id: id });
            if (user) {
                res.json(user.toAuthJSON());
            }
        } else {
            res.status(404).send({message: `User not found!`});
        }
    } catch (error) {
        res.status(500).send({message: "An error has ocurred"});
    }
}
