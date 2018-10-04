class JudgeSubmission {
    constructor(contest_submission_IDs, criteriaList) {
        this._contest_submission_IDs = contest_submission_IDs;
        this._criteriaList = criteriaList;
    }

    set contest_submission_IDs(contest_submission_IDs){
        this._contest_submission_IDs = contest_submission_IDs;
    }
    get contest_submission_IDs(){
        return this._contest_submission_IDs;
    }

    set criteriaList(criteriaList){
        this._criteriaList = criteriaList;
    }
    get criteriaList(){
        return this._criteriaList;
    }

    getSubmissionTR(){
        let node = document.createElement("TR");
        let tempTD = document.createElement("TD");
        let tempSelect = document.createElement("SELECT");
        tempSelect.setAttribute("id", "judgeSubmissionID");
        tempSelect.setAttribute("name", "contest_submission_ID");

        this._contest_submission_IDs.forEach((obj)=>{
            let tempOption = document.createElement("OPTION");
            let textnode = document.createTextNode(obj);
            tempOption.appendChild(textnode);
            tempSelect.appendChild(tempOption);
        });

        tempTD.appendChild(tempSelect);
        node.appendChild(tempTD);

        for(let i = 0; i < this._criteriaList.length; i++){
            tempTD = document.createElement("TD");
            let numberInput = document.createElement("INPUT");
            numberInput.setAttribute("id", 'contestCriteria_' + this._criteriaList[i]);
            numberInput.setAttribute("type", "number");
            numberInput.setAttribute("step", '1');
            numberInput.setAttribute("min", '1');
            numberInput.setAttribute("max", '10');
            numberInput.setAttribute("value", '5');
            numberInput.required = true;
            tempTD.appendChild(numberInput);
            node.appendChild(tempTD);
        }
        return node;
    }
}

export default JudgeSubmission;