var authRoutes = require('./auth-routes');
var smsRoutes = require('./sms-routes');
var eventRoutes = require('./event-routes');
apiRoutes = require('./api-routes');

module.exports = {
    authRoutes: authRoutes,
    smsRoutes: smsRoutes,
    eventRoutes: eventRoutes,
    apiRoutes: apiRoutes
}