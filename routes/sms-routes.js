var db = require('../models');
var message = require('../utils/messages-sms');

module.exports = function(app) {
    app.get('/event', function(req,res){
    db.events.findAll({})
        .then(function(data){
            res.json(data);
        });
    });

    app.get('/event/:id', function(req,res){
        db.events.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(data){
            res.json(data);
        });
    });

    app.get('/event/:id/guests', function(req,res){
        db.user_event.findAll({
            where: {
                eventId: req.params.id,
                host: false
            },
            include: [{
                model: db.user,
                attributes: ['phone']
            }]
        }).then(function(data){
            res.json(data);
            message.sendMessage(data);
        });
    });

    app.get('/event/:id/hosts', function(req,res){
        db.user_event.findAll({
            where: {
                eventId: req.params.id,
                host: true
            }
        }).then(function(data){
            res.json(data);
        });
    });

    app.get('/:id/event', function(req,res){
        db.user_event.findAll({
        where: {
            userId: req.params.id
        } 
        }).then(function(data){
            res.json(data);
        });
    });

    app.post('/event/:id/sms', function(req,res){
        
        message.receiveMessage(req,res);
            
    });

    app.get('/test', function(req,res){
        db.user_event.find({
            where: {
                host: false
            },
            include: [{
                model: db.user,
                attributes: ['phone'],
                where: {
                    phone: '+18326431415'
                } 
            }]
        }).then(function(data){
            res.json(data);
        });
    });

}

