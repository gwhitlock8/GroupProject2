var db = require('../models');
var router = require('express').Router();

router.get("/guestlist/:id", function (req, res) {
    var eventId = req.params.id;
    //var userId = req.session.passport.id;

    db.user_event.findAll({
        where: { eventId: eventId },
        include: [
            {
                model: db.user,
                attributes: ["phone", "firstname", "lastname", "id", "email"]
            },
            {
                model: db.events,
                attributes: ["event_name", "event_date", "location", "id"]
            }
        ]
    }).then(function (userEvents) {
        db.events.findOne({
            where: { id: eventId }
        }).then(function (singleEvent) {
            //returns an array of user_event objects

            var pulledUserEvents = {
                event: singleEvent,
                user_event: userEvents
            }
            console.log(pulledUserEvents.user_event[0].user.email);
            // console.log(pulledUserEvents.user_events.dataValues);
            res.render("guest", pulledUserEvents);
        });
    });
});


router.post("/guestlist/:id", function (req, res) {
    var eventId = req.params.id
    db.user.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        password: eventId
    }).then(function (newGuest) {
        db.user_event.create({
            userId: newGuest.id,
            eventId: eventId,
            host: false
        }).then(function (newUserEvent) {
            res.redirect("/guestlist/" + eventId);
        });
    });
});
module.exports = router;