import session from 'express-session';
import dbpool from './dbpool';

const MYSQLStore = require('express-mysql-session')(session);
//86400000 = 1 days
const sessionStore = new MYSQLStore({clearExpired: false, expiration: 86400000 * 30}, dbpool);

//Run daily to delete all expired sessions from database
const deleteExpiry = setInterval(() => {
    dbpool.getConnection( (err, connection) => {
        connection.query('CALL Delete_Expired_Sessions(' + Math.round(Date.now() / 1000) + ');', (error, results, fields) => {
            connection.release();
            if (error) throw error;
        });
    });
}, 86400000);

export default sessionStore;