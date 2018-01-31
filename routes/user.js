var bcrypt = require('bcrypt');
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


module.exports = router;
