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
//Administrators can POST to this endpoint for contest creation
router.post('/create/contest', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        dbpool.getConnection( (err, connection) => {
            if(req.body.contestID > 0) {
                connection.query('CALL Upsert_Contest(' + '\'' + req.body.contestID + '\'' + 
                                                        ',\'' +  req.body.contestName + 
                                                        '\',\'' + req.body.contestSubmissionStart.replace('T',' ') + 
                                                        '\',\'' + req.body.contestSubmissionEnd.replace('T',' ') + 
                                                        '\',\'' + req.body.contestVoteStart.replace('T',' ') + 
                                                        '\',\'' + req.body.contestVoteEnd.replace('T',' ') + 
                                                        '\',\'' + req.body.contestDescription + '\',' + 
                                                        null + 
                                                        ',' + ((typeof req.body.contestActive === 'undefined') ? 0 : 1) + ');', 
                (error, results, fields) => {
                    connection.release();
                    if (error) throw error;
                    res.redirect('/admin/contest' + '?result=success');
                });
            } else {
                connection.query('CALL Upsert_Contest(' + null + 
                                                        ',\'' + req.body.contestName + 
                                                        '\',\'' + req.body.contestSubmissionStart.replace('T',' ') + 
                                                        '\',\'' + req.body.contestSubmissionEnd.replace('T',' ') + 
                                                        '\',\'' + req.body.contestVoteStart.replace('T',' ') + 
                                                        '\',\'' + req.body.contestVoteEnd.replace('T',' ') + 
                                                        '\',\'' + req.body.contestDescription + '\',' + 
                                                        null + 
                                                        ',' + req.body.contestActive + ');', 
                (error, results, fields) => {
                    connection.release();
                    if (error) throw error;
                    res.redirect('/admin/contest' + '?result=success');
                });
            }
            
            if(err) throw err;
        });
    } else {
        res.send('Unauthorized Access');
    }
});

export default router;