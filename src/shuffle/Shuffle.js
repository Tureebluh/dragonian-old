class Shuffle {
    constructor(Shuffle_ID, Name, RoundOneStart, RoundTwoStart, RoundThreeStart, RoundFourStart, EndDate, Description) {
        this._Shuffle_ID = Shuffle_ID;
        this._Name = Name;
        this._RoundOneStart = RoundOneStart;
        this._RoundTwoStart = RoundTwoStart;
        this._RoundThreeStart = RoundThreeStart;
        this._RoundFourStart = RoundFourStart;
        this._EndDate = EndDate;
        this._Description = Description;
    }

    set Name(Name){
        this._Name = Name;
    }
    get Name(){
        return this._Name;
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

    set Description(Description){
        this._Description = Description;
    }
    get Description(){
        return this._Description;
    }

    //Builds Div using object
    activeDiv(){
        let tempString = "";
        tempString += "<div class=\"shuffle-banner-container\">";
            tempString += "<div class=\"Name\"><h1>" + this._Name + "</h1></div>";
            tempString += "<img src='img/contest_banner.png'/>";
            tempString += "<br>";
        tempString += "</div>";
        tempString += "<br>";
        tempString += "<div class=\"Description\"><h2>Summary</h2>" + this._Description + "</div>";
        tempString += "<br>";
        return tempString;
    }
    entryOrVote(){
        if(this.VoteStartDate < Date.now()){
            let tempString = '';
                tempString += '<form action="/contest/vote/" method="get" class="contestVotingForm">';
                    tempString += '<input type="hidden" id="contestIDHidden" name="contestID">';
                    tempString += '<input type="submit" alt="Go To Voting Page" value="Vote On Contest">';
                tempString += '</form>';
            return tempString;

        } else if(this.submitted !== 1 && this.SubmissionEndDate > Date.now()){
            let tempString = "";
            tempString += '<h2 id="submissionHeader">Contest Entry</h2>';
            tempString += '<form action="/api/contest/submit/" method="post" class="contestSubmissionForm">';
                tempString += '<input type="hidden" id="contestIDHidden" name="contestID">';
                tempString += '<input type="url" id="submissionURL" name="submissionURL" placeholder="https://steamcommunity.com/sharedfiles/filedetails/?id=XXXXXXXXXX" required/>';
                tempString += '<br>';
                tempString += '<br>';
                tempString += '<span>';
                    tempString += '<input type="checkbox" id="verifySubmissionCB" name="verifySubmissionCB" required> By ticking this box and clicking the button("Submit Entry"), I agree and acknowledge that this is my own work';
                    tempString += ' and is associated with this Steam&#174; account. Violating these terms will result in the immediate and irrevocable termination of my privileges on this website.<br>';
                    tempString += '<br>';
                    tempString += '<input type="submit" id="submitContestUser" alt="Submit To Contest" value="Submit Entry">';
                tempString += '</span>';
            tempString += '</form>';
            return tempString;
            
        } else if(this.submitted === 1 && this.SubmissionEndDate > Date.now()){
            let tempString = "";
            tempString += '<h2 id="submissionHeader" class="success-notification">Awesome!<br>We have your submission!</h2>';
            tempString += '<input type="hidden" id="contestIDHidden" name="contestID">';
            return tempString;
        } else if(this.SubmissionEndDate < Date.now() && this.VoteStartDate > Date.now()){
            let tempString = "";
            tempString += '<input type="hidden" id="contestIDHidden" name="contestID">';
            let hoursUntil = Math.round((((this.VoteStartDate.getTime() - Date.now()) / 1000) / 60) / 60);
            if(hoursUntil > 0){
                hoursUntil += ' hour(s)';
            } else {
                hoursUntil = Math.round(((this.VoteStartDate.getTime() - Date.now()) / 1000) / 60) + ' minute(s)';
            }
            tempString += '<h2 id="submissionHeader">Community voting for this contest will begin in ' + hoursUntil + '.<br>Be sure to check out the stream to see all the contest submissions before the voting goes live!</h2>';
            tempString += '<a href="https://www.twitch.tv/r3ddragons" target="_blank"><img src="img/twitch_purple_combo.svg"></a>';
            return tempString;
        }
    }
}

export default Shuffle;