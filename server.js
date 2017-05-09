var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var passport = require('passport');
var session = require('express-session');
var exphbs = require('express-handlebars')
var morgan = require('morgan');
var http = require('http');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8000;

var db = require("./models");
app.use(morgan('dev'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


app.use(express.static("./public"));


require('./routes/auth-routes.js')(app);
require('./routes/sms-routes.js')(app);

var exphbs = require('express-handlebars');

// For Passport

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

    // Local signin route
app.get("/", (req, res) => {
    console.log('Entered')
    res.send('signin')
});
//load passport strategies
require('./config/passport/passport.js')(passport, db.user);
// app.use('/', routes.authRoutes);

app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
//require('./routes/auth-routes.js')(app, passport);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });

    });
});