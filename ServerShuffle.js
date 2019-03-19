import dbpool from './dbpool';
import { triggerAsyncId } from 'async_hooks';

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
                    }
                });
            });
        });
    }

    shuffleWithinHour(){
        // if(typeof this.RoundOneStart !== 'undefined'){
        //     //First Round
        //     if((this.RoundOneStart < Date.now() && this.RoundTwoStart > Date.now()) && (this.RoundTwoStart - Date.now()) < 3600000){
        //         console.log('Shuffle for Round 2');
        //         this.shuffleByRound(2, this.RoundTwoStart - Date.now());
        //     //Second Round
        //     } else if((this.RoundTwoStart < Date.now() && this.RoundThreeStart > Date.now()) && (this.RoundThreeStart - Date.now()) < 3600000){
        //         console.log('Shuffle for Round 3');
        //         this.shuffleByRound(3, this.RoundThreeStart - Date.now());
        //     //Third Round
        //     } else if((this.RoundThreeStart < Date.now() && this.RoundFourStart > Date.now()) && (this.RoundFourStart - Date.now()) < 3600000){
        //         console.log('Shuffle for Round 4');
        //         this.shuffleByRound(4, this.RoundFourStart - Date.now());
        //     }
        // }
        if(typeof this.RoundOneStart !== 'undefined'){
            //First Round
            if(this.RoundOneStart < Date.now() && this.RoundTwoStart > Date.now()){
                console.log('Shuffle for Round 2');
                this.shuffleByRound(2, 2000);
            //Second Round
            } else if(this.RoundTwoStart < Date.now() && this.RoundThreeStart > Date.now()){
                console.log('Shuffle for Round 3');
                this.shuffleByRound(3, 2000);
            //Third Round
            } else if(this.RoundThreeStart < Date.now() && this.RoundFourStart > Date.now()){
                console.log('Shuffle for Round 4');
                this.shuffleByRound(4, 2000);
            }
        }
    }

    //Shuffle pieces for given round
    shuffleByRound(round, timeLeft){
        setTimeout(()=>{
            dbpool.getConnection((err, connection) => {
                if (err) { throw err; }
                connection.query('CALL Get_Submissions_For_Shuffling(' + dbpool.escape(this.Shuffle_ID) + ');', (error, results, fields) => {
                    connection.release();
                    if (error) { throw error; }

                    if (typeof results[0][0] !== 'undefined') {
                        //Create container to hold steamid of submission after it has been assigned a person
                        let assigned = [];
                        let totalIteration = 0;
                        //Loop through each shuffle submission received - element.r1_steamID will be the assigned ID
                        results[0].forEach(element => {
                            let match = false;
                            let index = 0;

                            //Loop until a random submission is selected that element(user) hasn't worked on
                            while(!match){

                                totalIteration++;
                                //Index will randomly select a submission to match
                                index = Math.floor(Math.random()*results[0].length);

                                //Do additional checks for each round. Ensures user never works on the same piece twice
                                //Once a valid submission is randomly selected, user is added to isAssigned
                                switch(round){
                                    case 2:
                                        if(!assigned.includes(results[0][index]['r1_SteamID'])){
                                            if(element['r1_SteamID'] !== results[0][index]['r1_SteamID']){
                                                
                                                results[0][index]['r2_SteamID'] = element['r1_SteamID'];
                                                assigned.push(results[0][index]['r1_SteamID']);
                                                match = true;
                                            }
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
                                }
                            }
                        });//End of forEach
                        console.log('Total iterations: ' + totalIteration);
                        results[0].forEach(element => {
                            console.log(element['shuffle_submission_ID'] + ' : ' + element['r4_SteamID'] + ' for round ' + round);
                        });
                    }
                });
            });
        }, timeLeft);
    }
    updateSubmissionInDB(subID, steamID, round){
        return new Promise((resolve, reject) => {
            dbpool.getConnection((err, connection) => {
                connection.query('CALL Update_Shuffle_Submission(' + dbpool.escape(subID) + ',' + 
                                            dbpool.escape(steamID) + ',' +
                                            dbpool.escape(round) + ');', (error, results, fields) => {
                    connection.release();
                    if (err) { throw err; }
                    resolve(steamID + ' assigned to ' + subID + ' for Round ' + round);
                });
            });
        });
    }
}

export default ServerShuffle;