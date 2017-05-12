var db = require('../models');
var router = require('express').Router();

//gets all events
router.get('/event', function(req, res) {
    db.events.findAll({})
        .then(function(data) {
            res.json(data);
            console.log("gets all events.  event-routes.js line 9");
        });
});
//get all information about a specific event
router.get('/event/:id', function(req, res) {
    db.events.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(data) {
        res.json(data);
        console.log("get all information about a specific response. event-routes.js line 20");
    });
});
//finds a single guest that is attending a specific event
router.get('/api/event/:eventid/:userid', function(req, res) {
    db.user_event.findOne({
        where: {
            eventId: req.params.eventid,
            userId: req.params.userid
        },
        include: [{
            model: db.user,
            attributes: ['phone', 'firstname', 'lastname']
        }]
    }).then(function(data) {
        res.json(data);
    });
});
//gets a single user from an event and deletes that user from the guest list
router.delete('/api/event/:eventid/:userid', function(req, res) {
    db.user_event.destroy({
        where: {
            eventId: req.params.eventid,
            userId: req.params.userid
        }
    }).then(function(data) {
        res.json(data);
    });
});
//gets a single user from an event
router.get('/api/event/:id', function(req, res) {
    db.user_event.findAll({
        where: {
            userId: req.params.id
        }
    }).then(function(data) {
        res.json(data);
    });
});

router.post("/event", function(req, res) {
    //The information for the form is taken and used to create an event in the events table
    db.events.create({
        event_name: req.body.event_name,
        event_date: req.body.event_date,
        location: req.body.location
    }).then(function(createdEvent) {
        //the newly created event is returned in the callback
        //this function creates a new user_event and specifices the id's of the user and event relating the two tables
        db.user_event.create({
            //the user id is taken from the session to protect the user
            userId: req.session.passport.user,
            //the event id is taken from the newly created event
            eventId: createdEvent.id,
            host: true,
            attending: true
        }).then(function(newUserEvent) {
            //the newly created user event is returned in the callback
            //this final database collects all the user events associated with a particular user and renders dashboard with the information
            db.user_event.findAll({
                where: { userId: req.session.passport.user },
                include: [db.user, db.events]
            }).then(function(singleUsersEvents) {
                //this doesnt do anything at the moment, the template needs to be written
                var userEvents = {
                    events: singleUsersEvents
                }
                res.render("dashboard", userEvents);
            });
        });
    });
});

router.post("/addGuests/:eventId", function(req, res) {
    //creates the guest as a user
    db.user.create({
        email: req.body.email,
        phone: req.body.phone,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }).then(function(newUser) {
        //uses the newUser to create a user_event linking the tables
        db.user_event.create({
            userId: newUser.id,
            eventId: req.params.eventId,
            host: false
        }).then(function(newUserEvent) {
            //this final database collects all the user events associated with a particular user and renders dashboard with the information
            db.user_event.findAll({
                where: { userId: req.session.passport.user },
                include: [db.user, db.events]
            }).then(function(singleUsersEvents) {
                //this doesnt do anything at the moment, the template needs to be written
                res.render("dashboard", singleUsersEvents);
            });
        });
    });
});

module.exports = router;