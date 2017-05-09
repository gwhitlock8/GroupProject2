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
            to: res[i].User.phone,
            body: "Twilio SMS"
        }, function(err,message){
            if(err) {
                console.error(err.message);
            }
        });
    }
};

//receive messages from guests
exports.receiveMessage = function(req,res){   
    // console.log(res.json);
    // console.log(req.body);
    var msgFrom = req.body.From;
    var msgBody = req.body.Body;
    msgBody = msgBody.toLowerCase().trim();

    db.Users.find({
        where: {
            phone: msgFrom
        }
    }).then(function (data){
        console.log(data);
        if(msgBody === 'chicken' || msgBody === 'beef' || msgBody === 'fish'){
            db.UserEvents.update(
                {attending:true},
                {where: {UserId: data.id}}
            ).then(function(){
                res.send(`
                <Response>
                    <Message>
                        Hello ${msgFrom}. You said: ${msgBody}
                    </Message>
                </Response>
                `);
            });
        };   
        
    });
};

    

//     // res.send(`
//     //     <Response>
//     //         <Message>
//     //             Hello ${msgFrom}. You said: ${msgBody}
//     //         </Message>
//     //     </Response>
//     `);
// };


