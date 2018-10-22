import ContestOption from './ContestOption';

var onload = () => {
    const submissionDict = {};
    fetch('/admin/contest/submissions/all', {credentials: 'include'
    }).then(res => {
        return res.json();
    }).then(resJson => {
        let tempSubs = resJson[0];

        tempSubs.forEach(element => {
            submissionDict[''+ element.contest_submission_ID] = element
            let option = new ContestOption(element.contest_submission_ID, element.personaname);
            let node = option.getContestOption();
            document.querySelector('#contestUserName').appendChild(node);
        });
        console.log(submissionDict);
    }).catch(error => console.error(error));


    // let payload = {
    //     contest_submission_ID: document.querySelector('#contestUserName').value
    // };
    // fetch('/admin/contest/submissions/invalid', {
    //     credentials: 'include',
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(payload)
    // }).then(res => {
    //     return res.json();
    // }).then(resJson => {
    //     if(resJson.result === 'Success'){
    //         document.querySelector('#showErrorSuccess').innerHTML = 
    //             '<h1 class="success-notification">Scores successfully recorded for submission ID #' + payload.contest_submission_ID + '</h1>';
    //     } else {
    //         document.querySelector('#showErrorSuccess').innerHTML = 
    //             '<h1 class="error-notification">Error recording scores for submission ID #' + payload.contest_submission_ID + '</h1>';
    //     }
    //     setTimeout(()=>{
    //         document.querySelector('#showErrorSuccess').innerHTML = "";
    //     }, 10000);
    // }).catch(error => console.error(error));
}

export default onload;