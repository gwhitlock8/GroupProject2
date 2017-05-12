
var db = require('../models');
var router = require('express').Router();

router.get("/guestlists/:id", function(req, res){
    res.send("You made it");
});

module.exports = router;