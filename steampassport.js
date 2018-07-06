import config from './config';
const OpenIDStrategy = require('passport-openid').Strategy;
const SteamStrategy = new OpenIDStrategy(
    {
        providerURL: 'http://steamcommunity.com/openid',
        stateless: true,
        returnURL: (config.nodeEnv === 'development') ? 'http://localhost:3000/auth/login/return' : '',
        realm: (config.nodeEnv === 'development') ? 'http://localhost:3000/' : ''
    },
        function(identifier, done){
            //This is the validate callback. Check database for user
            
            return done(null, identifier.match(/\d+$/)[0]);
        }
);
const passport = require('passport');
passport.use(SteamStrategy);

passport.serializeUser(function(user, done){
    //create key cookie
    done(null, user);
});
passport.deserializeUser(function(user, done){
    //retrieve key from cookie
    done(null, user);
});

export default passport;