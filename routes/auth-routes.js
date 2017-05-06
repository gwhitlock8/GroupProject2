var db = require("../models");

module.exports = function (app, passport) {

    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())

            return next();

        res.redirect('/signin');

    }

    // Local signup route
    app.get("/signup", (req, res) => {
        res.render("signup");
    });

    // Local signin route
    app.get("/signin", (req, res) => {
        res.render("signin");
    });

    // Dashboard route, protected by user logged in
    app.get("/dashboard", isLoggedIn, (req, res) => {
        res.render("dashboard");
    });

    // Logout Route, destroys current session when accessed
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

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/dashboard',
            failureRedirect: '/'
        }));

}