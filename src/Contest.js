class Contest {
    constructor(contest_ID, Name, SubmissionStartDate, SubmissionEndDate, VoteStartDate, VoteEndDate, Description, rules, submitted) {
        this._contest_ID = contest_ID;
        this._Name = Name;
        this._SubmissionStartDate = SubmissionStartDate;
        this._SubmissionEndDate = SubmissionEndDate;
        this._VoteStartDate = VoteStartDate;
        this._VoteEndDate = VoteEndDate;
        this._Description = Description;
        this._rules = rules;
        this._submitted = submitted;
    }

    set Name(Name){
        this._Name = Name;
    }
    get Name(){
        return this._Name;
    }

    set contest_ID(contest_ID){
        this._contest_ID = contest_ID;
    }
    get contest_ID(){
        return this._contest_ID;
    }

    set SubmissionStartDate(SubmissionStartDate){
        this._SubmissionStartDate = SubmissionStartDate;
    }
    get SubmissionStartDate(){
        return this._SubmissionStartDate;
    }

    set SubmissionEndDate(SubmissionEndDate){
        this._SubmissionEndDate = SubmissionEndDate;
    }
    get SubmissionEndDate(){
        return this._SubmissionEndDate;
    }

    set VoteStartDate(VoteStartDate){
        this._VoteStartDate = VoteStartDate;
    }
    get VoteStartDate(){
        return this._VoteStartDate;
    }

    set VoteEndDate(VoteEndDate){
        this._VoteEndDate = VoteEndDate;
    }
    get VoteEndDate(){
        return this._VoteEndDate;
    }

    set Description(Description){
        this._Description = Description;
    }
    get Description(){
        return this._Description;
    }

    set rules(rules){
        this._rules = rules;
    }
    get rules(){
        return this._rules;
    }

    set submitted(submitted){
        this._submitted = submitted;
    }
    get submitted(){
        return this._submitted;
    }

    //Builds Contest Div using object
    activeContestDiv(){
        let tempString = "";
        tempString += "<div class=\"contest-banner-container\">";
            tempString += "<div class=\"Name\"><h1>" + this._Name + "</h1></div>";
            tempString += "<br>";
            tempString += "<div class=\"sml-container\">";
                tempString += "<span class=\"SubmissionStartDate\"><h2>Start</h2>" + this._SubmissionStartDate.toString() + "</span>";
                tempString += "<span class=\"SubmissionEndDate\"><h2>End</h2>" + this._SubmissionEndDate.toString() + "</span>";
            tempString += "</div>";
            tempString += "<br>";
            tempString += "<div class=\"sml-container\">";
                tempString += "<span class=\"VoteStartDate\"><h2>Vote Start</h2>" + this._VoteStartDate.toString() + "</span>";
                tempString += "<span class=\"VoteEndDate\"><h2>Vote End</h2>" + this._VoteEndDate.toString() + "</span>";
            tempString += "</div>";
        tempString += "</div>";
        tempString += "<br>";
        tempString += "<div class=\"Description\"><h2>Summary</h2>" + this._Description + "</div>";
        tempString += "<br>";
        tempString += "<h1>Rules</h1>";
        tempString += "<div id=\"rulesDiv\">";
        if(this._rules !== null){
            this._rules.forEach(tempRule => {
                tempString += "<div class=\"rule\">&bull; " + tempRule.rule + "</div>";
            });
        }
        tempString += "</div>";
        tempString += "<br>";
        return tempString;
    }
    entryOrVote(){
        if(this._VoteStartDate < Date.now()){
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
        } else {
            let tempString = "";
            tempString += '<input type="hidden" id="contestIDHidden" name="contestID">';
            let hoursUntil = Math.round((((this._VoteStartDate.getTime() - Date.now()) / 1000) / 60) / 60);
            tempString += '<h2 id="submissionHeader">Community voting for this contest will begin in ' + hoursUntil + ' hours.<br>Be sure to check out the stream to see all the contest submissions before the voting goes live!</h2>';
            tempString += '<a href="https://www.twitch.tv/r3ddragons" target="_blank"><img src="img/twitch_purple_combo.svg"></a>';
            return tempString;
        }
    }
}

export default Contest;