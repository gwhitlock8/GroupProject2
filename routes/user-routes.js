var db = require("../models");
var passport = require('passport');
var router = require('express').Router();

//PUT route for updating user dinner options and RSVP
router.put("/api/event/:eventid/:userid", function (req, res) {
    message.receiveMessage(req, res);

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

//update user phone
router.post("/phone/:id", (req, res) => {
    var id = req.params.id;
    db.user.update(
        {
            phone: req.body.phone
        }, {
            where: {
                id: id
            }
        }).then(function (data) {
            res.redirect("/dashboard/"+id);
        });
});

module.exports = router;