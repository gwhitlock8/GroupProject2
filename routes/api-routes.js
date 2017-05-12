var db = require("../models");
var router = require('express').Router();

router.get("/api/user/", (req, res) => {
    db.user.findOne({
        where: {
            id: req.session.passport.user
        }
    }).then((dbUser) => {
        res.json(dbUser);
    });
});

module.exports = router;