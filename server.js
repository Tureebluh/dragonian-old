import config from './config';
import apiRouter from './api';
import authRouter from './auth';
import session from 'express-session';
import sessionStore from './session';
import bodyParser from 'body-parser';
import express from 'express';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import passport from './steampassport';
import dbpool from './dbpool';

const server = express();

if(config.nodeEnv === 'production'){
    let forceSsl = function (req, res, next) {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(301, ['https://', req.get('Host'), req.url].join(''));
        }
        return next();
    };
    server.use(forceSsl);
}

server.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public')
}));

server.use(bodyParser.urlencoded({extended: true}));

server.use(session({
    secret: process.env.DRAGONIAN_DB_PASS,
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

server.use(passport.initialize());
server.use(passport.session());

server.use((req,res,next) => {
    res.locals.user = req.user;
    res.locals.roles = req.session.roles;
    next();
});

server.set('view engine', 'ejs');

server.get('/', (req, res) => {
    res.render('index');
});
server.get('/collabs', (req, res) => {
    if(req.isAuthenticated()){
        res.render('collabs');
    } else {
        res.redirect('/auth/login');
    }
});
server.get('/contest', (req, res) => {
    if(req.isAuthenticated()){
        if(!req.session.roles){
            dbpool.getConnection( (err, connection) => {
                // Use the connection
                connection.query('CALL Get_UserRoles(' + req.user + ');', (error, results, fields) => {
                    let tempArray = results[0];
                    let rolesArray = [];
                    tempArray.forEach((obj)=>{
                        rolesArray.push(obj.role);
                    });
                    req.session.roles = rolesArray;
                    connection.release();
                    if (error) throw error;
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }   
        res.render('contest');
    } else {
        res.redirect('/auth/login');
    }
});

server.use('/api', apiRouter);
server.use('/auth', authRouter);

server.use(express.static('public'));

server.listen(config.port, () => {
    console.log("Server listening on port " + config.port);
});
