var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var Message = require('../models/Message');
var User = require('../models/User');

router.get('/', function(req, res, next) {
    console.log('in message get routes');
    Message.find()
    .populate('user', 'firstName')
    .exec(function(err, result) {
        console.log('find callback !');
        if(err) {
            console.log('In Error!');
            return res.status(500).json({
                title: 'Server side error!',
                err: err
            });
        }
        res.status(200).json({
            message: 'You got following messages!',
            list: result
        });
    });
});

router.use('/', function(req, res, next) {
    jwt.verify(req.query.token, 'secret', function(err, decoded) {
        if(err) {
            return res.status(401).json({
                title: 'Not Authorized!',
                err: err
            });
        }
        next();
    });
    
});

router.post('/', function(req, res, next) {
    console.log('in message post routes');

    var decoded = jwt.decode(req.query.token);

    User.findById(decoded.user._id, function(err, user) {
        if(err) {
            return res.status(401).json({
                title: 'Not Authorized!',
                err: err
            });
        }
        var message = new Message({
            content: req.body.content,
            user: user._id
        });
    
        message.save(function(err, result) {
            if(err) {
                return res.status(500).json({
                    title: 'Server side error!',
                    err: err
                });
            }
            user.messages.push(result._id);
            user.save();
            Message.findById(result._id)
            .populate('user', 'firstName')
            .exec( function(err, result) {
                res.status(201).json({
                    message: 'Message Created Successfully!',
                    obj: result
                });
            });
            
        });
    });
    
});

router.put('/:messageId', function(req, res, next) {
    console.log('in message post routes' + req.params.messageId);

    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.messageId, function(err, message) {
        if(err) {
            return res.status(500).json({
                title: 'Server side error!',
                err: err
            });
        }
        if(!message) {
            return res.status(404).json({
                title: 'Message not found!'
            });
        }
        if(decoded.user._id != message.user) {
            return res.status(401).json({
                title: 'User does not match!'
            });
        }
        message.content = req.body.content;
        message.save(function(err, result) {
            if(err) {
                return res.status(500).json({
                    title: 'Server side error!',
                    err: err
                });
            }

            res.status(200).json({
                message: 'Message Updated!',
                obj: result
            });
        });
    });
});

router.delete('/:messageId', function(req, res, next) {
    console.log('Going to delete msg with id: ' + req.params.messageId);
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.messageId, function(err, message) {
        if(err) {
            return res.status(500).json({
                title: 'Server side error!',
                err: err
            });
        }
        if(!message) {
            return res.status(404).json({
                title: 'Message not found!'
            });
        }
        if(decoded.user._id != message.user) {
            return res.status(401).json({
                title: 'User does not match!'
            });
        }
        message.remove(function(err, result) {
            if(err) {
                return res.status(500).json({
                    title: 'Server side error!',
                    err: err
                });
            }

          
            res.status(200).json({
                message: 'Message deleted!'
            });
        });
    });
});

module.exports = router;

