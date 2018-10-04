class ContestCriteriaOption {
    constructor(contest_criteria_ID, contest_criteria){
        this._contest_criteria_ID = contest_criteria_ID;
        this._contest_criteria = contest_criteria;
    }

    set contest_criteria(contest_criteria){
        this._contest_criteria = contest_criteria;
    }
    get contest_criteria(){
        return this._contest_criteria;
    }

    set contest_criteria_ID(contest_criteria_ID){
        this._contest_criteria_ID = contest_criteria_ID;
    }
    get contest_criteria_ID(){
        return this._contest_criteria_ID;
    }

    getCriteriaOption(){
        let node = document.createElement("OPTION");
        node.value = this._contest_criteria_ID;
        let textnode = document.createTextNode(this._contest_criteria);
        node.appendChild(textnode);
        return node;
    }
}

export default ContestCriteriaOption;