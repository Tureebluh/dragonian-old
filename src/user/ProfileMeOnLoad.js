import UserProfile from './UserProfile';

const onload = () => {
    let userProfile = {};
    //Get basic user profile details (lastLogIn, CreatedDate, Avatarfull and personaname)
    fetch('/api/profile/user/details', {credentials: 'include'})
    .then(res =>{
        return res.json();
        //Return res in JSON form to next then()
    }).then(resJson =>{
        if(typeof resJson[0][0] !== 'undefined'){
            userProfile = new UserProfile(new Date(resJson[0][0].CreatedDate), new Date(resJson[0][0].LastLogIn),
                                                        resJson[0][0].avatarfull, resJson[0][0].personaname, resJson[0][0].verified + "");
            document.querySelector('#userProfile').innerHTML = userProfile.userProfileDiv();
            document.querySelector('#userProfile').classList.toggle('hidden');

            //Get shuffles user has participated in that are completed
            fetch('/api/profile/user/shuffles', {credentials: 'include'})
            .then(res =>{
                return res.json();
                //Return res in JSON form to next then()
            }).then(resJson =>{
                if(typeof resJson[0][0] !== 'undefined'){
                    userProfile.shuffles = resJson[0];
                    document.querySelector('#userShuffles').innerHTML = userProfile.userShuffleDiv();
                    document.querySelector('#userShuffles').classList.toggle('hidden');
                }
            }).catch(error => console.error(error));

            //Get shuffles user has participated in that are completed
            fetch('/api/profile/user/contests', {credentials: 'include'})
            .then(res =>{
                return res.json();
                //Return res in JSON form to next then()
            }).then(resJson =>{
                if(typeof resJson[0][0] !== 'undefined'){
                    userProfile.contests = resJson[0];
                    document.querySelector('#userContests').innerHTML = userProfile.userContestDiv();
                    document.querySelector('#userContests').classList.toggle('hidden');
                }
            }).catch(error => console.error(error));

            if(userProfile.verified.includes('1') !== -1){
                //Check if user is verified
                fetch('/api/profile/user/verify', {credentials: 'include'})
                .then(res =>{
                    return res.json();
                    //Return res in JSON form to next then()
                }).then(resJson =>{
                    if(resJson.result === 1){
                        let node = document.querySelector('#userVerified');
                        node.innerHTML = 'Verified';
                        node.classList.toggle('error-notification');
                        node.classList.toggle('success-notification');
                    }
                }).catch(error => console.error(error));
            }
            
        }
    }).catch(error => console.error(error));    
}

export default onload;