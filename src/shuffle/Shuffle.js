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
            tempString += "<img style=\"max-width: 35%\" src='img/cute_dragon_blue.svg'/>";
            tempString += "<br>";
        tempString += "</div>";
        tempString += "<br>";
        tempString += "<div class=\"Description\">" + this._Description + "</div>";
        tempString += "<br>";
        return tempString;
    }

    timerDiv(){
        let tempString = '<h2 id="timeRemaining"><strong>';
        //First Round
        if(this.RoundOneStart < Date.now() && this.RoundTwoStart > Date.now()){       //ms    //secs
            let totalSecs = parseInt((this.RoundTwoStart - Date.now()) / 1000);

            let daysLeft = parseInt(totalSecs / 86400);
            totalSecs = parseInt(totalSecs % 86400);

            let hoursLeft = parseInt(totalSecs / 3600);
            totalSecs = parseInt(totalSecs % 3600);

            let minsLeft = parseInt(totalSecs / 60);
            totalSecs = parseInt(totalSecs % 60);

            let secsLeft = parseInt(totalSecs);


            let timeString = '<span class="yellow">' + daysLeft + '</span>' + ' day(s) ' + '<span class="yellow">' + hoursLeft +
                             '</span>' + ' hour(s) ' + '<span class="yellow">' + minsLeft + '</span>' + ' minute(s) ' + '<span class="yellow">' + secsLeft + '</span> second(s) ';
            tempString += timeString + '<br>left in Round 1!</h2></strong>';
        
        //Second Round
        } else if(this.RoundTwoStart < Date.now() && this.RoundThreeStart > Date.now()){
            let totalSecs = parseInt((this.RoundThreeStart - Date.now()) / 1000);


            let daysLeft = parseInt(totalSecs / 86400);
            totalSecs = parseInt(totalSecs % 86400);

            let hoursLeft = parseInt(totalSecs / 3600);
            totalSecs = parseInt(totalSecs % 3600);

            let minsLeft = parseInt(totalSecs / 60);
            totalSecs = parseInt(totalSecs % 60);

            let secsLeft = parseInt(totalSecs);

            let timeString = '<span class="yellow">' + daysLeft + '</span>' + ' day(s) ' + '<span class="yellow">' + hoursLeft +
                             '</span>' + ' hour(s) ' + '<span class="yellow">' + minsLeft + '</span>' + ' minute(s) ' + '<span class="yellow">' + secsLeft + '</span> second(s) ';
            tempString += timeString + '<br>left in Round 2!</h2></strong>';
        
        //Third Round
        } else if(this.RoundThreeStart < Date.now() && this.RoundFourStart > Date.now()){
            let totalSecs = parseInt((this.RoundFourStart - Date.now()) / 1000);


            let daysLeft = parseInt(totalSecs / 86400);
            totalSecs = parseInt(totalSecs % 86400);

            let hoursLeft = parseInt(totalSecs / 3600);
            totalSecs = parseInt(totalSecs % 3600);

            let minsLeft = parseInt(totalSecs / 60);
            totalSecs = parseInt(totalSecs % 60);

            let secsLeft = parseInt(totalSecs);

            let timeString = '<span class="yellow">' + daysLeft + '</span>' + ' day(s) ' + '<span class="yellow">' + hoursLeft +
                             '</span>' + ' hour(s) ' + '<span class="yellow">' + minsLeft + '</span>' + ' minute(s) ' + '<span class="yellow">' + secsLeft + '</span> second(s) ';
            tempString += timeString + '<br>left in Round 3!</h2></strong>';
        
        //Final Round
        } else if(this.RoundFourStart < Date.now() && this.EndDate > Date.now()){
            let totalSecs = parseInt((this.EndDate - Date.now()) / 1000);

            let daysLeft = parseInt(totalSecs / 86400);
            totalSecs = parseInt(totalSecs % 86400);

            let hoursLeft = parseInt(totalSecs / 3600);
            totalSecs = parseInt(totalSecs % 3600);

            let minsLeft = parseInt(totalSecs / 60);
            totalSecs = parseInt(totalSecs % 60);

            let secsLeft = parseInt(totalSecs);

            let timeString = '<span class="yellow">' + daysLeft + '</span>' + ' day(s) ' + '<span class="yellow">' + hoursLeft +
                             '</span>' + ' hour(s) ' + '<span class="yellow">' + minsLeft + '</span>' + ' minute(s) ' + '<span class="yellow">' + secsLeft + '</span> second(s) ';
            tempString += timeString + '<br>left in Round 4!</h2></strong>';
        }

        return tempString;
    }
    previousDiv(){
        if(this.RoundThreeStart < Date.now() && this.EndDate > Date.now()){

            let tempString = '<h1>Previous Rounds</h1>';

            let payload = {
                shuffleID: this._Shuffle_ID
            };
            fetch('/api/shuffle/previous/', {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }).then(res => {
                return res.json();
            }).then(resJson => {
                if(typeof resJson[0][0] !== 'undefined'){
                    resJson[0].forEach(element => {
                        if(this.RoundThreeStart < Date.now() && this.RoundFourStart > Date.now()){
                            tempString += '<a target="_BLANK" href="';
                            tempString += resJson[0][0]['r1_workshop_URL'] + '">Round 1';
                            tempString += ' - Click Here</a>';
                            tempString += '<br><br>';

                            tempString += '<a target="_BLANK" href="';
                            tempString += resJson[0][0]['r2_workshop_URL'] + '">Round 2';
                            tempString += ' - Click Here</a>';
                            tempString += '<br><br>';

                        } else if(this.RoundFourStart < Date.now() && this.EndDate > Date.now()){
                            tempString += '<a target="_BLANK" href="';
                            tempString += resJson[0][0]['r1_workshop_URL'] + '">Round 1';
                            tempString += ' - Click Here</a>';
                            tempString += '<br><br>';

                            tempString += '<a target="_BLANK" href="';
                            tempString += resJson[0][0]['r2_workshop_URL'] + '">Round 2';
                            tempString += ' - Click Here</a>';
                            tempString += '<br><br>';

                            tempString += '<a target="_BLANK" href="';
                            tempString += resJson[0][0]['r3_workshop_URL'] + '">Round 3';
                            tempString += ' - Click Here</a>';
                            tempString += '<br><br>';
                        }
                    });
                    document.querySelector('#previousLinks').innerHTML = tempString;
                    document.querySelector('#previousLinks').classList.toggle('hidden');
                }
            }).catch(error => console.error(error));
        }
    }
    workshopDiv(){
        if(this.RoundTwoStart < Date.now() && this.EndDate > Date.now()){
            let tempString = '<h1>Current Round</h1>';

            let payload = {
                shuffleID: this._Shuffle_ID
            };
            fetch('/api/shuffle/getpick/', {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }).then(res => {
                return res.json();
            }).then(resJson => {
                if(resJson.results === 'Success'){
                    payload = {
                        shuffleID: this._Shuffle_ID
                    };
                    fetch('/api/shuffle/workshop/random', {
                        credentials: 'include',
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    }).then(res => {
                        return res.json();
                    }).then(resJson => {
                        if(typeof resJson[0][0] !== 'undefined'){

                            tempString += '<a id="randomShuffleURL" target="_BLANK" href="';

                            if(this.RoundOneStart < Date.now() && this.RoundTwoStart > Date.now()){
                                
                            } else if(this.RoundTwoStart < Date.now() && this.RoundThreeStart > Date.now()){
                                tempString += resJson[0][0]['r1_workshop_URL'] + '">';
                            } else if(this.RoundThreeStart < Date.now() && this.RoundFourStart > Date.now()){
                                tempString += resJson[0][0]['r2_workshop_URL'] + '">';
                            } else if(this.RoundFourStart < Date.now() && this.EndDate > Date.now()){
                                tempString += resJson[0][0]['r3_workshop_URL'] + '">';
                            }

                            tempString += 'Random Link - Click Here</a>';
                            tempString += '<br><br>';
                            tempString += '<div class="report-user"><img id="reportShuffle" class="report-flag" style="height: 2rem;" src="img/flag.svg" /><br>Report User</div>';

                            document.querySelector('#workshopLink').innerHTML = tempString;
                            document.querySelector('#workshopLink').classList.toggle('hidden');

                            document.querySelector('.report-user').addEventListener('click', (event) => {
                                let res = confirm('Does the blueprint violate one of the posted RULES?');
                                if(res){
                                    payload = {
                                        submissionURL: document.querySelector('#randomShuffleURL').href
                                    };
                                    fetch('/api/shuffle/report', {
                                        credentials: 'include',
                                        method: 'POST',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(payload)
                                    }).then(res => {
                                        return res.json();
                                    }).then(resJson => {
                                            if(resJson.result === 'Success'){
                                                document.querySelector('#showErrorSuccess').innerHTML = 
                                                        '<h1 class="success-notification">Report submitted successfully. Thank you for helping keep the community amazing!</h1>';
                                                        window.location.hash = '#showErrorSuccess';
                                            } else {
                                                document.querySelector('#showErrorSuccess').innerHTML = 
                                                        '<h1 class="success-notification">Report failed to submit. Please contact an administrator if the problem persist.</h1>';
                                                        window.location.hash = '#showErrorSuccess';
                                            }
                                    }).catch(error => console.error(error));
                                }
                            });
                        }
                    }).catch(error => console.error(error));
                }
            }).catch(error => console.error(error));
        }
    }

    submissionDiv(){
        let tempString = "";
            tempString += '<h1 id="submissionHeader">Shuffle Entry</h1>';
            tempString += '<form action="/api/shuffle/submit/" method="post" class="contestSubmissionForm">';
                tempString += '<input type="hidden" id="shuffleIDHidden" name="shuffleID">';
                tempString += '<input type="url" id="submissionURL" name="submissionURL" placeholder="Type/paste your workshop link here" required/>';
                tempString += '<br>';
                tempString += '<br>';
                tempString += '<span>';
                    tempString += '<input type="checkbox" id="verifySubmissionCB" name="verifySubmissionCB" class="reg-checkbox" required> By ticking this box and clicking the button("Submit Entry"), I agree and acknowledge that this is my own work';
                    tempString += ' and is associated with this Steam&#174; account.<br>Violating these terms will result in the immediate and irrevocable termination of my privileges on this website.<br>';
                    tempString += '<br>';
                    tempString += '<input type="submit" id="submitShuffleUser" alt="Submit To Shuffle" value="Submit Entry">';
                tempString += '</span>';
            tempString += '</form>';
        return tempString;
    }
}

export default Shuffle;