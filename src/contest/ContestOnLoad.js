import Contest from './Contest';

const onload = () => {
    //If user is on contest page, load the oldest active contest and pull all rules associated with that contest.
    //Store all info in an object and call provided function to create HTML visual of data
    //NOTE: Cookies are not sent with fetch() by default, therefore {credentials} are supplied to server to authenticate fetch() request

    fetch('/api/contest/all/active', {credentials: 'include'})
    .then(res =>{
        return res.json();
        //Return res in JSON form to next then()
    }).then(resJson =>{
        if(typeof resJson[0][0] !== 'undefined'){
            let subStart = new Date(resJson[0][0].SubmissionStartDate);
            let offset = 0;
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

            //Add judges with pictures to judgeSection
            fetch('/api/contest/all/judges', {credentials: 'include'})
            .then(res => {
                return res.json();
            }).then(resJson => {
                let node = document.createElement('H1');
                let text = document.createTextNode('Judges');
                node.appendChild(text);
                document.querySelector('#judgeSection').appendChild(node);
                resJson[0].forEach(element => {
                    let tempSpan = document.createElement('SPAN');
                    tempSpan.setAttribute('class', 'steaminfo');
                    let tempImg = document.createElement('IMG');
                    tempSpan.appendChild(tempImg);
                    tempSpan.appendChild(document.createTextNode(element.personaname));
                    tempImg.setAttribute('src', element.avatarfull);

                    document.querySelector('#judgeSection').appendChild(tempSpan);
                });
                //Get contest criteria with weights to display to user
                fetch('/api/contest/all/rubric', {credentials: 'include'})
                .then(res => {
                    return res.json();
                }).then(resJson => {
                    let node = document.createElement('H1');
                    let text = document.createTextNode('Scoring Rubric');
                    node.appendChild(text);
                    document.querySelector('#contestRubric').appendChild(node);

                    resJson[0].forEach(element => {
                        let node = document.createElement('H3');
                        let text = document.createTextNode(element['contest_criteria'] + ' - ' + (parseInt(element['contest_criteria_weight'], 10) * 10));
                            node.appendChild(text);
                        document.querySelector('#contestRubric').appendChild(node);

                        node = document.createElement('P');
                            text = document.createTextNode(element['contest_criteria_description']);
                            node.appendChild(text);
                        document.querySelector('#contestRubric').appendChild(node);
                    });
                }).catch(error => {console.error(error)});
            }).catch(error => {console.error(error)});
        } else {
            let tempString = '';
                tempString += '<form action="/contest/results/" method="get" class="contestVotingForm">';
                    tempString += '<input type="submit" alt="Go To Judging Page" value="See Contest Results">';
                tempString += '</form>';
            document.querySelector('#activeContest').innerHTML = "<h2>You're in luck, the next contest begins soon!<br>Be sure to check out Twitch for live updates regarding future contest announcements, judging results, and more!</h2>" + 
                                                                '<a href="https://www.twitch.tv/r3ddragons" target="_blank"><img id="twitchImg" src="img/twitch_purple_combo.svg"></a>';
            document.querySelector('#submitEntrySection').innerHTML = tempString;
        }
    }).catch(error => console.error(error));

    if(document.URL.indexOf('result=subsuccess') !== -1){

        document.querySelector('#showErrorSuccess').innerHTML = 
            '<h1 class="success-notification">Contest entry successfully submitted. Thank you for participating in the contest!</h1>';
        window.location.hash = '#showErrorSuccess';

    } else if (document.URL.indexOf('result=badurl') !== -1){

        document.querySelector('#showErrorSuccess').innerHTML = 
            '<h1 class="error-notification">The workshop link entered is not a valid workshop link. Please fix any issues with the link and try submitting again.</h1>';
        window.location.hash = '#showErrorSuccess';

    } else if (document.URL.indexOf('result=noterms') !== -1){

        document.querySelector('#showErrorSuccess').innerHTML = 
            '<h1 class="error-notification">You must agree to the terms of the contest by ticking the box at the bottom of the page. ' +
            'Failure to agree to the terms will result in your submission not being entered.</h1>';
        window.location.hash = '#showErrorSuccess';

    } else if (document.URL.indexOf('result=votesuccess') !== -1){

        document.querySelector('#showErrorSuccess').innerHTML = 
            '<h1 class="success-notification">Your contest votes have been successfully submitted. Thank you for participating in the voting process!</h1>';
        window.location.hash = '#showErrorSuccess';

    } else if (document.URL.indexOf('result=votefail') !== -1){

        document.querySelector('#showErrorSuccess').innerHTML = 
            '<h1 class="error-notification">Oops! Something went wrong with your voting selections. Please visit the voting page and try again.</h1>';
        window.location.hash = '#showErrorSuccess';

    } else if (document.URL.indexOf('result=voteduplicate') !== -1){

        document.querySelector('#showErrorSuccess').innerHTML = 
            '<h1 class="error-notification">You cannot vote for the same submission more than once. Please visit the voting page and try again.</h1>';
        window.location.hash = '#showErrorSuccess';
    }
    
    document.querySelector('#learnMore').addEventListener('click', (event) =>{
        if(document.querySelector('#inDepth').classList.contains('closed')){
            document.querySelector('#inDepth').classList.toggle('opened');
        }
    });
}

export default onload;