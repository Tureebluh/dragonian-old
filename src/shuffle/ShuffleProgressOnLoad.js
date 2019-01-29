import ShuffleSubmission from './ShuffleSubmission';

const onload = () => {
    let allHTML = '';

    fetch('/api/shuffle/active/progress', {credentials: 'include'})
    .then(res =>{
        return res.json();
        //Return res in JSON form to next then()
    }).then(resJson =>{
        if(typeof resJson[0][0] !== 'undefined'){
            //Initialize dictionary object for referencing users personaname and avatarfull URLs
            let shuffleDict = {};

            //Build shuffle progress objects
            resJson[0].forEach(element => {
                allHTML = '<h1>' + element.Name + '</h1>';
                let shuffleSub = new ShuffleSubmission(element.SteamID, element.avatarfull, element.personaname, element['r1_workshop_URL'],
                    element['r2_SteamID'], element['r2_workshop_URL'], element['r3_SteamID'], element['r3_workshop_URL'],  element['r4_SteamID'], element['r4_workshop_URL']);
                
                shuffleDict[element.SteamID] = shuffleSub;
            });

            return shuffleDict;
        } else {
            return {};
        }
        //Create obj and return to next then()
    }).then(shuffleDict => {
        if(Object.entries(shuffleDict).length !== 0 && shuffleDict.constructor === Object){
            
            for(let subObj of Object.entries(shuffleDict)){
                let tempHTML = '<div class="shuffle-submission-container">';

                let r1Span = '<span><img src="' + subObj[1].avatarfull + '"/>&nbsp;' + subObj[1].personaname + '<br>' +
                             '<a target="_BLANK" href="' + subObj[1]['r1_workshop_URL'] + '">Click Here</a></span>';
                tempHTML += r1Span;
                
                if(shuffleDict[subObj[1]['r2_SteamID']]){
                    let r2Span = '';
                    if(subObj[1]['r2_workshop_URL']){
                        r2Span = '<span><img src="' + shuffleDict[subObj[1]['r2_SteamID']].avatarfull + '"/>&nbsp;' + shuffleDict[subObj[1]['r2_SteamID']].personaname + '<br>' +
                                 '<a target="_BLANK" href="' + subObj[1]['r2_workshop_URL'] + '">Click Here</a></span>';
                    } else {
                        r2Span = '<span><img src="' + shuffleDict[subObj[1]['r2_SteamID']].avatarfull + '"/>&nbsp;' + shuffleDict[subObj[1]['r2_SteamID']].personaname + '<br>' +
                                 'Not Submitted</span>';
                    }
                    
                    tempHTML += r2Span;
                } else {
                    let r2Span = "<span><img src='/img/userdefault.png'/>&nbsp;Unclaimed<br>" +
                                'Not Applicable</span>';
                    tempHTML += r2Span;
                }

                if(shuffleDict[subObj[1]['r3_SteamID']]){
                    let r3Span = '';
                    if(subObj[1]['r3_workshop_URL']){
                        r3Span = '<span><img src="' + shuffleDict[subObj[1]['r3_SteamID']].avatarfull + '"/>&nbsp;' + shuffleDict[subObj[1]['r3_SteamID']].personaname + '<br>' +
                                 '<a target="_BLANK" href="' + subObj[1]['r3_workshop_URL'] + '">Click Here</a></span>';
                    } else {
                        r3Span = '<span><img src="' + shuffleDict[subObj[1]['r3_SteamID']].avatarfull + '"/>&nbsp;' + shuffleDict[subObj[1]['r3_SteamID']].personaname + '<br>' +
                                 'Not Submitted</span>';
                    }
                    
                    tempHTML += r3Span;
                } else {
                    let r3Span = '<span><img src="/img/userdefault.png"/>&nbsp;Unclaimed<br>' +
                                'Not Applicable</span>';
                    tempHTML += r3Span;
                }
                
                if(shuffleDict[subObj[1]['r4_SteamID']]){
                    let r4Span = '';

                    if(subObj[1]['r4_workshop_URL']){
                        r4Span = '<span><img src="' + shuffleDict[subObj[1]['r4_SteamID']].avatarfull + '"/>&nbsp;' + shuffleDict[subObj[1]['r4_SteamID']].personaname + '<br>' +
                                 '<a target="_BLANK" href="' + subObj[1]['r4_workshop_URL'] + '">Click Here</a></span>';
                    } else {
                        r4Span = '<span><img src="' + shuffleDict[subObj[1]['r4_SteamID']].avatarfull + '"/>&nbsp;' + shuffleDict[subObj[1]['r4_SteamID']].personaname + '<br>' +
                                 'Not Submitted</span>';
                    }
                    
                    tempHTML += r4Span;
                } else {
                    let r4Span = '<span><img src="/img/userdefault.png"/>&nbsp;Unclaimed<br>' +
                                 'Not Applicable</span>';
                    tempHTML += r4Span;
                }
                
                tempHTML += '</div>';

                allHTML += tempHTML;
            }

            document.querySelector('#shufProgressTable').innerHTML = allHTML;
        }
    }).catch(error => {
        document.querySelector('#showErrorSuccess').innerHTML = 
            '<h1 class="error-notification">Something went wrong. Please contact the administrator.</h1>';
        console.error(error);
    });
}

export default onload;