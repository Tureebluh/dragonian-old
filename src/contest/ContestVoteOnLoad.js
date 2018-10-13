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
                let firstPick = document.querySelector('#firstPick');
                firstPick.appendChild(node);
                document.querySelector('#secondPick').appendChild(node.cloneNode(true));
                document.querySelector('#secondPick').selectedIndex = Math.floor(Math.random() * Math.floor(firstPick.length));
                document.querySelector('#thirdPick').appendChild(node.cloneNode(true));
                document.querySelector('#thirdPick').selectedIndex = Math.floor(Math.random() * Math.floor(firstPick.length));
                document.querySelector('#fourthPick').appendChild(node.cloneNode(true));
                document.querySelector('#fourthPick').selectedIndex = Math.floor(Math.random() * Math.floor(firstPick.length));
                document.querySelector('#fifthPick').appendChild(node.cloneNode(true));
                document.querySelector('#fifthPick').selectedIndex = Math.floor(Math.random() * Math.floor(firstPick.length));
            });
            document.querySelector('#contestIDHidden').value = resJson[0][0].contest_ID;
            document.querySelector('#contestSubmissionContainer').innerHTML = allSubHtml;
        }
    }).catch(error => console.error(error));
    
    document.querySelectorAll('.jump-to-icon').forEach((element)=>{
        element.addEventListener('click', (event) => {
            let tempString = '#contestSubmission' + document.querySelector('#' + event.target.id.toString().replace('Btn','')).value;
            document.querySelector(tempString).scrollIntoView();
        });
    });
}

export default onload;