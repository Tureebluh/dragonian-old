import ContestCriteria from './ContestCriteria';
import JudgeSubmission from './ContestJudgeSubmission';

const onload = () => {
    if(document.querySelector('#judgeTable') !== null){
        fetch('/api/contest/judge/criteria', {credentials: 'include'})
        .then(res => {
            return res.json();
            //Return res in JSON form to next then()
        }).then(resJson =>{
            let tempNode = document.createElement("TR");
            tempNode.setAttribute("ID", "tableHeaders");
            document.querySelector('#judgeTable').appendChild(tempNode);

            tempNode = document.createElement("TH");
            let textnode = document.createTextNode('ID');
            tempNode.appendChild(textnode);
            document.querySelector('#tableHeaders').appendChild(tempNode);
            let criteriaList = [];
            resJson[0].forEach((obj) => {
                let tempCriteria = new ContestCriteria(
                    obj.contest_criteria,
                    obj.contest_criteria_assoc_ID,
                    obj.contest_criteria_description
                );
                criteriaList.push(obj.contest_criteria_assoc_ID);
                document.querySelector('#contestIDHidden').value = obj.contest_ID;
                document.querySelector('#tableHeaders').appendChild(tempCriteria.getTableHeader());
                document.querySelector('#judgingRubric').appendChild(tempCriteria.getListItem());
            });
            return {'criteriaList': criteriaList};
        }).then((criteriaObj)=>{
            fetch('/api/contest/judge/topsubs', {credentials: 'include'})
            .then(res =>{
                return res.json();
                //Return res in JSON form to next then()
            }).then(resJson =>{
                let submissionIDs = [];
                resJson[0].forEach((obj) => {
                    submissionIDs.push(obj.contest_submission_ID);
                });
                
                let judgeSubmission = new JudgeSubmission(
                    submissionIDs,
                    criteriaObj.criteriaList
                );
                document.querySelector('#judgeTable').appendChild(judgeSubmission.getSubmissionTR());

                let node = document.createElement("INPUT");
                node.setAttribute("id", "submitScores");
                node.setAttribute("type", "submit");
                node.setAttribute("value", "Submit Scores");
                document.querySelector('#submitBtnContainer').appendChild(node);

                document.querySelector('#submitScores').addEventListener('click', (event)=>{
                    if(!document.querySelector('#judgeSubmitForm').checkValidity()){
                        return;
                    } else {
                        event.preventDefault();
                        let payload = {
                            contestID: document.querySelector('#contestIDHidden').value,
                            contest_submission_ID: document.querySelector('#judgeSubmissionID').value
                        };

                        criteriaObj.criteriaList.forEach(element => {
                            payload['contestCriteria_' + element] = document.querySelector('#contestCriteria_' + element).value;
                        });
                        
                        fetch('/api/contest/judge/submit', {
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
                                    '<h1 class="success-notification">Scores successfully recorded for submission ID #' + payload.contest_submission_ID + '</h1>';
                            } else {
                                document.querySelector('#showErrorSuccess').innerHTML = 
                                    '<h1 class="error-notification">Error recording scores for submission ID #' + payload.contest_submission_ID + '</h1>';
                            }
                            setTimeout(()=>{
                                document.querySelector('#showErrorSuccess').innerHTML = "";
                            }, 10000);
                        }).catch(error => console.error(error));
                    }
                });
            }).catch(error => console.error(error));
        }).catch(error => console.error(error));
    }
}

export default onload;