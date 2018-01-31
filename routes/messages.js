var express = require('express');
var router = express.Router();
var Message = require('../models/Message');

router.get('/', function(req, res, next) {
    console.log('in message get routes');
    Message.find(function(err, result) {
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

router.post('/', function(req, res, next) {
    console.log('in message post routes');
    var message = new Message({
        content: req.body.content
    });

    message.save(function(err, result) {
        console.log('Save callback '+ err);
        if(err) {
            return res.status(500).json({
                title: 'Server side error!',
                err: err
            });
        }
        res.status(201).json({
            message: 'Message Created Successfully!',
            obj: result
        });
    });
});

router.put('/:messageId', function(req, res, next) {
    console.log('in message post routes' + req.params.messageId);

    Message.findByIdAndUpdate(req.params.messageId, {content: req.body.content }, {new:true}, function(err, result) {
        if(err) {
            return res.status(500).json({
                title: 'Server side error!',
                err: err
            });
        }
        res.status(200).json({
            message: 'Message Modified Successfully!',
            obj: result
        });
    });
});

router.delete('/:messageId', function(req, res, next) {
    console.log('Going to delete msg with id: ' + req.params.messageId);

    Message.findByIdAndRemove(req.params.messageId, function(err, result) {
        if(err) {
            return res.status(500).json({
                title: 'Server side error!',
                err: err
            });
        }
        res.status(200).json({
            message: 'Message Deleted Successfully!',
            result: result
        });
    });
});

module.exports = router;

