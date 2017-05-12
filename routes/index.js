var authRoutes = require('./auth-routes');
var smsRoutes = require('./sms-routes');
var eventRoutes = require('./event-routes');
var apiRoutes = require('./api-routes');
var guestRoutes = require('./guest-routes');

module.exports = {
    authRoutes: authRoutes,
    smsRoutes: smsRoutes,
    eventRoutes: eventRoutes,
    apiRoutes: apiRoutes,
    guestRoutes: guestRoutes
}