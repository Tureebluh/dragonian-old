import dbpool from '../dbpool';

class ServerShuffle {
    constructor(Shuffle_ID, RoundOneStart, RoundTwoStart, RoundThreeStart, RoundFourStart, EndDate) {
        this._Shuffle_ID = Shuffle_ID;
        this._RoundOneStart = RoundOneStart;
        this._RoundTwoStart = RoundTwoStart;
        this._RoundThreeStart = RoundThreeStart;
        this._RoundFourStart = RoundFourStart;
        this._EndDate = EndDate;
    }

    set Shuffle_ID(Shuffle_ID){
        this._Shuffle_ID = Shuffle_ID;
    }
    get Shuffle_ID(){
        return this._Shuffle_ID;
    }

    set RoundOneStart(RoundOneStart){
        this._RoundOneStart = RoundOneStart;
    }
    get RoundOneStart(){
        return this._RoundOneStart;
    }

    set RoundTwoStart(RoundTwoStart){
        this._RoundTwoStart = RoundTwoStart;
    }
    get RoundTwoStart(){
        return this._RoundTwoStart;
    }

    set RoundThreeStart(RoundThreeStart){
        this._RoundThreeStart = RoundThreeStart;
    }
    get RoundThreeStart(){
        return this._RoundThreeStart;
    }

    set RoundFourStart(RoundFourStart){
        this._RoundFourStart = RoundFourStart;
    }
    get RoundFourStart(){
        return this._RoundFourStart;
    }

    set EndDate(EndDate){
        this._EndDate = EndDate;
    }
    get EndDate(){
        return this._EndDate;
    }

    getActiveShuffle(){
        return new Promise((resolve, reject) => {
            dbpool.getConnection((err, connection) => {
                if (err) { throw err; }
                connection.query('CALL Get_Active_Shuffle();', (error, results, fields) => {
                    connection.release();
                    if (error) { throw error; }
                    if (typeof results[0][0] !== 'undefined') {
                        let roundOne = new Date(results[0][0].RoundOneStart);
                        let roundTwo = new Date(results[0][0].RoundTwoStart);
                        let roundThree = new Date(results[0][0].RoundThreeStart);
                        let roundFour = new Date(results[0][0].RoundFourStart);
                        let endDate = new Date(results[0][0].EndDate);
                        resolve(new ServerShuffle(results[0][0].Shuffle_ID, roundOne, roundTwo, roundThree, roundFour, endDate));
                    } else {
                        reject('No active shuffle');
                    }
                });
            });
        });
    }

    //Shuffle pieces for given round
    shuffleByRound(){
        return new Promise((resolve, reject) => {
            let round = 0;
            let totalIteration = 0;
            let assigned = [];
            if(typeof this.RoundOneStart !== 'undefined'){
                //First Round
                if(this.RoundOneStart < Date.now() && this.RoundTwoStart > Date.now()){
                    round = 2;
                //Second Round
                } else if(this.RoundTwoStart < Date.now() && this.RoundThreeStart > Date.now()){
                    round = 3;
                //Third Round
                } else if(this.RoundThreeStart < Date.now() && this.RoundFourStart > Date.now()){
                    round = 4;
                } else {
                    reject('Shuffle has ended.');
                }

                dbpool.getConnection((err, connection) => {
                    if (err) { throw err; }
                    connection.query('CALL Get_Submissions_For_Shuffling(' + dbpool.escape(this.Shuffle_ID) + ');', (error, results, fields) => {
                        connection.release();
                        if (error) { throw error; }
                        
                        if (typeof results[0][0] !== 'undefined') {
                            this.attemptShuffle(assigned, results, round, totalIteration)
                            .then(shuffled => {
                                results = shuffled;
                                console.log('\n*****************   Shuffled   ********************');

                                dbpool.getConnection((err, connection) => {
                                    if (err) { throw err; }
                                    results[0].forEach(element => {
                                        switch(round){
                                            case 2:
                                                this.updateSubmissionInDB(element['shuffle_submission_ID'], element['r2_SteamID'], round, connection)
                                                .then(message => {
                                                    console.log(message);
                                                }).catch(err => {
                                                    console.error(err);
                                                });
                                                break;
                                            case 3:
                                                this.updateSubmissionInDB(element['shuffle_submission_ID'], element['r3_SteamID'], round, connection)
                                                .then(message => {
                                                    console.log(message);
                                                }).catch(err => {
                                                    console.error(err);
                                                });
                                                break;
                                            case 4:
                                                this.updateSubmissionInDB(element['shuffle_submission_ID'], element['r4_SteamID'], round, connection)
                                                .then(message => {
                                                    console.log(message);
                                                }).catch(err => {
                                                    console.error(err);
                                                });
                                                break;
                                        }
                                    });
                                    connection.release();
                                    resolve('Completed');
                                });
                            })
                            .catch(err => {
                                reject(err);
                            });
                        }
                    });
                });
            } else {
                reject('No active shuffle');
            }
        });   
    }

    attemptShuffle(assigned, results, round, totalIteration){
        return new Promise((resolve, reject) => {
            //Loop through each shuffle submission received - element.r1_steamID will be the assigned ID
            results[0].forEach(element => {
                //Create container to hold steamid of submission after it has been assigned a person
                let match = false;
                let index = 0;
                //Loop until a random submission is selected that element(user) hasn't worked on
                while(!match){
                    if(totalIteration > ((results[0].length) * 5)){
                        reject('Failed');
                    }
                    totalIteration++;
                    //Index will randomly select a submission to match
                    index = Math.floor(Math.random()*results[0].length);
                    
                    //Do additional checks for each round. Ensures user never works on the same piece twice
                    //Once a valid submission is randomly selected, user is added to assigned
                    switch(round){
                        case 2:
                            if(!assigned.includes(results[0][index]['r1_SteamID'])){
                                if(element['r1_SteamID'] !== results[0][index]['r1_SteamID']){
                                    results[0][index]['r2_SteamID'] = element['r1_SteamID'];
                                    assigned.push(results[0][index]['r1_SteamID']);
                                    match = true;
                                }
                            } else if(assigned.length === results[0].length) {
                                match = true;
                            }
                            break;
                        case 3:
                            if(!assigned.includes(results[0][index]['r1_SteamID'])){
                                if((element['r1_SteamID'] !== results[0][index]['r1_SteamID']) &&
                                    (element['r1_SteamID'] !== results[0][index]['r2_SteamID'])){

                                    results[0][index]['r3_SteamID'] = element['r1_SteamID'];
                                    assigned.push(results[0][index]['r1_SteamID']);
                                    match = true;
                                }
                                //If selected submission has been assigned, see if it would be a good fit for this user as well
                                //Check to make sure already assigned user has another valid submission to use
                            } else if((element['r1_SteamID'] !== results[0][index]['r1_SteamID']) &&
                                        (element['r1_SteamID'] !== results[0][index]['r2_SteamID']) ){
                                for(let k = 0; k < results[0].length; k++){
                                    let elem = results[0][k];

                                    totalIteration++;
                                    if((elem['r1_SteamID'] !== results[0][index]['r3_SteamID']) &&
                                        (elem['r2_SteamID'] !== results[0][index]['r3_SteamID']) &&
                                        (elem['r3_SteamID'] !== results[0][index]['r3_SteamID']) &&
                                        (!assigned.includes(elem['r1_SteamID']))){
                                        
                                        elem['r3_SteamID'] = results[0][index]['r3_SteamID'];
                                        results[0][index]['r3_SteamID'] = element['r1_SteamID'];
                                        assigned.push(elem['r1_SteamID']);
                                        match = true;
                                        break;
                                    }
                                }
                            } else if(assigned.length === results[0].length) {
                                match = true;
                            }
                            break;
                        case 4:
                            if(!assigned.includes(results[0][index]['r1_SteamID'])){
                                if((element['r1_SteamID'] !== results[0][index]['r1_SteamID']) &&
                                    (element['r1_SteamID'] !== results[0][index]['r2_SteamID']) &&
                                    (element['r1_SteamID'] !== results[0][index]['r3_SteamID']) ){
                                    
                                    results[0][index]['r4_SteamID'] = element['r1_SteamID'];
                                    assigned.push(results[0][index]['r1_SteamID']);
                                    match = true;
                                }
                                //If selected submission has been assigned, see if it would be a good fit for this user as well
                                //Check to make sure already assigned user has another valid submission to use
                            } else if((element['r1_SteamID'] !== results[0][index]['r1_SteamID']) &&
                                        (element['r1_SteamID'] !== results[0][index]['r2_SteamID']) &&
                                            (element['r1_SteamID'] !== results[0][index]['r3_SteamID']) ){
                                //Loop through each piece finding a match for our randomly selected BP
                                for(let k = 0; k < results[0].length; k++){
                                    let elem = results[0][k];

                                    totalIteration++;
                                    if((elem['r1_SteamID'] !== results[0][index]['r4_SteamID']) &&
                                        (elem['r2_SteamID'] !== results[0][index]['r4_SteamID']) &&
                                        (elem['r3_SteamID'] !== results[0][index]['r4_SteamID']) &&
                                        (!assigned.includes(elem['r1_SteamID']))){
                                        
                                        elem['r4_SteamID'] = results[0][index]['r4_SteamID'];
                                        results[0][index]['r4_SteamID'] = element['r1_SteamID'];
                                        assigned.push(elem['r1_SteamID']);
                                        match = true;
                                        break;
                                    }
                                }
                            } else if(assigned.length === results[0].length) {
                                match = true;
                            }
                            break;
                    }
                }
            });//End of forEach
            resolve(results);
        });   
    }

    updateSubmissionInDB(subID, steamID, round, connection){
        return new Promise((resolve, reject) => {
            connection.query('CALL Update_Shuffle_Submission(' + dbpool.escape(subID) + ',' + 
                                        dbpool.escape(steamID) + ',' +
                                        dbpool.escape(round) + ');', (error, results, fields) => {
                resolve(steamID + ' assigned to ' + subID + ' for Round ' + round);
            });
        });
    }
}

export default ServerShuffle;