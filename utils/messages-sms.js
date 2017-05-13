var db = require('../models');
var twilio = require('twilio');

require('dotenv').config();

var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
var twilioPhone = process.env.TWILIO_NUMBER;
var myNumber = process.env.CELL_PHONE_NUMBER;

var client = require('twilio')(accountSid,authToken);

//send message to all guests
exports.sendMessage = function(res,req) {
    for(i=0;i<res.length; i++){
            client.messages.create({
            from: twilioPhone,
            to: res[i].user.phone,
            body: "You have been invited to event number: " + res[i].eventId+". Respond to RSVP. Enter event number followed by RSVP ("+res[i].eventId+", yes)"
        }, function(err,message){
            if(err) {
                console.error(err.message);
            }
        });
    }
};

//receive messages from guests
exports.receiveMessage = function(req,res){   

    var msgFrom = req.body.From;
    var msgBody = req.body.Body;
    var msgBodyArray = msgBody.split(',');
    var eventId = msgBodyArray[0];
    eventId = eventId.trim();
    parseInt(eventId);
    var rsvp = msgBodyArray[1];
    rsvp = rsvp.toLowerCase().trim();

    db.user_event.find({
        where: {
            eventId: eventId
        },
        include: [{
            model: db.user,
            where: {
                phone: msgFrom
            }
        }]
    }).then(function (data){
        console.log(data);
        if(rsvp === 'yes'){
            db.user_event.update(
                {
                    attending:true
                },
                {where: {userId: data.userId}}
            ).then(function(){
                res.send(`
                <Response>
                    <Message>
                        Hello ${data.user.firstname}. You said that you will attend the event!
                    </Message>
                </Response>
                `);
            });
        } else if (rsvp === 'no') {
            res.send(`
                <Response>
                    <Message>
                        Hello ${data.user.firstname}. You said that you are unable to attend!
                    </Message>
                </Response>
            `);
        }
    });
};   
        


