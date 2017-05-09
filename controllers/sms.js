var express = require('express');
var router = express.Router();
var db = require('../models');
var message = require('../utils/messages-sms');

router.get('/events', function(req,res){
   db.Events.findAll({})
    .then(function(data){
        res.json(data);
    });
});

router.get('/events/:id', function(req,res){
    db.Events.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(data){
        res.json(data);
    });
});

router.get('/events/:id/guests', function(req,res){
    db.UserEvents.findAll({
        where: {
            EventId: req.params.id,
            host: false
        },
        include: [{
            model: db.Users,
            attributes: ['phone']
        }]
    }).then(function(data){
        res.json(data);
        message.sendMessage(data);
    });
});

router.get('/events/:id/hosts', function(req,res){
    db.UserEvents.findAll({
        where: {
            EventId: req.params.id,
            host: true
        }
    }).then(function(data){
        res.json(data);
    });
});

router.get('/:id/events', function(req,res){
    db.UserEvents.findAll({
       where: {
           UserId: req.params.id
       } 
    }).then(function(data){
        res.json(data);
    });
});

router.post('/events/:id/sms', function(req,res){
    
    message.receiveMessage(req,res);
        
});

router.get('/test', function(req,res){
    db.UserEvents.find({
        where: {
            host: false
        },
        include: [{
            model: db.Users,
            attributes: ['phone'],
            where: {
                phone: '+18326431415'
            } 
        }]
    }).then(function(data){
        res.json(data);
    });
});

module.exports = router;

