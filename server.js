import config from './config';
import apiRouter from './api';
import authRouter from './auth';
import adminRouter from './admin'
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
        res.render('contest');
    } else {
        res.redirect('/auth/login');
    }
});

server.use('/api', apiRouter);
server.use('/auth', authRouter);
server.use('/admin', adminRouter);

server.use(express.static('public'));

server.listen(config.port, () => {
    console.log("Server listening on port " + config.port);
});
