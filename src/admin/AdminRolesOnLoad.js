import UserOption from '../user/UserOption';

const onload = () => {

    getAllJudges();
    getAllShuffleBans();
    getAllSiteBans();

    //Search database for usernames when user types and update Judge dropdown
    document.querySelector('#searchUsersJudge').addEventListener('input', (event) => {
        let payload = {
            search: event.target.value.trim().toLowerCase()
        };
        fetch('/admin/search/users', {
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

    //Search database for usernames when user types and add to shuffle ban dropdown
    document.querySelector('#searchUsersShuffle').addEventListener('input', (event) => {
        let payload = {
            search: event.target.value.trim().toLowerCase()
        };
        fetch('/admin/search/users', {
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
            document.querySelector('#addShuffleBanDropdown').innerHTML = '';
            if(resJson[0] !== undefined){
                resJson[0].forEach(element => {
                    let user = new UserOption(element.SteamID, element.personaname);
                    document.querySelector('#addShuffleBanDropdown').appendChild(user.getUserOption());
                });
            }
        }).catch(error => {console.error(error)});
    });

    //Run validity checks and post steamID's to server
    document.querySelector('#submitShuffleBan').addEventListener('click', event => {
        if(!document.querySelector('#addShuffleBanForm').checkValidity()){
            return;
        } else {
            event.preventDefault();
            let payload = {
                steamid: document.querySelector('#addShuffleBanDropdown').value
            };
            fetch('/admin/roles/add/shuffleban', {
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
                    getAllShuffleBans();
                    document.querySelector('#showErrorSuccess').innerHTML = 
                        '<h1 class="success-notification">Shuffle Ban added successfully.</h1>';
                    setTimeout(()=>{
                        document.querySelector('#showErrorSuccess').innerHTML = "";
                    }, 10000);
                }
            }).catch(error => {console.error(error)});
        }
    });

    //Run validity checks and post steamID's to server
    document.querySelector('#removeShuffleBan').addEventListener('click', event => {
        if(!document.querySelector('#removeShuffleBanForm').checkValidity()){
            return;
        } else {
            event.preventDefault();
            let tempOptions = document.querySelectorAll('.removeShuffleBanOption');
            let selectedOptions = [];
            tempOptions.forEach(element => {
                if(element.selected){
                    selectedOptions.push(element.value);
                }
            });

            let payload = {
                steamid: selectedOptions
            };

            fetch('/admin/roles/remove/shuffleban', {
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
                    getAllShuffleBans();
                    document.querySelector('#showErrorSuccess').innerHTML = 
                        '<h1 class="success-notification">Shuffle Ban removed successfully.</h1>';
                    setTimeout(()=>{
                        document.querySelector('#showErrorSuccess').innerHTML = "";
                    }, 10000);
                }
            }).catch(error => {console.error(error)});
        }
    });

    //Search database for usernames when user types and add to shuffle ban dropdown
    document.querySelector('#searchUsersSiteban').addEventListener('input', (event) => {
        let payload = {
            search: event.target.value.trim().toLowerCase()
        };
        fetch('/admin/search/users', {
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
            document.querySelector('#addSiteBanDropdown').innerHTML = '';
            if(resJson[0] !== undefined){
                resJson[0].forEach(element => {
                    let user = new UserOption(element.SteamID, element.personaname);
                    document.querySelector('#addSiteBanDropdown').appendChild(user.getUserOption());
                });
            }
        }).catch(error => {console.error(error)});
    });

    //Run validity checks and post steamID's to server
    document.querySelector('#submitSiteBan').addEventListener('click', event => {
        if(!document.querySelector('#addSiteBanForm').checkValidity()){
            return;
        } else {
            event.preventDefault();
            let payload = {
                steamid: document.querySelector('#addSiteBanDropdown').value
            };
            fetch('/admin/roles/add/siteban', {
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
                    getAllSiteBans();
                    document.querySelector('#showErrorSuccess').innerHTML = 
                        '<h1 class="success-notification">Website Ban added successfully.</h1>';
                    setTimeout(()=>{
                        document.querySelector('#showErrorSuccess').innerHTML = "";
                    }, 10000);
                }
            }).catch(error => {console.error(error)});
        }
    });

    //Run validity checks and post steamID's to server
    document.querySelector('#removeSiteBan').addEventListener('click', event => {
        if(!document.querySelector('#removeSiteBanForm').checkValidity()){
            return;
        } else {
            event.preventDefault();
            let tempOptions = document.querySelectorAll('.removeSiteBanOption');
            let selectedOptions = [];
            tempOptions.forEach(element => {
                if(element.selected){
                    selectedOptions.push(element.value);
                }
            });

            let payload = {
                steamid: selectedOptions
            };

            fetch('/admin/roles/remove/siteban', {
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
                    getAllSiteBans();
                    document.querySelector('#showErrorSuccess').innerHTML = 
                        '<h1 class="success-notification">Website Ban removed successfully.</h1>';
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

    function getAllShuffleBans(){
        //Load current judges in remove judge panel
        fetch('/admin/roles/shuffleban/all', {credentials: 'include'})
        .then(res => {
            return res.json();
        }).then(resJson => {
            document.querySelector('#removeShuffleBanDropdown').innerHTML = '';
            if(typeof resJson[0] !== 'undefined'){
                resJson[0].forEach(element => {
                    let user = new UserOption(element.SteamID, element.personaname);
                    let tempNode = user.getUserOption();
                    tempNode.setAttribute('class', 'removeShuffleBanOption');
                    document.querySelector('#removeShuffleBanDropdown').appendChild(tempNode);
                });
            }
        }).catch(error => {console.error(error)});
    }

    function getAllSiteBans(){
        //Load current judges in remove judge panel
        fetch('/admin/roles/siteban/all', {credentials: 'include'})
        .then(res => {
            return res.json();
        }).then(resJson => {
            document.querySelector('#removeSiteBanDropdown').innerHTML = '';
            if(typeof resJson[0] !== 'undefined'){
                resJson[0].forEach(element => {
                    let user = new UserOption(element.SteamID, element.personaname);
                    let tempNode = user.getUserOption();
                    tempNode.setAttribute('class', 'removeSiteBanOption');
                    document.querySelector('#removeSiteBanDropdown').appendChild(tempNode);
                });
            }
        }).catch(error => {console.error(error)});
    }
}

export default onload;