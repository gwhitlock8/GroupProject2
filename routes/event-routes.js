var db = require("../models");
var passport = require('passport');
var router = require('express').Router();

router.post("/api/events", (req, res) => {
    db.events.create({
        event_name: req.body.name,
        event_date: req.body.date,
        location: req.body.location
    }).then(function(data) {
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

//gets all events
router.get('/api/event', function (req, res) {
    db.events.findAll({})
        .then(function (data) {
            res.json(data);
        });
});

module.exports = router;