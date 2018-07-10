// expose our config directly to our application using module.exports
const port = require('./index').PORT;
module.exports = {


  'facebookAuth' : {
    'clientID'      : 'edc22e0ea7e1de98964a35c222191248', // your App ID
    'clientSecret'  : 'edc22e0ea7e1de98964a35c222191248', // your App Secret
    'callbackURL'   : `http://localhost:${port}/api/u/auth/facebook/redirect`
  },

  'googleAuth' : {
    'clientID'      : '146856721457-kqv91mio9boj32qhg9gfb3o7nrqhu8rg.apps.googleusercontent.com',
    'clientSecret'  : 'uIfpYCTQGcsNe3latXvq3ueS',
    'callbackURL'   : `http://localhost:${port}/api/u/auth/google/redirect`
  }

};
