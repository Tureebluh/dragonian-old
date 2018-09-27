import ContestCriteria from './ContestCriteria';

var onload = () => {
    if(document.querySelector('#judgeTable') !== null){

        fetch('/api/contest/judge/criteria', {credentials: 'include'})
        .then(res => {
            return res.json();
            //Return res in JSON form to next then()
        }).then(resJson =>{
            resJson[0].forEach((obj) => {
                let tempCriteria = new ContestCriteria(
                    obj.contest_criteria,
                    obj.contest_criteria_assoc_ID,
                    obj.contest_criteria_description
                );
                document.querySelector('#judgeTable').appendChild(tempCriteria.getTableHeader());
                document.querySelector('#judgingRubric').appendChild(tempCriteria.getListItem());
            });
        }).catch(error => console.error(error));

        fetch('/api/contest/judge/topsub', {credentials: 'include'})
        .then(res =>{
            return res.json();
            //Return res in JSON form to next then()
        }).then(resJson =>{
            console.log(resJson.result);
        }).catch(error => console.error(error));
    }
}

export default onload;