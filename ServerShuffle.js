import dbpool from './dbpool';

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
        if(typeof this.RoundOneStart !== 'undefined'){
            //First Round
            if((this.RoundOneStart < Date.now() && this.RoundTwoStart > Date.now()) && (this.RoundTwoStart - Date.now()) < 3600000){
                console.log('Shuffle for Round 2');
                this.shuffleByRound(2, this.RoundTwoStart - Date.now());
            //Second Round
            } else if((this.RoundTwoStart < Date.now() && this.RoundThreeStart > Date.now()) && (this.RoundThreeStart - Date.now()) < 3600000){
                console.log('Shuffle for Round 3');
                this.shuffleByRound(3, this.RoundThreeStart - Date.now());
            //Third Round
            } else if((this.RoundThreeStart < Date.now() && this.RoundFourStart > Date.now()) && (this.RoundFourStart - Date.now()) < 3600000){
                console.log('Shuffle for Round 4');
                this.shuffleByRound(4, this.RoundFourStart - Date.now());
            }
        }
    }

    shuffleByRound(round, timeLeft){
        let subDict = {};
        console.log('Round ' + round + ' time left: ' + timeLeft);
        setTimeout(()=>{
            dbpool.getConnection((err, connection) => {
                if (err) { throw err; }
                connection.query('CALL Get_Submissions_For_Shuffling(' + dbpool.escape(this.Shuffle_ID) + ');', (error, results, fields) => {
                    connection.release();
                    if (error) { throw error; }
                    if (typeof results[0][0] !== 'undefined') {
                        results[0].forEach(element => {
                            subDict[element['shuffle_submission_ID']] = element;
                        });
                    }
                    console.log(subDict);
                });
            });
        }, 20000);
    }
}

export default ServerShuffle;