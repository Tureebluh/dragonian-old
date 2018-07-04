import config from './config';
import apiRouter from './api';
import bodyParser from 'body-parser';
import express from 'express';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';

const server = express();

server.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public')
}));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.set('view engine', 'ejs');

server.get('/', (req, res) => {
    res.render('index'); 
});

server.use('/api', apiRouter);

server.use(express.static('public'));

server.listen(config.port, () => {
    console.log("Server listening on port " + config.port);
});