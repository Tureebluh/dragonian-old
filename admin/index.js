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
                connection.query('CALL Upsert_Contest(' + dbpool.escape(req.body.contestID) +
                                                            ',' + dbpool.escape(req.body.contestName) +
                                                            ',' + dbpool.escape(req.body.contestSubmissionStart.replace('T',' ')) +
                                                            ',' + dbpool.escape(req.body.contestSubmissionEnd.replace('T',' ')) +
                                                            ',' + dbpool.escape(req.body.contestVoteStart.replace('T',' ')) +
                                                            ',' + dbpool.escape(req.body.contestVoteEnd.replace('T',' ')) +
                                                            ',' + dbpool.escape(req.body.contestDescription) + ',' +
                                                        null + 
                                                        ',' + ((typeof req.body.contestActive === 'undefined') ? 0 : 1) + ');', 
                (error, results, fields) => {
                    connection.release();
                    if (error) throw error;
                    res.redirect('/admin/contest' + '?result=success');
                });
            } else {
                connection.query('CALL Upsert_Contest(' + null + 
                                                        ',' + dbpool.escape(req.body.contestName) + 
                                                        ',' + dbpool.escape(req.body.contestSubmissionStart.replace('T',' ')) + 
                                                        ',' + dbpool.escape(req.body.contestSubmissionEnd.replace('T',' ')) + 
                                                        ',' + dbpool.escape(req.body.contestVoteStart.replace('T',' ')) + 
                                                        ',' + dbpool.escape(req.body.contestVoteEnd.replace('T',' ')) + 
                                                        ',' + dbpool.escape(req.body.contestDescription) + ',' + 
                                                        null + 
                                                        ',' + ((typeof req.body.contestActive === 'undefined') ? 0 : 1) + ');', 
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
//Administrators can POST to this endpoint for rule creation
router.post('/create/rule', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        dbpool.getConnection( (err, connection) => {
            if(req.body.ruleID > 0) {
                connection.query('CALL Upsert_Rule(' + dbpool.escape(req.body.ruleID) + ',' + dbpool.escape(req.body.contestRule) + ');', 
                (error, results, fields) => {
                    connection.release();
                    if (error) throw error;
                    res.redirect('/admin/contest' + '?result=success');
                });
            } else {
                connection.query('CALL Upsert_Rule(' + null + ',' + dbpool.escape(req.body.contestRule) + ');',
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