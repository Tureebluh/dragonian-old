import session from 'express-session';
import dbpool from './dbpool';

const MYSQLStore = require('express-mysql-session')(session);

const sessionStore = new MYSQLStore({clearExpired: false, expiration: 86400000}, dbpool);

const deleteExpiry = setInterval(() => {
    dbpool.getConnection( (err, connection) => {
        // Use the connection
        connection.query('CALL Delete_Expired_Sessions(' + Date.now() + ');', (error, results, fields) => {
            res.send(results);
            connection.release();
            if (error) throw error;
            // Don't use the connection here, it has been returned to the pool.
        });
    });
    console.log("Delete Expired Sessions");
}, 86400000);

export default sessionStore;