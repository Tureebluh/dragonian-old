class ContestSubmission {
    constructor(contest_submission_ID, workshop_URL, personaname, avatarfull) {
        this._contest_submission_ID = contest_submission_ID;
        this._workshop_URL = workshop_URL;
        this._personaname = personaname;
        this._avatarfull = avatarfull;
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

    contestSubmissionDiv(){
        let tempString = "";

        

        return tempString;
    }
}