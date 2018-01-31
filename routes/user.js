var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.post('/signup', function (req, res, next) {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    user.save(function(err, result) {
        if(err) {
            return res.status(500).json({
                title: 'Server Error!',
                error: err
            });
        }
        res.status(201).json({
            message: 'User Created Successfully!',
            result: result
        });
    });
});

router.post('/signin', function (req, res, next) {
    User.findOne({email: req.body.email}, function(err, user) {
        if(err) {
            return res.status(500).json({
                title: 'Server Error!',
                error: err
            });
        }
        if(!user) {
            return res.status(500).json({
                title: 'Invalid credentials!',
                err: {message: 'You have entered invalid email or password'}
            });
        }
        if(!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(500).json({
                title: 'Invalid credentials!',
                err: {message: 'You have entered invalid email or password'}
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 1800});
        res.status(200).json({
            message: 'Logged In successfully!',
            userId: user._id,
            token: token
        });

    });
});




module.exports = router;
