import UnassignedRole from './UnassignedRole';
import Contest from './Contest';

window.onload = function(){
    if(window.location.pathname === "/collabs"){
        var unassignedRoles = '<h1>Page Currently Under Construction!</h1>';
        document.getElementById('collabsDiv').innerHTML = unassignedRoles;

    } else if(window.location.pathname === '/admin/contest'){
        if(document.URL.indexOf('result=success') !== -1){
            this.alert('Contest successfully created!');
        }

    } else if(window.location.pathname === '/contest'){
        fetch('/api/active/contest', {credentials: 'include'})
        .then(res =>{
            return res.json();
        }).then(resJson =>{
            let activeContest = new Contest(
                resJson[0][0].contest_ID,
                resJson[0][0].Name,
                new Date(resJson[0][0].SubmissionStartDate),
                new Date(resJson[0][0].SubmissionEndDate),
                new Date(resJson[0][0].VoteStartDate),
                new Date(resJson[0][0].VoteEndDate),
                resJson[0][0].Description,
                null
            );
            return activeContest;
        }).then(contestObj => {
            fetch('/api/contest/rules/' + contestObj.contest_ID, {credentials: 'include'})
            .then(res => {
                return res.json();
            }).then(resJson => {
                contestObj.rules = resJson[0];
                document.querySelector('#activeContest').innerHTML = contestObj.activeContestDiv();
            }).catch(error => console.error(error));
        }).catch(error => console.error(error));
    }
}