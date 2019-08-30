import express from 'express';
import dbpool from '../dbpool';
import ServerShuffle from './ServerShuffle';
import { resolveNaptr } from 'dns';

const router = express.Router();

//Send Administrator to contest administration page for CRUD operation on contest
router.get('/contest', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        res.render('admin/contest/contest');
    } else {
        res.redirect('/contest');
    }
});

//Send Administrator to shuffle administration page for CRUD operation on shuffle
router.get('/shuffle', (req, res) => {
    if(req.isAuthenticated() && (req.user.roles.includes('Administrator') || req.user.roles.includes('Shuffle Moderator'))){
        res.render('admin/shuffle/shuffle');
    } else {
        res.redirect('/shuffle');
    }
});

//Send Administrator to roles administration page for CRUD operation on roles
router.get('/roles', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        res.render('admin/manageroles');
    } else {
        res.redirect('/');
    }
});

//Send Administrator to roles administration page for CRUD operation on roles
router.get('/reports', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        res.render('admin/managereports');
    } else {
        res.redirect('/');
    }
});

//Send Administrator to roles administration page for CRUD operation on roles
router.get('/reports/shuffle/unread', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        dbpool.getConnection( (err, connection) => {
            if(err) throw err;
            connection.query('CALL Get_Unread_Shuffle_Reports();',
            (error, results, fields) => {
                connection.release();
                if (error) throw error;
                res.send(results);
            });
        });
    } else {
        res.redirect('/shuffle');
    }
});

//Send Administrator to roles administration page for CRUD operation on roles
router.post('/reports/shuffle/validate', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        dbpool.getConnection( (err, connection) => {
            if(err) throw err;
            connection.query('CALL Update_Shuffle_Report(' + dbpool.escape(req.body.shuffleReportID) + ',' + dbpool.escape(req.body.isValid) + ');',
            (error, results, fields) => {
                connection.release();
                if (error) throw error;
                res.send({result: 'Success'});
            });
        });
    } else {
        res.redirect('/shuffle');
    }
});

//Shuffle players for every round
router.post('/shuffleplayers', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        //Create server shuffle object to get active shuffle
        let serverShuffle = new ServerShuffle();

        //Check for active shuffle and save to servershuffle obj
        serverShuffle.getActiveShuffle()
        .then((shuffle)=>{
            serverShuffle = shuffle;
            console.log('\nActive shuffle found: ID#' + serverShuffle['Shuffle_ID']);
            serverShuffle.shuffleByRound().then(msg => {
                res.send(msg);
            }).catch(err => {
                res.send(err);
            });
        }).catch(err => {
            console.error(err);
        });
    } else {
        res.redirect('/shuffle');
    }
});

//Send Administrator to contest submissions administration page for CRUD operation on contest submissions
router.get('/contest/winners', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        res.render('admin/contest/contestWinners');
    } else {
        res.redirect('/contest');
    }
});

//Send Administrator to contest submissions administration page for CRUD operation on contest submissions
router.get('/contest/submissions', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        res.render('admin/contest/contestSubmissions');
    } else {
        res.redirect('/contest');
    }
});

//Retrieve all valid submissions
router.post('/contest/submissions/contestid', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        dbpool.getConnection( (err, connection) => {
            if(err) throw err;
            connection.query('CALL Get_Valid_Contest_Sub_Names(' + dbpool.escape(req.body.contestID) + ');',
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

//Update contest submission validity
router.post('/contest/submissions/validate', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        dbpool.getConnection( (err, connection) => {
            if(err) throw err;
            connection.query('CALL Update_Contest_Validity(' + dbpool.escape(req.body.contestSubmissionID) + ',' + dbpool.escape(req.body.isValid) + ');', 
            (error, results, fields) => {
                connection.release();
                if (error) throw error;
                res.send({result: 'Success'});
            });
        });
    } else {
        res.redirect('/contest');
    }
});

//Update contest winner
router.post('/contest/submit/winner', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        dbpool.getConnection( (err, connection) => {
            if(err) throw err;
            connection.query('CALL Update_Contest_Winner(' + dbpool.escape(req.body.contestID) + ',' + dbpool.escape(req.body.winnerID) + ');',
            (error, results, fields) => {
                connection.release();
                if (error) throw error;
                res.send({result: 'Success'});
            });
        });
    } else {
        res.redirect('/contest');
    }
});

//Update contest submission twitch URL for voting page
router.post('/contest/submissions/twitch', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        dbpool.getConnection( (err, connection) => {
            if(err) throw err;
            connection.query('CALL Update_Contest_Twitch(' + dbpool.escape(req.body.contestSubmissionID) + ',' + dbpool.escape(req.body.twitchURL) + ');', 
            (error, results, fields) => {
                connection.release();
                if (error) throw error;
                res.send({result: 'Success'});
            });
        });
    } else {
        res.redirect('/contest');
    }
});



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


router.get('/roles/shuffleban/all', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        dbpool.getConnection( (err, connection) => {
            if(err) throw err;

            connection.query('CALL Get_Users_By_Role(' + '"Shuffle Banned"' + ');', 
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

router.post('/roles/add/shuffleban', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        dbpool.getConnection( (err, connection) => {
            if(err) throw err;

            if(req.body.steamid !== '') {
                connection.query('CALL Insert_User_Role_Assoc(' + dbpool.escape(req.body.steamid) + ',' + '"Shuffle Banned"' + ');', 
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

router.post('/roles/remove/shuffleban', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
            dbpool.getConnection( (err, connection) => {
                if(err) throw err;
                req.body.steamid.forEach(element => {
                    console.log(element);
                    connection.query('CALL Delete_User_Role_Assoc(' + dbpool.escape(element) + ',' + '"Shuffle Banned"' + ');', 
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

router.get('/roles/siteban/all', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        dbpool.getConnection( (err, connection) => {
            if(err) throw err;

            connection.query('CALL Get_Users_By_Role(' + '"Banned"' + ');', 
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

router.post('/roles/add/siteban', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
        dbpool.getConnection( (err, connection) => {
            if(err) throw err;

            if(req.body.steamid !== '') {
                connection.query('CALL Insert_User_Role_Assoc(' + dbpool.escape(req.body.steamid) + ',' + '"Banned"' + ');', 
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

router.post('/roles/remove/siteban', (req, res) => {
    if(req.isAuthenticated() && req.user.roles.includes('Administrator')){
            dbpool.getConnection( (err, connection) => {
                if(err) throw err;
                req.body.steamid.forEach(element => {
                    console.log(element);
                    connection.query('CALL Delete_User_Role_Assoc(' + dbpool.escape(element) + ',' + '"Banned"' + ');', 
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
                    let tempArray = [];
                    if(!Array.isArray(req.body.contestRules)){
                        tempArray.push(req.body.contestRules);
                    } else {
                        tempArray = tempArray.concat(req.body.contestRules);
                    }
                    
                    connection.query('CALL Delete_Contest_Rule_Assoc(' + dbpool.escape(req.body.contestID) + ');', (error, results, fields) => {
                        if (error) throw error;
                    });
                    tempArray.forEach(rule => {
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
                    let tempArray = [];
                    if(!Array.isArray(req.body.contestCriteria)){
                        tempArray.push(req.body.contestCriteria);
                    } else {
                        tempArray = tempArray.concat(req.body.contestCriteria);
                    }
                    
                    connection.query('CALL Delete_Contest_Criteria_Assoc(' + dbpool.escape(req.body.contestID) + ');', (error, results, fields) => {
                        if (error) throw error;
                    });
                    tempArray.forEach(criteria => {
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
        res.redirect('/auth/verification/failed');
    }
});

//Administrators can POST to this endpoint for contest creation
router.post('/create/shuffle', (req, res) => {
    if(req.isAuthenticated() && (req.user.roles.includes('Administrator') || req.user.roles.includes('Shuffle Moderator'))){
        dbpool.getConnection( (err, connection) => {

            let roundOne = new Date(req.body.shuffleRoundOne.toString());

            let roundTwo = new Date(req.body.shuffleRoundTwo.toString());

            let roundThree = new Date(req.body.shuffleRoundThree.toString());

            let roundFour = new Date(req.body.shuffleRoundFour.toString());

            let endDate = new Date(req.body.shuffleEndDate.toString());

            if(req.body.shuffleID > 0) {
                connection.query('CALL Upsert_Shuffle(' + dbpool.escape(req.body.shuffleID) +
                                                            ',' + dbpool.escape(req.body.shuffleName) +
                                                            ',' + dbpool.escape(roundOne.toISOString().replace('T', ' ')) +
                                                            ',' + dbpool.escape(roundTwo.toISOString().replace('T', ' ')) +
                                                            ',' + dbpool.escape(roundThree.toISOString().replace('T', ' ')) +
                                                            ',' + dbpool.escape(roundFour.toISOString().replace('T', ' ')) +
                                                            ',' + dbpool.escape(endDate.toISOString().replace('T', ' ')) +
                                                            ',' + dbpool.escape(req.body.shuffleDescription) + 
                                                        ',' + ((typeof req.body.shuffleActive === 'undefined') ? 0 : 1) +
                                                        ',@insertID);',
                (error, results, fields) => {
                    if (error) throw error;
                });
                
            } else {
                let insertID = 0;
                connection.query('CALL Upsert_Shuffle(' + null +
                                                            ',' + dbpool.escape(req.body.shuffleName) +
                                                            ',' + dbpool.escape(roundOne.toISOString().replace('T', ' ')) +
                                                            ',' + dbpool.escape(roundTwo.toISOString().replace('T', ' ')) +
                                                            ',' + dbpool.escape(roundThree.toISOString().replace('T', ' ')) +
                                                            ',' + dbpool.escape(roundFour.toISOString().replace('T', ' ')) +
                                                            ',' + dbpool.escape(endDate.toISOString().replace('T', ' ')) +
                                                            ',' + dbpool.escape(req.body.shuffleDescription) + 
                                                        ',' + ((typeof req.body.shuffleActive === 'undefined') ? 0 : 1) +
                                                        ',@insertID);', 
                (error, results, fields) => {
                    if (error) throw error;
                });
            }

            if(err) throw err;

            connection.release();
            res.redirect('/admin/shuffle' + '?result=success');
        });
    } else {
        res.redirect('/auth/verification/failed');
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
        res.redirect('/auth/verification/failed');
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
        res.redirect('/auth/verification/failed');
    }
});

//Search database for user matching search query
router.post('/search/users', (req, res) => {
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

export default router;