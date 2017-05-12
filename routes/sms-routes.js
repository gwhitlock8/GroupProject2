var db = require('../models');
var message = require('../utils/messages-sms');
var router = require('express').Router();

//returns a full guest lists based on the event that is selected
router.get('/api/event/guests', function(req, res) {
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
    }).then(function(data) {
        res.json(data);
        console.log("sms-routes line 22");
        console.log(data);
        // message.sendMessage(data);
    });
});

// router.post('api/event/:eventid/:userid', function(req,res){
//     message.receiveMessage(req,res)

// });

//PUT route for updating user dinner options and RSVP
router.put("/api/event/:eventid/:userid", function(req, res) {
    message.receiveMessage(req, res);

});

module.exports = router;