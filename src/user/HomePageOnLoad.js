
const onload = () => {
    fetch('/api/contest/recentwinner', {credentials: 'include'
    }).then(res => {
        return res.json();
    }).then(resJson => {
        if(typeof resJson[0][0] !== 'undefined'){
            let tempHTML = '<div class="contest-winner"><img src="' + resJson[0][0].avatarfull + '">&nbsp;' + resJson[0][0].personaname + '</div>';
            tempHTML += '<br>Congratulations to our recent contest winner!';
            document.querySelector('#contestWinnerSection').innerHTML = tempHTML;
        }
    }).catch(error => console.error(error));
}

export default onload;