var db = require("../models");

module.exports = function (app, passport) {

    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())

            return next();

        res.redirect('/signin');

    }

    app.get("/signup", (req, res) => {
        res.render("signup");
    });

    app.get("/signin", (req, res) => {
        res.render("signin");
    });

    app.get("/dashboard", isLoggedIn, (req, res) => {
        res.render("dashboard");
    });

    app.get("/logout", (req, res) => {
        req.session.destroy((err) => {
            res.redirect('/');
        });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }
    ));

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin'
    }
    ));
}