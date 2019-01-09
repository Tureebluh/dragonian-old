import ContestOption from '../contest/ContestOption';

const onload = () => {
    //Get names of all contest to populate dropdown
    fetch('/api/contest/names/all', {credentials: 'include'})
    .then(res => {
        return res.json();
    })
    .then(resJson => {
        resJson[0].forEach(contest => {
            let node = new ContestOption(contest.contest_ID, contest.Name).getContestOption();
            document.querySelector('#contestNameDropdown').appendChild(node);
        });

        //Get contestID from contest dropdown and fetch all valid submissions
        let payload = {
            contestID: document.querySelector('#contestNameDropdown').value
        };
        fetch('/admin/contest/submissions/contestid', {
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
            //Add all valid submissions to winnerdropdown
            if(typeof resJson[0][0] !== 'undefined'){
                let tempSubs = resJson[0];
                tempSubs.forEach(element => {
                    let option = new ContestOption(element.SteamID, element.personaname);
                    let node = option.getContestOption();
                    document.querySelector('#winnerNameDropdown').appendChild(node);
                });
            }
        }).catch(error => console.error(error));
    }).catch(error => {console.error(error)});

    //fetch valid submissions for contest on change
    document.querySelector('#contestNameDropdown').addEventListener('change', (event) => {
        let payload = {
            contestID: event.target.value
        };
        fetch('/admin/contest/submissions/contestid', {
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
            //Remove all options from dropdown before adding new submissions
            let winnerDropdown = document.querySelector('#winnerNameDropdown');

            while(winnerDropdown.firstChild){
                winnerDropdown.removeChild(winnerDropdown.firstChild);
            }
            //Add new submissions if they exist for contest
            if(typeof resJson[0][0] !== 'undefined'){
                let tempSubs = resJson[0];
                tempSubs.forEach(element => {
                    let option = new ContestOption(element.SteamID, element.personaname);
                    let node = option.getContestOption();
                    winnerDropdown.appendChild(node);
                });
            }
        }).catch(error => console.error(error));
    });

    document.querySelector('#submitContestWinner').addEventListener('click', (event) => {
        
        let payload = {
            contestID: document.querySelector('#contestNameDropdown').value,
            winnerID: document.querySelector('#winnerNameDropdown').value
        };
        if(!payload.winnerID){
            document.querySelector('#showErrorSuccess').innerHTML = 
                '<h1 class="error-notification">No winner selected</h1>';
            setTimeout(()=>{
                document.querySelector('#showErrorSuccess').innerHTML = "";
            }, 4000);
            return;
        }
        
        fetch('/admin/contest/submit/winner', {
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
                    '<h1 class="success-notification">Contest Winner Successfully Updated</h1>';
                setTimeout(()=>{
                    document.querySelector('#showErrorSuccess').innerHTML = "";
                }, 10000);
            } else {
                document.querySelector('#showErrorSuccess').innerHTML = 
                    '<h1 class="error-notification">Contest Winner Update Failed</h1>';
                setTimeout(()=>{
                    document.querySelector('#showErrorSuccess').innerHTML = "";
                }, 10000);
            }
        }).catch(error => console.error(error));
    });
}

export default onload;