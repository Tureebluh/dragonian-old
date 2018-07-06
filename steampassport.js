import config from './config';
import dbpool from './dbpool';
import fetch from 'node-fetch';

const OpenIDStrategy = require('passport-openid').Strategy;
const SteamStrategy = new OpenIDStrategy(
    {
        providerURL: 'http://steamcommunity.com/openid',
        stateless: true,
        returnURL: (config.nodeEnv === 'development') ? 'http://localhost:3000/auth/login/return' : '',
        realm: (config.nodeEnv === 'development') ? 'http://localhost:3000/' : ''
    },
        function(identifier, done){
            //Check to see if user owns Planet Coaster (493340)
            fetch('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key='
                 + process.env.STEAM_API_KEY + '&format=json&input_json={"steamid":' + identifier.match(/\d+$/)[0] + ', "appids_filter":' + '[493340]}')
            .then(res => {
                //Return response to next call as JSON
                return res.json();
            })
            .then(resJson => {
                //If the game count is equal to one it was found, other wise done will be called with false and fail validation
                if(resJson.response['game_count'] === 1){
                    fetch('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + process.env.STEAM_API_KEY + '&steamids=' + identifier.match(/\d+$/)[0])
                    .then(res => {
                        return res.json();
                    })
                    .then(resJson => {
                        dbpool.getConnection( (err, connection) => {
                            connection.query('CALL Upsert_User(\'' + resJson.response.players[0].steamid + '\',\'' + resJson.response.players[0].personaname + '\',\'' + resJson.response.players[0].avatarfull + '\');', (error, results, fields) => {
                                connection.release();
                                if (error) throw error;
                                return done(null, resJson.response.players[0].steamid);
                                // Don't use the connection here, it has been returned to the pool.
                            });
                        });
                    })
                    .catch(err => console.error(err));
                } else {
                    return done(null, false);
                }
            })
            .catch(err => console.error(err));
        }
);

const passport = require('passport');
passport.use(SteamStrategy);

passport.serializeUser(function(user, done){
    //create cookie
    done(null, user);
});
passport.deserializeUser(function(user, done){
    //retrieve user from cookie
    done(null, user);
});

export default passport;