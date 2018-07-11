import session from 'express-session';
import dbpool from './dbpool';

const MYSQLStore = require('express-mysql-session')(session);

const sessionStore = new MYSQLStore({clearExpired: false, expiration: 86400000}, dbpool);

const deleteExpiry = setInterval(() => {
    dbpool.getConnection( (err, connection) => {
        // Use the connection
        connection.query('CALL Delete_Expired_Sessions(' + Math.round(Date.now() / 1000) + ');', (error, results, fields) => {
            connection.release();
            if (error) throw error;
            // Don't use the connection here, it has been returned to the pool.
        });
    });
}, 86400000);

export default sessionStore;