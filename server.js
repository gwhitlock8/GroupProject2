var http = require('http');
var express = require('express');
var twilio = require('twilio');

var app = express();

app.post('api/sms', function(req,res){
    var twilio = require('twilio');
    var twiml = new twilio.TwimlResponse();
    twiml.message('Yo. This is twilio!');
    res.writeHead(200, {'Content-type': 'text/xml'});
    res.end(twiml.toString());
});

http.createServer(app).listen(8080, function(){
    console.log('Listening on port 8080');
})