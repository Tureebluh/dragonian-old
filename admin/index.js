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

            let subStart = new Date(req.body.contestSubmissionStart.toString());

            let subEnd = new Date(req.body.contestSubmissionEnd.toString());

            let voteStart = new Date(req.body.contestVoteStart.toString());

            let voteEnd = new Date(req.body.contestVoteEnd.toString());

            if(req.body.contestID > 0) {
                connection.query('CALL Upsert_Contest(' + dbpool.escape(req.body.contestID) +
                                                            ',' + dbpool.escape(req.body.contestName) +
                                                            ',' + dbpool.escape(subStart.toISOString().replace('T', ' ')) +
                                                            ',' + dbpool.escape(subEnd.toISOString().replace('T', ' ')) +
                                                            ',' + dbpool.escape(voteStart.toISOString().replace('T', ' ')) +
                                                            ',' + dbpool.escape(voteEnd.toISOString().replace('T', ' ')) +
                                                            ',' + dbpool.escape(req.body.contestDescription) + ',' +
                                                        null + 
                                                        ',' + ((typeof req.body.contestActive === 'undefined') ? 0 : 1) +
                                                        ',' + ((typeof req.body.contestJudged === 'undefined') ? 0 : 1) +
                                                        ',@insertID);',
                (error, results, fields) => {
                    if (error) throw error;
                });
                if(typeof req.body.contestRules !== 'undefined'){
                    connection.query('CALL Delete_Contest_Rule_Assoc(' + req.body.contestID + ');', (error, results, fields) => {
                        if (error) throw error;
                    });
                    req.body.contestRules.forEach(rule => {
                        connection.query('CALL Insert_Contest_Rule_Assoc(' + req.body.contestID + ',' + dbpool.escape(rule) + ');', (error, results, fields) => {
                            if (error) throw error;
                        });
                    });
                } else {
                    connection.query('CALL Delete_Contest_Rule_Assoc(' + req.body.contestID + ');', (error, results, fields) => {
                        if (error) throw error;
                    });
                }
            } else {
                let insertID = 0;
                connection.query('CALL Upsert_Contest(' + null + 
                                                        ',' + dbpool.escape(req.body.contestName) + 
                                                        ',' + dbpool.escape(subStart.toISOString().replace('T', ' ')) +
                                                        ',' + dbpool.escape(subEnd.toISOString().replace('T', ' ')) +
                                                        ',' + dbpool.escape(voteStart.toISOString().replace('T', ' ')) +
                                                        ',' + dbpool.escape(voteEnd.toISOString().replace('T', ' ')) +
                                                        ',' + dbpool.escape(req.body.contestDescription) + ',' + 
                                                        null + 
                                                        ',' + ((typeof req.body.contestActive === 'undefined') ? 0 : 1) +
                                                        ',' + ((typeof req.body.contestJudged === 'undefined') ? 0 : 1) +
                                                        ',@insertID);', 
                (error, results, fields) => {
                    if (error) throw error;
                });
            }

            if(err) throw err;

            connection.release();
            res.redirect('/admin/contest' + '?result=success');
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