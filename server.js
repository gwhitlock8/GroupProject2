var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');

var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


app.use(express.static("./public"));


var routes = require("./controllers/sms.js");

app.use("/",routes);

var exphbs = require('express-handlebars');

app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});