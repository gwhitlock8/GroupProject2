
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
// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var passport   = require('passport');
var session    = require('express-session');
var exphbs = require('express-handlebars')

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

//For Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./public"));

// For Passport
 
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
 
app.use(passport.initialize());
 
app.use(passport.session()); // persistent login sessions

//load passport strategies
require('./config/passport/passport.js')(passport, db.user);

// Routes =============================================================

require('./routes/auth-routes.js')(app, passport);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
