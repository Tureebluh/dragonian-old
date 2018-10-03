import ContestCriteria from './ContestCriteria';
import JudgeSubmission from './JudgeSubmission';

var onload = () => {
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
                resJson[0].forEach((obj) => {
                    let tempSub = new JudgeSubmission(
                        obj.contest_submission_ID,
                        criteriaObj.criteriaList
                    );
                    document.querySelector('#judgeTable').appendChild(tempSub.getSubmissionTR());
                });
            }).catch(error => console.error(error));
        }).catch(error => console.error(error));
    }
}

export default onload;