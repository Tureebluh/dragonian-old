import Contest from './Contest';

var onload = () => {
    //If user is on contest page, load the oldest active contest and pull all rules associated with that contest. Store all info in an object and call
    //call provided function to create HTML visual of data
    //NOTE: Cookies are not sent with fetch() by default, therefore {credentials} are supplied to server to authenticate fetch() request
    fetch('/api/contest/all/active', {credentials: 'include'})
    .then(res =>{
        return res.json();
        //Return res in JSON form to next then()
    }).then(resJson =>{
        if(typeof resJson[0][0] !== 'undefined'){
            let subStart = new Date(resJson[0][0].SubmissionStartDate);
            let offset = 7;
            subStart.setHours(subStart.getHours() - offset);

            let subEnd = new Date(resJson[0][0].SubmissionEndDate);
            subEnd.setHours(subEnd.getHours() - offset);

            let voteStart = new Date(resJson[0][0].VoteStartDate);
            voteStart.setHours(voteStart.getHours() - offset);

            let voteEnd = new Date(resJson[0][0].VoteEndDate);
            voteEnd.setHours(voteEnd.getHours() - offset);

            let activeContest = new Contest(
                resJson[0][0].contest_ID,
                resJson[0][0].Name,
                subStart,
                subEnd,
                voteStart,
                voteEnd,
                resJson[0][0].Description,
                null
            );
            return activeContest;
        } else {
            return {};
        }
        //Create obj and return to next then()
    }).then(contestObj => {
        if(contestObj.hasOwnProperty('_contest_ID')){
            //Check if user has submitted to contest
            fetch('/api/contest/submission/check/' + contestObj.contest_ID, {credentials: 'include'})
            .then(res => {
                return res.json();
            }).then(resJson => {
                contestObj.submitted = resJson.submitted;
            }).then( () => {
                //Fetch rules associated with contest_ID
                fetch('/api/contest/rules/' + contestObj.contest_ID, {credentials: 'include'})
                .then(res => {
                    return res.json();
                }).then(resJson => {
                    contestObj.rules = resJson[0];
                    document.querySelector('#activeContest').innerHTML = contestObj.activeContestDiv();
                    document.querySelector('#submitEntrySection').innerHTML = contestObj.entryOrVote();
                    document.querySelector('#contestIDHidden').value = contestObj.contest_ID;
                }).catch(error => console.error(error));
            }).catch(error => console.error(error));
        } else {
            document.querySelector('#activeContest').innerHTML = '<h1>No Contest Currently Running.<br>Check back soon!</h1>';
            document.querySelector('#submitEntrySection').innerHTML = '';
        }
    }).catch(error => console.error(error));

    if(document.URL.indexOf('result=subsuccess') !== -1){
        document.querySelector('#showErrorSuccess').innerHTML = 
            '<h1 class="success-notification">Contest entry successfully submitted. Thank you for participating in the contest!</h1>';
    } else if (document.URL.indexOf('result=badurl') !== -1){
        document.querySelector('#showErrorSuccess').innerHTML = 
            '<h1 class="error-notification">The workshop link entered is not a valid workshop link. Please fix any issues with the link and try submitting again.</h1>';
    } else if (document.URL.indexOf('result=noterms') !== -1){
        document.querySelector('#showErrorSuccess').innerHTML = 
            '<h1 class="error-notification">You must agree to the terms of the contest by ticking the box at the bottom of the page. ' +
            'Failure to agree to the terms will result in your submission not being entered.</h1>';
    } else if (document.URL.indexOf('result=votesuccess') !== -1){
        document.querySelector('#showErrorSuccess').innerHTML = 
            '<h1 class="success-notification">Your contest votes have been successfully submitted. Thank you for participating in the voting process!</h1>';
    } else if (document.URL.indexOf('result=votefail') !== -1){
        document.querySelector('#showErrorSuccess').innerHTML = 
            '<h1 class="error-notification">Oops! Something went wrong with your voting selections. Please visit the voting page and try again.</h1>';
    } else if (document.URL.indexOf('result=voteduplicate') !== -1){
        document.querySelector('#showErrorSuccess').innerHTML = 
            '<h1 class="error-notification">You cannot vote for the same submission more than once. Please visit the voting page and try again.</h1>';
    }
}

export default onload;