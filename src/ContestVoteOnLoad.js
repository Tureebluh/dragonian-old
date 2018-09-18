import ContestSubmission from './ContestSubmission';

var onload = () => {
    fetch('/api/contest/submissions', {credentials: 'include'})
    .then(res =>{
        return res.json();
        //Return res in JSON form to next then()
    }).then(resJson =>{
        if(typeof resJson[0][0] !== 'undefined'){
            let allSubRes = resJson[0];
            let allSubHtml = '<h1>Submissions</h1>';
            allSubRes.forEach(submission => {
                let tempSub = new ContestSubmission(
                    submission.contest_submission_ID,
                    submission.workshop_URL,
                    submission.personaname,
                    submission.avatarfull
                );
                allSubHtml += tempSub.getSubmissionDiv();
                let node = tempSub.getSubmissionOption();
                document.querySelector('#firstPick').appendChild(node);
                document.querySelector('#secondPick').appendChild(node.cloneNode(true));
                document.querySelector('#thirdPick').appendChild(node.cloneNode(true));
                document.querySelector('#fourthPick').appendChild(node.cloneNode(true));
                document.querySelector('#fifthPick').appendChild(node.cloneNode(true));
            });
            document.querySelector('#contestSubmissionContainer').innerHTML = allSubHtml;
        }
    }).catch(error => console.error(error));    
}

export default onload;