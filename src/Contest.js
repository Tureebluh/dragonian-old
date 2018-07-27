class Contest {
    constructor(contest_ID, Name, SubmissionStartDate, SubmissionEndDate, VoteStartDate, VoteEndDate, Description, rules) {
        this._contest_ID = contest_ID;
        this._Name = Name;
        this._SubmissionStartDate = SubmissionStartDate;
        this._SubmissionEndDate = SubmissionEndDate;
        this._VoteStartDate = VoteStartDate;
        this._VoteEndDate = VoteEndDate;
        this._Description = Description;
        this._rules = rules;
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
    //Builds Contest Div using object
    activeContestDiv(){
        let tempString = "";
        tempString += "<div class=\"Name\"><h1>" + this._Name + "</h1></div>";
        tempString += "<br>";
        tempString += "<div class=\"sml-container\">";
            tempString += "<span class=\"SubmissionStartDate\"><h2>Start</h2>" + this._SubmissionStartDate.toLocaleString() + "</span>";
            tempString += "<span class=\"SubmissionEndDate\"><h2>End</h2>" + this._SubmissionEndDate.toLocaleString() + "</span>";
        tempString += "</div>";
        tempString += "<br>";
        tempString += "<div class=\"sml-container\">";
            tempString += "<span class=\"VoteStartDate\"><h2>Vote Start</h2>" + this._VoteStartDate.toLocaleString() + "</span>";
            tempString += "<span class=\"VoteEndDate\"><h2>Vote End</h2>" + this._VoteEndDate.toLocaleString() + "</span>";
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
}

export default Contest;