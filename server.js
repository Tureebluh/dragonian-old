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
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';


const server = express();
//CHANGE BACK TO (301)
//If server is running in production all request will be permanently(301) routed to https
if(config.nodeEnv === 'production'){
    let forceSsl = function (req, res, next) {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(301, ['https://', req.get('Host'), req.url].join(''));
        }
        return next();
    };
    server.use(forceSsl);
    server.use(helmet());

    //Add rate limiter to api, auth, and admin api routes
    //10(mins) * 60(secs) * 1000(ms)
    const rateLimiter = rateLimit({
        windowMs: 10 * 60 * 1000,
        max: 100
    });
    server.use('/api', rateLimiter);
    server.use('/auth', rateLimiter);
    server.use('/admin', rateLimiter);
}

//Middleware to convert SASS to CSS
server.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public')
}));

//Middleware to easily get json data from endpoints
server.use(bodyParser.urlencoded({limit: '100kb', extended: true}));
server.use(bodyParser.json());

//Middleware to use express sessions and load session store
server.use(session({
    secret: process.env.DRAGONIAN_DB_PASS,
    name: 'dragonianID',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

//Middleware to use passport for authentication
//NOTE: passport.session() must be called AFTER session has been created and passed to express
server.use(passport.initialize());
server.use(passport.session());

//Sets the req.user object to a global instance that EJS has access to
server.use((req,res,next) => {
    res.locals.user = req.user;
    next();
});

//Set templating engine to ejs
server.set('view engine', 'ejs');

//Default route to render homepage
server.get('/', (req, res) => {
    res.render('index');
});

//Default route to render homepage
server.get('/terms-of-use', (req, res) => {
    res.render('app/terms');
});

//Authentication REQUIRED otherwise redirect to login endpoint
//Render collab page
server.get('/collabs', (req, res) => {
    if(req.isAuthenticated()){
        res.render('user/collab/collabs');
    } else {
        res.redirect('/auth/login');
    }
});
//Render contest page
server.get('/contest', (req, res) => {
    if(req.isAuthenticated()){
        res.render('user/contest/contest');
    } else {
        res.redirect('/auth/login');
    }
});
//Render voting page for active contest
server.get('/contest/vote/', (req, res) => {
    if(req.isAuthenticated()){
        res.render('user/contest/contestVote');
    } else {
        res.redirect('/auth/login');
    }
});
//Renders judging page for the active contest
server.get('/contest/judge/', (req, res) => {
    if(req.isAuthenticated()){
        if(req.user.roles.includes('Judge')) {
            res.render('user/contest/contestJudge');
        } else {
            res.redirect('/contest/results/');
        }
    } else {
        res.redirect('/auth/login');
    }
});
//Renders results page for the active contest
server.get('/contest/results/', (req, res) => {
    if(req.isAuthenticated()){
        res.render('user/contest/contestResults');
    } else {
        res.redirect('/auth/login');
    }
});

//Endpoint routers for express to separate concerns
server.use('/api', apiRouter);
server.use('/auth', authRouter);
server.use('/admin', adminRouter);

//Set the public folder as the folder containing all our built files & resources - i.e style.css, bundle.js
server.use(express.static('public'));

//Set express to listen for request on the port specified in config.port
server.listen(config.port, () => {
    console.log("Server listening on port " + config.port);
});
