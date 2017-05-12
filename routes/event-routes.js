var db = require('../models');
var router = require('express').Router();

//gets all events
router.get('/event', function (req, res) {
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

module.exports = router;