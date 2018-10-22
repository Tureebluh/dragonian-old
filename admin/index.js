import express from 'express';
import dbpool from '../dbpool';
import { connect } from 'http2';

const router = express.Router();

//Send Administrator to contest administration page for CRUD operation on contest
router.get('/contest', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        res.render('admin/contest/contest');
    } else {
        res.redirect('/contest');
    }
});

//Send Administrator to contest administration page for CRUD operation on contest
router.get('/contest/submissions', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        res.render('admin/contest/contestSubmissions');
    } else {
        res.redirect('/contest');
    }
});
//Retrieve all invalid submissions from database
router.get('/contest/submissions/all', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        dbpool.getConnection( (err, connection) => {
            if(err) throw err;
            connection.query('CALL Get_All_Contest_Submissions();', 
            (error, results, fields) => {
                connection.release();
                if (error) throw error;
                res.send(results);
            });
        });
    } else {
        res.redirect('/contest');
    }
});
//Send Administrator to contest administration page for CRUD operation on contest
router.get('/roles', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        res.render('admin/manageroles');
    } else {
        res.redirect('/');
    }
});

//Send Administrator to contest administration page for CRUD operation on contest
router.post('/roles/judges', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        dbpool.getConnection( (err, connection) => {
            if(err) throw err;

            if(req.body.search !== '') {
                connection.query('CALL Search_Users(' + dbpool.escape(req.body.search) + ');', 
                (error, results, fields) => {
                    connection.release();
                    if (error) throw error;
                    res.send(results);
                });
            } else {
                res.send({});
            }
        });
    } else {
        res.redirect('/');
    }
});

//Send Administrator to contest administration page for CRUD operation on contest
router.get('/roles/judges/all', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        dbpool.getConnection( (err, connection) => {
            if(err) throw err;

            connection.query('CALL Get_Users_By_Role(' + '"Judge"' + ');', 
            (error, results, fields) => {
                connection.release();
                if (error) throw error;
                res.send(results);
            });
        });
    } else {
        res.redirect('/');
    }
});

//Send Administrator to contest administration page for CRUD operation on contest
router.post('/roles/add/judge', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        dbpool.getConnection( (err, connection) => {
            if(err) throw err;

            if(req.body.steamid !== '') {
                connection.query('CALL Insert_User_Role_Assoc(' + dbpool.escape(req.body.steamid) + ',' + '"Judge"' + ');', 
                (error, results, fields) => {
                    connection.release();
                    if (error) throw error;
                    res.send({result: 'Success'});
                });
            } else {
                res.send({});
            }
        });
    } else {
        res.redirect('/');
    }
});

//Send Administrator to contest administration page for CRUD operation on contest
router.post('/roles/remove/judges', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
            dbpool.getConnection( (err, connection) => {
                if(err) throw err;
                req.body.steamid.forEach(element => {
                    console.log(element);
                    connection.query('CALL Delete_User_Role_Assoc(' + dbpool.escape(element) + ',' + '"Judge"' + ');', 
                    (error, results, fields) => {
                        if (error) throw error;
                    });
                });
            connection.release();
            res.send({result: 'Success'});
            });
    } else {
        res.redirect('/');
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
                    connection.query('CALL Delete_Contest_Rule_Assoc(' + dbpool.escape(req.body.contestID) + ');', (error, results, fields) => {
                        if (error) throw error;
                    });
                    req.body.contestRules.forEach(rule => {
                        connection.query('CALL Insert_Contest_Rule_Assoc(' + dbpool.escape(req.body.contestID) + ',' + dbpool.escape(rule) + ');', (error, results, fields) => {
                            if (error) throw error;
                        });
                    });
                } else {
                    connection.query('CALL Delete_Contest_Rule_Assoc(' + dbpool.escape(req.body.contestID) + ');', (error, results, fields) => {
                        if (error) throw error;
                    });
                }
                if(typeof req.body.contestCriteria !== 'undefined'){
                    connection.query('CALL Delete_Contest_Criteria_Assoc(' + dbpool.escape(req.body.contestID) + ');', (error, results, fields) => {
                        if (error) throw error;
                    });
                    req.body.contestCriteria.forEach(criteria => {
                        connection.query('CALL Insert_Contest_Criteria_Assoc(' + dbpool.escape(req.body.contestID) + ',' + dbpool.escape(criteria) + ');', (error, results, fields) => {
                            if (error) throw error;
                        });
                    });
                } else {
                    connection.query('CALL Delete_Contest_Criteria_Assoc(' + dbpool.escape(req.body.contestID) + ');', (error, results, fields) => {
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

//Administrators can POST to this endpoint for rule creation
router.post('/create/criteria', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        dbpool.getConnection( (err, connection) => {
            if(req.body.criteriaID > 0) {
                connection.query('CALL Upsert_Criteria('
                                                     + dbpool.escape(req.body.criteriaID) +
                                                    ',' + dbpool.escape(req.body.contestCriteria) +
                                                    ',' + dbpool.escape(req.body.contestCriteriaDescription) +
                                                    ',' + dbpool.escape(req.body.contestCriteriaWeight) +
                                                    ');', 
                (error, results, fields) => {
                    connection.release();
                    if (error) throw error;
                    res.redirect('/admin/contest' + '?result=success');
                });
            } else {
                connection.query('CALL Upsert_Criteria('
                                                     + null +
                                                    ',' + dbpool.escape(req.body.contestCriteria) +
                                                    ',' + dbpool.escape(req.body.contestCriteriaDescription) +
                                                    ',' + dbpool.escape(req.body.contestCriteriaWeight) +
                                                    ');',
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

router.post('/update/contest/submission', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        res.send({result: 'success'});
    }
});

export default router;