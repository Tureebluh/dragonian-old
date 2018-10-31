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
    timerDiv(){
        let tempString = '';

        if(this.RoundOneStart < Date.now() && this.RoundTwoStart > Date.now()){
            let hours = ((((this.RoundTwoStart - this.RoundOneStart) / 1000) / 60) / 60);
            tempString += hours + ' hours left to submit to this round!';
        } else if(this.RoundTwoStart < Date.now() && this.RoundThreeStart > Date.now()){
            
            
        } else if(this.RoundThreeStart < Date.now() && this.RoundFourStart > Date.now()){

        } else if(this.RoundFourStart < Date.now() && this.RoundThreeStart > Date.now()){
            
        }

        return tempString;
    }
    workshopDiv(){
        let tempString = '';

        if(this.RoundOneStart < Date.now() && this.RoundTwoStart > Date.now()){

        } else if(this.RoundTwoStart < Date.now() && this.RoundThreeStart > Date.now()){
            
            
        } else if(this.RoundThreeStart < Date.now() && this.RoundFourStart > Date.now()){

        } else if(this.RoundFourStart < Date.now() && this.RoundThreeStart > Date.now()){
            
        }

        return tempString;
    }
    submissionDiv(){
        let tempString = "";
            tempString += '<h2 id="submissionHeader">Shuffle Entry</h2>';
            tempString += '<form action="/api/shuffle/submit/" method="post" class="contestSubmissionForm">';
                tempString += '<input type="hidden" id="shuffleIDHidden" name="shuffleID">';
                tempString += '<input type="hidden" id="roundOne" name="roundOne">';
                tempString += '<input type="hidden" id="roundTwo" name="roundTwo">';
                tempString += '<input type="hidden" id="roundThree" name="roundThree">';
                tempString += '<input type="hidden" id="roundFour" name="roundFour">';
                tempString += '<input type="url" id="submissionURL" name="submissionURL" placeholder="https://steamcommunity.com/sharedfiles/filedetails/?id=XXXXXXXXXX" required/>';
                tempString += '<br>';
                tempString += '<br>';
                tempString += '<span>';
                    tempString += '<input type="checkbox" id="verifySubmissionCB" name="verifySubmissionCB" required> By ticking this box and clicking the button("Submit Entry"), I agree and acknowledge that this is my own work';
                    tempString += ' and is associated with this Steam&#174; account. Violating these terms will result in the immediate and irrevocable termination of my privileges on this website.<br>';
                    tempString += '<br>';
                    tempString += '<input type="submit" id="submitShuffleUser" alt="Submit To Shuffle" value="Submit Entry">';
                tempString += '</span>';
            tempString += '</form>';
        return tempString;
    }

}

export default Shuffle;