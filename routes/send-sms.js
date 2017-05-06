var db = require("../models");

module.exports = function(app) {
    var client = require('twilio')(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
    );

    //sends Messages to all guest (not listed as an admin)
    // app.get('/api/event/:event_id', function(req,res){
    //     db.UserEvents.findAll({
    //         where: {
    //             event_id: req.params.event_id
    //         }
    //     }).then(function(dbUserEvents){
    //         client.messages.create({
    //             from: process.env.TWILIO_PHONE_NUMBER,
    //             to: process.env.CELL_PHONE_NUMBER,
    //             body: message,
    //         }).then(function(data) {
    //             console.log('RSVPs sent');
    //             res.json(data);
    //         }).catch(function(err){
    //             console.error('Messages could not be sent to guests');
    //             console.error(err);
    //         });
    //     });
    // });

    // app.post('/api/event/:event_id/:user_id', function(req,res){
    //     db.UserEvents.findOne({
    //         where: {
    //             event_id: req.params.event_id,
    //             user_id: req.params.user_id
    //         }
    //     }).then(function(dbUserEvents){
    //         var message = request.body.Body || '';
    //         message = message.toLowerCase().trim();
    
    //         }).then(function(data) {
    //             console.log('RSVPs sent')
    //         }).catch(function(err){
    //             console.error('Messages could not be sent to guests');
    //             console.error(err);
    //         });
    //     });
    // });

    //Twilio SMS webhook route
    app.post('/message', message.webhook);

    //render page that will allow a host to send out a message to all guests
    app.get('/',pages.showForm);

    //handle form submission and send message to all guests
    app.post('/message/send', message.sendMessage);
}
