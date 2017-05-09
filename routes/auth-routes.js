var db = require("../models");
var passport = require('passport')
var router = require('express'). Router();

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())

        return next();

    res.redirect('/signin');

}

router.get("/phonecheck/:id", (req, res) => {
    var id = req.params.id;
    console.log(db.user);
    db.user.findOne({
        where: {
            id: id
        }
    }).then(function(data) {
        console.log(data);
        if (data.phone) {
            res.redirect("/dashboard");
        } else {
            res.redirect("/addphone");
        }
    });
});

// Local signup route
router.get("/signin", (req, res) => {
    res.render("signin");
});


//removed isLoggedIn,
// Dashboard route, protected by user logged in
router.get("/dashboard", (req, res) => {
    res.render("dashboard");
});

// Logout Route, destroys current session when accessed
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
});

router.post('/signup', passport.authenticate('local-signup', {
    failureRedirect: '/signup'
}), function(req, res) {
    console.log("This is user info: " + req.session.passport.user);
    res.redirect("/phonecheck/" + req.session.passport.user);
});

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/dashboard',
    failureRedirect: '/signin'
}));

// =====================================
// FACEBOOK ROUTES =====================
// =====================================
// route for facebook authentication and login
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/'
    }),
    function(req, res) {
        console.log("facebook info: " + req.session.passport.user);
        res.redirect("/phonecheck/" + req.session.passport.user);
    }
);

module.exports = router;