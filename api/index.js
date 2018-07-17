import express from 'express';
import dbpool from '../dbpool';

const router = express.Router();

//
router.post('/unassignedroles', (req, res) => {
    if(req.isAuthenticated()){
        dbpool.getConnection( (err, connection) => {
            connection.query('CALL Get_UnassignedCollabRoles(0, 20);', (error, results, fields) => {
                res.send(results);
                connection.release();
                if (error) throw error;
            });
        });
    } else {
        res.send('Unauthorized Access');
    }
});

export default router;
