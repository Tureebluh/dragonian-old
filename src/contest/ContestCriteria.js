class ContestCriteria {
    constructor(contest_criteria, contest_criteria_assoc_ID, contest_criteria_description){
        this._contest_criteria = contest_criteria;
        this._contest_criteria_assoc_ID = contest_criteria_assoc_ID;
        this._contest_criteria_description = contest_criteria_description;
    }

    set contest_criteria(contest_criteria){
        this._contest_criteria = contest_criteria;
    }
    get contest_criteria(){
        return this._contest_criteria;
    }

    set contest_criteria_assoc_ID(contest_criteria_assoc_ID){
        this._contest_criteria_assoc_ID = contest_criteria_assoc_ID;
    }
    get contest_criteria_assoc_ID(){
        return this._contest_criteria_assoc_ID;
    }

    set contest_criteria_description(contest_criteria_description){
        this._contest_criteria_description = contest_criteria_description;
    }
    get contest_criteria_description(){
        return this._contest_criteria_description;
    }

    getTableHeader(){
        let node = document.createElement("TH");
        let textnode = document.createTextNode(this._contest_criteria);
        node.appendChild(textnode);
        return node;
    }
    getListItem(){
        let node = document.createElement("LI");
        let textnode = document.createTextNode(this._contest_criteria_description);
        node.appendChild(textnode);
        return node;
    }
}

export default ContestCriteria;