import UserOption from './UserOption';

var onload = () => {

    getAllJudges();

    //Search database for usernames when user types
    document.querySelector('#searchUsers').addEventListener('input', (event) => {
        let payload = {
            search: event.target.value.trim().toLowerCase()
        };
        fetch('/admin/roles/judges', {
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
            document.querySelector('#addJudgeDropdown').innerHTML = '';
            if(resJson[0] !== undefined){
                resJson[0].forEach(element => {
                    let user = new UserOption(element.SteamID, element.personaname);
                    document.querySelector('#addJudgeDropdown').appendChild(user.getUserOption());
                });
            }
        }).catch(error => {console.error(error)});
    });

    //Run validity checks and post steamID's to server
    document.querySelector('#submitJudges').addEventListener('click', event => {
        if(!document.querySelector('#addJudgeForm').checkValidity()){
            return;
        } else {
            event.preventDefault();
            let payload = {
                steamid: document.querySelector('#addJudgeDropdown').value
            };
            fetch('/admin/roles/add/judge', {
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
                console.log(resJson);
                if(resJson.result === 'Success'){
                    getAllJudges();
                    document.querySelector('#showErrorSuccess').innerHTML = 
                        '<h1 class="success-notification">Judge added successfully.</h1>';
                    setTimeout(()=>{
                        document.querySelector('#showErrorSuccess').innerHTML = "";
                    }, 10000);
                }
            }).catch(error => {console.error(error)});
        }
    });

    //Run validity checks and post steamID's to server
    document.querySelector('#removeJudges').addEventListener('click', event => {
        if(!document.querySelector('#removeJudgeForm').checkValidity()){
            return;
        } else {
            event.preventDefault();
            let tempOptions = document.querySelectorAll('.removeJudgeOption');
            let selectedOptions = [];
            tempOptions.forEach(element => {
                if(element.selected){
                    selectedOptions.push(element.value);
                }
            });

            let payload = {
                steamid: selectedOptions
            };

            fetch('/admin/roles/remove/judges', {
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
                    getAllJudges();
                    document.querySelector('#showErrorSuccess').innerHTML = 
                        '<h1 class="success-notification">Judge removed successfully.</h1>';
                    setTimeout(()=>{
                        document.querySelector('#showErrorSuccess').innerHTML = "";
                    }, 10000);
                }
            }).catch(error => {console.error(error)});
        }
    });

    function getAllJudges(){
        //Load current judges in remove judge panel
        fetch('/admin/roles/judges/all', {credentials: 'include'})
        .then(res => {
            return res.json();
        }).then(resJson => {
            document.querySelector('#removeJudgeDropdown').innerHTML = '';
            if(typeof resJson[0] !== 'undefined'){
                resJson[0].forEach(element => {
                    let user = new UserOption(element.SteamID, element.personaname);
                    let tempNode = user.getUserOption();
                    tempNode.setAttribute('class', 'removeJudgeOption');
                    document.querySelector('#removeJudgeDropdown').appendChild(tempNode);
                });
            }
        }).catch(error => {console.error(error)});
    }
}

export default onload;