import ContestOption from '../contest/ContestOption';

const onload = () => {
    const submissionDict = {};

    fetch('/admin/contest/submissions/all', {credentials: 'include'
    }).then(res => {
        return res.json();
    }).then(resJson => {
        if(typeof resJson[0][0] !== 'undefined'){
            let tempSubs = resJson[0];
            tempSubs.forEach(element => {
                submissionDict[''+ element.contest_submission_ID] = element
                let option = new ContestOption(element.contest_submission_ID, element.personaname);
                let node = option.getContestOption();
                document.querySelector('#contestUserName').appendChild(node);
            });
            let currentValue = document.querySelector('#contestUserName').value;
            document.querySelector('#contestUserPic').setAttribute('src', submissionDict[currentValue].avatarfull);
            document.querySelector('#contestSubmissionURL').href = submissionDict[currentValue]['workshop_URL'];
            document.querySelector('#contestSubmissionValid').checked = submissionDict[currentValue].valid.data[0] ? true : false;
            document.querySelector('#contestSubTwitchURL').value = submissionDict[currentValue].twitch;
        }
    }).catch(error => console.error(error));

    document.querySelector('#contestUserName').addEventListener('change', (event) => {
        document.querySelector('#contestUserPic').setAttribute('src', submissionDict[event.target.value].avatarfull);
        document.querySelector('#contestSubmissionURL').href = submissionDict[event.target.value]['workshop_URL'];
        document.querySelector('#contestSubmissionValid').checked = submissionDict[event.target.value].valid.data[0] ? true : false;
        document.querySelector('#contestSubTwitchURL').value = submissionDict[event.target.value].twitch;
    });

    document.querySelector('#contestSubmissionValid').addEventListener('change', (event) => {
        let isValid = event.target.checked ? 1 : 0;
        let contestSubmissionID = document.querySelector('#contestUserName').value;
        submissionDict[contestSubmissionID].valid.data[0] = isValid;

        let payload = {
            contestSubmissionID: contestSubmissionID,
            isValid: isValid
        };
        fetch('/admin/contest/submissions/validate', {
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
                    '<h1 class="success-notification">Successfully validated submission ID #' + payload.contestSubmissionID + '</h1>';
            } else {
                document.querySelector('#showErrorSuccess').innerHTML = 
                    '<h1 class="error-notification">Error validating submission ID #' + payload.contestSubmissionID + '</h1>';
            }
            setTimeout(()=>{
                document.querySelector('#showErrorSuccess').innerHTML = "";
            }, 5000);
        }).catch(error => console.error(error));

    });

    document.querySelector('#submitTwitchURL').addEventListener('click', (event) => {
        if(document.querySelector('#contestSubTwitchURL').value){
            let contestSubmissionID = document.querySelector('#contestUserName').value;
            let contestTwitchURL = document.querySelector('#contestSubTwitchURL').value;
            submissionDict[contestSubmissionID].twitch = contestTwitchURL;
            
            let payload = {
                contestSubmissionID: contestSubmissionID,
                twitchURL: contestTwitchURL
            };

            fetch('/admin/contest/submissions/twitch', {
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
                        '<h1 class="success-notification">Twitch URL successfully recorded for submission ID #' + payload.contestSubmissionID + '</h1>';
                } else {
                    document.querySelector('#showErrorSuccess').innerHTML = 
                        '<h1 class="error-notification">Error recording Twitch URL for submission ID #' + payload.contestSubmissionID + '</h1>';
                }
                setTimeout(()=>{
                    document.querySelector('#showErrorSuccess').innerHTML = "";
                }, 5000);
            }).catch(error => console.error(error));
        }
    });
}

export default onload;