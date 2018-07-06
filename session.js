import session from 'express-session';
import dbpool from './dbpool';

const MYSQLStore = require('express-mysql-session')(session);

const sessionStore = new MYSQLStore({}, dbpool);

export default sessionStore;