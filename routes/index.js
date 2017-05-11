var authRoutes = require('./auth-routes');
var smsRoutes = require('./sms-routes');
var eventRoutes = require('./event-routes');
var userRoutes = require('./user-routes');

module.exports = {
    authRoutes: authRoutes,
    smsRoutes: smsRoutes,
    eventRoutes: eventRoutes,
    userRoutes: userRoutes
}