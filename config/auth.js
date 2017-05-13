// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth': {
        'clientID': 1558493570849816, // your App ID
        'clientSecret': "9d1883aef254f2104877ae32598854fb", // your App Secret
        'callbackURL': 'https://quiet-forest-57643.herokuapp.com/auth/facebook/callback'
    },

    'twitterAuth': {
        'consumerKey': 'your-consumer-key-here',
        'consumerSecret': 'your-client-secret-here',
        'callbackURL': 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth': {
        'clientID': 'your-secret-clientID-here',
        'clientSecret': 'your-client-secret-here',
        'callbackURL': 'http://localhost:8080/auth/google/callback'
    }

};