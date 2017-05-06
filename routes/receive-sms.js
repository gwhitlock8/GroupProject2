var Event = require('.../models/event');
var User = require('../models/user');

exports.webhook = function(req,res) {
    User.findOne({
        phone: phone,
    }, function(err,guest){
        if (err) {
            return respond('Whoops! Please text back again later.');
        } else {
            processMessage(guest);
        }

    });

    //process any message the guest sent to us
    function processMessage (guest){
        var message= request.body.Body || '';
        message = message.toLowerCase().trim();

        //conditional login to do different things based on the command from the guest

        if(message === 'chicken' || message === 'beef' || message === 'fish' || message === 'no') {
            guest.attending = message === 'chicken' || 'beef' || 'fish';
            guest.save(function(err){
                if(err)return respond('We could not record your RSVP - please try again.');

                var respondMessage = 'Thank you for your RSVP. See you at the event!';

                if(!guest.attending)
                    respondMessage = 'You have indicated that you will not be attending the event';

                    
            
        });
    }
    


}