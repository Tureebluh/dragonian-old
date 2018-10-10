import UserOption from './UserOption';

var onload = () => {

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
            document.querySelector('#userNameDropdown').innerHTML = '';
            if(resJson[0] !== undefined){
                resJson[0].forEach(element => {
                    let user = new UserOption(element.SteamID, element.personaname);
                    document.querySelector('#userNameDropdown').appendChild(user.getUserOption());
                });
            }
        }).catch(error => {console.error(error)});
    });

    document.querySelector('#submitJudges').addEventListener('click', event => {
        if(!document.querySelector('#addJudgeForm').checkValidity()){
            return;
        } else {
            event.preventDefault();
            console.log(document.querySelector('#userNameDropdown').value);
        }
    });
}

export default onload;