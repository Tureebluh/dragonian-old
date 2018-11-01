import config from './config';
import dbpool from './dbpool';
import fetch from 'node-fetch';
import session from 'express-session';

const OpenIDStrategy = require('passport-openid').Strategy;
const SteamStrategy = new OpenIDStrategy(
    {
        providerURL: 'http://steamcommunity.com/openid',
        stateless: true,
        returnURL: (config.nodeEnv === 'development') ? 'http://192.168.86.50:3000/auth/login/return' : 'http://www.dragonian.xyz/auth/login/return',
        realm: (config.nodeEnv === 'development') ? 'http://192.168.86.50:3000' : 'http://www.dragonian.xyz'
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
                //If the game count is equal to 1 it was found, other wise done will be called with false and fail validation
                if(resJson.response['game_count'] === 1){
                    fetch('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + process.env.STEAM_API_KEY + '&steamids=' + identifier.match(/\d+$/)[0])
                    .then(res => {
                        return res.json();
                    })
                    .then(resJson => {
                        dbpool.getConnection( (err, connection) => {
                            connection.query('CALL Upsert_User(\'' + resJson.response.players[0].steamid + '\',\'' + resJson.response.players[0].personaname + '\',\'' + resJson.response.players[0].avatarfull + '\');', (error, results, fields) => {
                                if (error) throw error;
                            });
                            connection.query('CALL Get_UserRoles(' + resJson.response.players[0].steamid + ');', (error, results, fields) => {
                                let tempArray = results[0];
                                let rolesArray = [];
                                tempArray.forEach((obj)=>{
                                    rolesArray.push(obj.role);
                                });
                                if(!rolesArray.includes('Banned')){
                                    let userJson =  {
                                        'steamid': resJson.response.players[0].steamid,
                                        'roles': rolesArray,
                                        'personaname': resJson.response.players[0].personaname,
                                        'avatarfull': resJson.response.players[0].avatarfull
                                    };
                                    connection.release();
                                    if (error) throw error;
                                    return done(null, userJson);
                                } else {
                                    connection.release();
                                    return done(null, false);
                                }
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