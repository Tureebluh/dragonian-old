import express from 'express';
import dbpool from '../dbpool';

const router = express.Router();

//Send Administrator to contest administration page for CRUD operation on contest
router.get('/contest', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        res.render('admin/contest');
    } else {
        res.redirect('/contest');
    }
});
//Administration can POST to this endpoint for contest creation
router.post('/create/contest', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
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