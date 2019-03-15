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
import ServerShuffle from './ServerShuffle';


const server = express();

const sess = {
    cookie: {
        maxAge: 86400000 * 30
    },
    secret: process.env.DRAGONIAN_DB_PASS,
    name: 'dragonianID',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
};

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

    server.set('trust proxy', 1);
    sess.cookie.secure = true;
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
server.use(session(sess));

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

//Default route to render terms of service
server.get('/terms-of-use', (req, res) => {
    res.render('app/terms');
});

//Default route to render privacy policy
server.get('/privacy-policy', (req, res) => {
    res.render('app/privacypolicy');
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
//Render shuffle page
server.get('/shuffle', (req, res) => {
    if(req.isAuthenticated()){
        res.render('user/shuffle/shuffle');
    } else {
        res.redirect('/auth/login');
    }
});
//Render profile page for this user
server.get('/profile/me', (req, res) => {
    if(req.isAuthenticated()){
        res.render('user/profile/profile');
    } else {
        res.redirect('/auth/login');
    }
});

//Render progress page for active shuffle
server.get('/shuffle/progress/', (req, res) => {
    if(req.isAuthenticated()){
        res.render('user/shuffle/shuffleProgress');
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
    //Create server shuffle object to get active shuffle
    let serverShuffle = new ServerShuffle();

    //Check for active shuffle and save to servershuffle obj
    serverShuffle.getActiveShuffle()
    .then((shuffle)=>{
        serverShuffle = shuffle;
        serverShuffle.shuffleWithinHour();
    }).catch(err => {
        console.error(err);
    });

    //Check daily for new shuffles
    setTimeout(()=>{
        serverShuffle.getActiveShuffle()
        .then((shuffle)=>{
            serverShuffle = shuffle;
        }).catch(err => {
            console.error(err);
        });
    }, 86400000);

    //Check hourly for shuffle rounds ending
    setTimeout(()=>{
        serverShuffle.shuffleWithinHour();
    }, 3600000);
});
