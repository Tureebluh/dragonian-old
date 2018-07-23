import UnassignedRole from './UnassignedRole';
import Contest from './Contest';
import ContestOption from './ContestOption';
import ContestRule from './ContestRule';
import ChangeEvents from './ChangeEvents';

//Can only have one window.onload function so we're checking the pathname to see which page the user is on
window.onload = function(){

    //If user is on collab page display under construction
    if(window.location.pathname === "/collabs"){
        var unassignedRoles = '<h1>Page Currently Under Construction!</h1>';
        document.querySelector('#collabsDiv').innerHTML = unassignedRoles;

    //When admin creates a contest, it will redirect back to same page with added URL params if successful.
    } else if(window.location.pathname === '/admin/contest'){
        fetch('/api/contest/names/all', {credentials: 'include'})
        .then(res => {
            return res.json();
        })
        .then(resJson => {
            resJson[0].forEach(contest => {
                let node = new ContestOption(contest.contest_ID, contest.Name).getContestOption();
                document.querySelector('#contestNameDropdown').appendChild(node);
            });
        }).catch(error => {console.error(error)});

        fetch('/api/contest/rules', {credentials: 'include'})
        .then(res => {
            return res.json();
        })
        .then(resJson => {
            resJson[0].forEach(rule => {
                let node = new ContestRule(rule.contest_rule_ID, rule.rule).getRuleOption();
                document.querySelector('#contestRulesDropdown').appendChild(node);
            });
        }).catch(error => {console.error(error)});

        if(document.URL.indexOf('result=success') !== -1){
            this.alert('Contest successfully created/edited!');
        }

    //If user is on contest page, load the oldest active contest and pull all rules associated with that contest. Store all info in an object and call
    //call provided function to create HTML visual of data
    //NOTE: Cookies are not sent with fetch() by default, therefore {credentials} are supplied to server to authenticate fetch() request
    } else if(window.location.pathname === '/contest'){
        fetch('/api/contest/all/active', {credentials: 'include'})
        .then(res =>{
            return res.json();
            //Return res in JSON form to next then()
        }).then(resJson =>{
            if(typeof resJson[0][0] !== 'undefined'){
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
            } else {
                return {};
            }
            //Create obj and return to next then()
        }).then(contestObj => {
            if(contestObj.hasOwnProperty('_contest_ID')){
                //Fetch rules associated with contest_ID
                fetch('/api/contest/rules/' + contestObj.contest_ID, {credentials: 'include'})
                .then(res => {
                    return res.json();
                }).then(resJson => {
                    contestObj.rules = resJson[0];
                    document.querySelector('#activeContest').innerHTML = contestObj.activeContestDiv();
                }).catch(error => console.error(error));
            } else {
                document.querySelector('#activeContest').innerHTML = '<h1>No Contest Currently Running.<br>Check back soon!</h1>'
            }
        }).catch(error => console.error(error));
    }
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
        var myDropdown = document.getElementById("adminDropdown");
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
    }
}