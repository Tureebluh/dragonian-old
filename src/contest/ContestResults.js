class ContestResults {
    constructor(contestSubmissionID, votersActual, votersMax, judgeMax,  judgesActual, personaname, avatarfull, workshop_URL){
        this._contestSubmissionID = contestSubmissionID;
        this._votersActual = votersActual;
        this._votersMax = votersMax;
        this._judgesMax = judgeMax;
        this._judgesActual = judgesActual;
        this._workshop_URL = workshop_URL;
        this._personaname = personaname;
        this._avatarfull = avatarfull;
        this._finalScore = Math.round((parseInt(this._judgesActual, 10) * (parseInt(this._votersMax, 10) / parseInt(this._judgesMax, 10)) + parseInt(this._votersActual, 10)) * 100) / 100;
    }

    set contestSubmissionID(contestSubmissionID){
        this._contestSubmissionID = contestSubmissionID;
    }
    get contestSubmissionID(){
        return this._contestSubmissionID;
    }

    set votersActual(votersActual){
        this._votersActual = votersActual;
    }
    get votersActual(){
        return this._votersActual;
    }

    set votersMax(votersMax){
        this._votersMax = votersMax;
    }
    get votersMax(){
        return this._votersMax;
    }

    set judgeMax(judgeMax){
        this._judgesMax = judgeMax;
    }
    get judgeMax(){
        return this._judgesMax;
    }

    set actualVotes(actualVotes){
        this._actualVotes = actualVotes;
    }
    get actualVotes(){
        return this._actualVotes;
    }

    set judgesActual(judgesActual){
        this._judgesActual = judgesActual;
    }
    get judgesActual(){
        return this._judgesActual;
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

    set finalScore(finalScore){
        this._finalScore = finalScore;
    }
    get finalScore(){
        return this._finalScore;
    }

    getResultTR(){
        let node = document.createElement("TR");
        let tempTD = document.createElement("TD");

        tempTD.innerHTML = '<span><img src="' + this._avatarfull + '"/>' +  this._personaname + '</span>'
        node.appendChild(tempTD);

        tempTD = document.createElement("TD");
        tempTD.innerHTML = '<a href="' + this._workshop_URL + '" target="_BLANK">Workshop Link</a>';
        node.appendChild(tempTD);

        tempTD = document.createElement("TD");
        tempTD.innerHTML = this._judgesActual;
        node.appendChild(tempTD);

        tempTD = document.createElement("TD");
        tempTD.innerHTML = this._votersActual;
        node.appendChild(tempTD);

        tempTD = document.createElement("TD");
        tempTD.innerHTML = this._finalScore;
        node.appendChild(tempTD);

        return node;
    }
}

export default ContestResults;