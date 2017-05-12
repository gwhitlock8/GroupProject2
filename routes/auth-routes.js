var db = require("../models");
var passport = require('passport');
var router = require('express').Router();

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())

        return next();

    res.redirect('/');

}

router.get("/signin/:id", (req, res) => {
    var id = req.params.id;
    db.user.findOne({
        where: {
            id: id
        }
    }).then(function(data) {
        if (data.phone) {
            res.redirect("/dashboard/" + id);
        } else {
            var info = {
                noPhone: true,
                user_id: id
            }
            res.render("signin", info);
        }
    });
});

router.post("/phone/:id", (req, res) => {
    var id = req.params.id;
    db.user.update({
        phone: req.body.phone
    }, {
        where: {
            id: id
        }
    }).then(function(data) {
        res.redirect("/dashboard/" + id);
    });
});


//TODO: need to flesh out and figure out how to pull correct info
router.get("/dashboard/:id", isLoggedIn, (req, res) => {
    var id = req.params.id;

    db.user_event.findAll({
        include: [db.user, db.events],
        where: {
            eventId: id
        }

    }).then(function(data) {
        console.log("THis is the data:" + data);
        res.render("dashboard", data);
    });
});

// // Local signin route
// router.get("/signin", (req, res) => {
//     res.render("signin");
// });


//removed isLoggedIn,
// Dashboard route, protected by user logged in
router.get("/dashboard", isLoggedIn, (req, res) => {
    res.render("dashboard/" + req.session.passport.user);
});


// Logout Route, destroys current session when accessed
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
});

router.post('/signup', passport.authenticate('local-signup', {
    failureRedirect: '/'
}), function(req, res) {
    console.log("This is user info: " + req.session.passport.user);
    res.redirect("/signin/" + req.session.passport.user);
});

router.post('/login', passport.authenticate('local-signin', {
    failureRedirect: '/'
}), function(req, res) {
    res.redirect("/dashboard/" + req.session.passport.user)
});

// =====================================
// FACEBOOK ROUTES =====================
// =====================================
// route for facebook authentication and login
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_photos'] }));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/'
    }),
    function(req, res) {
        console.log("facebook info: " + req);
        res.redirect("/signin/" + req.session.passport.user);
    }
);

module.exports = router;