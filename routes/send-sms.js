var client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

app.get('/api/sms', function(req,res){
    client.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.CELL_PHONE_NUMBER,
        body: "Yo. This is the Twilio number",
    }, function(err,message){
        if(err) {
            console.error(err.message);
        } else {
            console.log(message.sid);
        }
    });
});