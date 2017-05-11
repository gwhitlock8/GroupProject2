var db = require('../models');
var message = require('../utils/messages-sms');
var router = require('express').Router();


//gets all events
router.get('/api/event', function (req, res) {
    db.events.findAll({})
        .then(function (data) {
            res.json(data);
        });
});

//get all information about a specific event
router.get('/event/:id', function (req, res) {
    db.events.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (data) {
        res.json(data);
    });
});

//returns a full guest lists based on the event that is selected

router.get('/api/event/guests', function (req, res) {*-
    var query = {};
    if (req.query.event_id) {
        query.eventId = req.query.event_id;
    }
    db.user_event.findAll({
        where: {
            query,
            host: false
        },
        include: [{
            model: db.user,
            attributes: ['phone', 'firstname', 'lastname']
        }]
    }).then(function (data) {
        res.json(data);
        // message.sendMessage(data);
    });
});

//finds a single guest that is attending a specific event
router.get('/api/event/:eventid/:userid', function (req, res) {
    db.user_event.findOne({
        where: {
            eventId: req.params.eventid,
            userId: req.params.userid
        },
        include: [{
            model: db.user,
            attributes: ['phone', 'firstname', 'lastname']
        }]
    }).then(function (data) {
        res.json(data);
    });
});

//gets a single user from an event and deletes that user from the guest list
router.delete('/api/event/:eventid/:userid', function (req, res) {
    db.user_event.destroy({
        where: {
            eventId: req.params.eventid,
            userId: req.params.userid
        }
    }).then(function (data) {
        res.json(data);
    });
});

//gets a single user from an event
router.get('/api/event/:id', function (req, res) {
    db.user_event.findAll({
        where: {
            userId: req.params.id
        }
    }).then(function (data) {
        res.json(data);
    });
});

// router.post('api/event/:eventid/:userid', function(req,res){
//     message.receiveMessage(req,res)

// });

//PUT route for updating user dinner options and RSVP
router.put("/api/event/:eventid/:userid", function (req, res) {
    message.receiveMessage(req, res);

});

module.exports = router;