class ContestSubmission {
    constructor(contest_submission_ID, workshop_URL, personaname, avatarfull, twitchURL) {
        this._contest_submission_ID = contest_submission_ID;
        this._workshop_URL = workshop_URL;
        this._personaname = personaname;
        this._avatarfull = avatarfull;
        this._twitchURL = twitchURL;
    }

    set contest_submission_ID(contest_submission_ID){
        this._contest_submission_ID = contest_submission_ID;
    }
    get contest_submission_ID(){
        return this._contest_submission_ID;
    }

    set workshop_URL(workshop_URL){
        this._workshop_URL = workshop_URL;
    }
    get workshop_URL(){
        return this._workshop_URL;
    }

    set personaname(personaname){
        this._personaname = personaname;
    }
    get personaname(){
        return this._personaname;
    }

    set avatarfull(avatarfull){
        this._avatarfull = avatarfull;
    }
    get avatarfull(){
        return this._avatarfull;
    }

    set twitchURL(twitchURL){
        this._twitchURL = twitchURL;
    }
    get twitchURL(){
        return this._twitchURL;
    }

    getSubmissionDiv(){
        let tempString = "";
        
        tempString += '<table class="contest-submission" id="contestSubmission' + this._contest_submission_ID + '">';
            tempString += '<tr>';
                tempString += '<td><span class="steaminfo"><img src="' + this._avatarfull + '" class="submission-avatar" />&nbsp;' + this._personaname + '</span></td>';
                tempString += '<td><a href="' + this._workshop_URL + '" target="_blank" class="contest-submission-url">View on workshop</td>';
            tempString += '</tr>';
        tempString += '</table>';
        tempString += '<div class="twitch-timestamp"><a href="' + this._twitchURL + '" target="_BLANK"><img alt="Twitch Logo" src="/img/twitch_purple_combo.svg"></a>';
        tempString += '<p>Click the Twitch Logo to watch the live review of this submission.</p></div>';
        return tempString;
    }

    getSubmissionOption(){
        let node = document.createElement("OPTION");
        node.value = this._contest_submission_ID;
        let textnode = document.createTextNode(this._personaname);
        node.appendChild(textnode);
        return node;
    }
}

export default ContestSubmission;