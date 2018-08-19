import express from 'express';
import dbpool from '../dbpool';

const router = express.Router();
//
//          API Endpoints are Structured as /PAGE/DATA_REQUESTED/ALL_OR_SPECIFIED
//
/*
*
*                                       CONTEST
*
*/

//Enters the user into the specified contest by ID
router.post('/contest/submit/', (req, res) => {
    if(req.isAuthenticated()){
        if(typeof req.body.verifySubmissionCB !== 'undefined'){
            if(req.body.contestID && req.body.submissionURL.indexOf('https://steamcommunity.com/sharedfiles/filedetails/?id=') === 0){
                dbpool.getConnection( (err, connection) => {
                    if (err) throw err;
                    
                    connection.query('CALL Upsert_Contest_Submission(' + null + 
                                                                    ',' + dbpool.escape(req.body.contestID) +
                                                                    ',' + dbpool.escape(req.user.steamid) + 
                                                                    ',' + dbpool.escape(req.body.submissionURL) + 
                                                                    ',' + null + ');',
                        (error, results, fields) => {
                            res.redirect('/contest' + '?result=success');
                            connection.release();
                            if (error) throw error;
                    });
                });
            } else {
                res.redirect('/contest' + '?result=badurl');
            }
        } else {
            res.redirect('/contest' + '?result=noterms');
        }
    } else {
        res.send('Unauthorized Access');
    }
});


//Returns back true or false if the user has already submitted to the contest
router.get('/contest/submission/check/:contestID', (req, res) => {
    if(req.isAuthenticated()){
        if(typeof req.params.contestID !== 'undefined'){
            dbpool.getConnection( (err, connection) => {
                if (err) throw err;
                connection.query('CALL Get_Contest_Submitted(' + dbpool.escape(req.params.contestID) + ',' + dbpool.escape(req.user.steamid) + ');', (error, results, fields) => {
                    connection.release();
                    if (error) throw error;
                    let tempJson = {submitted: results[0][0]['COUNT(1)']};
                    res.send(tempJson);
                });
            });
        }
    }
});

//Returns back the oldest active contest. Could be easily changed for multiple contest
router.get('/contest/all/active', (req, res) => {
    if(req.isAuthenticated()){
        dbpool.getConnection( (err, connection) => {
            if (err) throw err;
            connection.query('CALL Get_Active_Contest();', (error, results, fields) => {
                connection.release();
                if (error) throw error;
                res.send(results);
            });
        });
    } else {
        res.send('Unauthorized Access');
    }
});
//Returns back all the contest_ID's and Name's of all the contest
router.get('/contest/names/all', (req, res) => {
    if(req.isAuthenticated()){
        dbpool.getConnection( (err, connection) => {
            if (err) throw err;
            connection.query('CALL Get_All_Contest_Names();', (error, results, fields) => {
                connection.release();
                if (error) throw error;
                res.send(results);
            });
        });
    } else {
        res.send('Unauthorized Access');
    }
});
//Returns back all data associated with the @param ContestID
router.get('/contest/all/:contestID', (req, res) => {
    if(req.isAuthenticated()){
        dbpool.getConnection( (err, connection) => {
            if (err) throw err;
            connection.query('CALL Get_Contest_By_ID(' + dbpool.escape(req.params.contestID) + ');', (error, results, fields) => {
                connection.release();
                if (error) throw error;
                res.send(results);
            });
        });
    } else {
        res.send('Unauthorized Access');
    }
});
//Returns back the rules associated with the @param ContestID
router.get('/contest/rules/:contestID', (req, res) => {
    if(req.isAuthenticated()){
        dbpool.getConnection( (err, connection) => {
            if (err) throw err;
            connection.query('CALL Get_Contest_Rules_By_ID(' + dbpool.escape(req.params.contestID) + ');', (error, results, fields) => {
                connection.release();
                if (error) throw error;
                res.send(results);
            });
        });
    } else {
        res.send('Unauthorized Access');
    }
});

//Returns back all the contest_ID's and Name's of all the contest
router.get("/contest/rules/", (req, res) => {
    if(req.isAuthenticated()){
        dbpool.getConnection( (err, connection) => {
            if (err) throw err;
            connection.query('CALL Get_All_Contest_Rules();', (error, results, fields) => {
                connection.release();
                if (error) throw error;
                res.send(results);
            });
        });
    } else {
        res.send('Unauthorized Access');
    }
});

//Returns back all the contest submissions for active contest
router.get("/contest/submissions", (req, res) => {
    if(req.isAuthenticated()){
        dbpool.getConnection( (err, connection) => {
            if (err) throw err;
            connection.query('CALL Get_Valid_Contest_Submissions();', (error, results, fields) => {
                connection.release();
                if (error) throw error;
                res.send(results);
            });
        });
    } else {
        res.send('Unauthorized Access');
    }
});

/*
*
*                                       COLLABORATION
*
*/

//Get Collaboration Roles that have no currently assigned team member if user is authenticated
router.get('/collabs/all/unassignedroles', (req, res) => {
    if(req.isAuthenticated()){
        dbpool.getConnection( (err, connection) => {
            if (err) throw err;
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
