class JudgeSubmission {
    constructor(contest_submission_ID, criteriaList) {
        this._contest_submission_ID = contest_submission_ID;
        this._criteriaList = criteriaList;
    }

    set contest_submission_ID(contest_submission_ID){
        this._contest_submission_ID = contest_submission_ID;
    }
    get contest_submission_ID(){
        return this._contest_submission_ID;
    }

    set criteriaList(criteriaList){
        this._criteriaList = criteriaList;
    }
    get criteriaList(){
        return this._criteriaList;
    }

    getSubmissionTR(){
        let node = document.createElement("TR");
        node.setAttribute("ID", this._contest_submission_ID);

        let tempTD = document.createElement("TD");
        let textNode = document.createTextNode(this._contest_submission_ID);
        tempTD.appendChild(textNode);
        node.appendChild(tempTD);

        for(let i = 0; i < this._criteriaList.length; i++){
            tempTD = document.createElement("TD");
            let numberInput = document.createElement("INPUT");
            numberInput.setAttribute("id", this._criteriaList[i]);
            numberInput.setAttribute("type", "number");
            numberInput.setAttribute("step", '0.5');
            numberInput.setAttribute("min", '1');
            numberInput.setAttribute("max", '5');
            numberInput.setAttribute("value", '3');
            numberInput.required = true;
            tempTD.appendChild(numberInput);
            node.appendChild(tempTD);
        }

        return node;
    }
}

export default JudgeSubmission;