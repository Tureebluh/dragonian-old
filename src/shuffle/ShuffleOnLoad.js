import Shuffle from './Shuffle'

const onload = () => {

    fetch('/api/shuffle/active', {credentials: 'include'})
    .then(res =>{
        return res.json();
        //Return res in JSON form to next then()
    }).then(resJson =>{
        if(typeof resJson[0][0] !== 'undefined'){
            let roundOne = new Date(resJson[0][0].RoundOneStart);

            let roundTwo = new Date(resJson[0][0].RoundTwoStart);

            let roundThree = new Date(resJson[0][0].RoundThreeStart);

            let roundFour = new Date(resJson[0][0].RoundFourStart);

            let endDate = new Date(resJson[0][0].EndDate);

            let activeShuffle = new Shuffle(
                resJson[0][0].Shuffle_ID,
                resJson[0][0].Name,
                roundOne,
                roundTwo,
                roundThree,
                roundFour,
                endDate,
                resJson[0][0].Description
            );
            return activeShuffle;
        } else {
            return {};
        }
        //Create obj and return to next then()
    }).then(shuffleObj => {
        if(shuffleObj.hasOwnProperty('_Shuffle_ID')){
            document.querySelector('#activeShuffle').innerHTML = shuffleObj.activeDiv();
            document.querySelector('#submitEntrySection').innerHTML = shuffleObj.submissionDiv();
            document.querySelector('#workshopLink').innerHTML = shuffleObj.workshopDiv();
            document.querySelector('#nextRoundTimer').innerHTML = shuffleObj.timerDiv();
            document.querySelector('#shuffleIDHidden').value = shuffleObj.Shuffle_ID;
            document.querySelector('#roundOne').value = shuffleObj.RoundOneStart.toISOString();
            document.querySelector('#roundTwo').value = shuffleObj.RoundTwoStart.toISOString();
            document.querySelector('#roundThree').value = shuffleObj.RoundThreeStart.toISOString();
            document.querySelector('#roundFour').value = shuffleObj.RoundFourStart.toISOString();
        }
    }).catch(error => console.error(error));

    if(document.URL.indexOf('result=subsuccess') !== -1){
        document.querySelector('#showErrorSuccess').innerHTML = 
            '<h1 class="success-notification">Shuffle entry successfully submitted. Thank you for participating in the shuffle!</h1>';
    } else if (document.URL.indexOf('result=badurl') !== -1){
        document.querySelector('#showErrorSuccess').innerHTML = 
            '<h1 class="error-notification">The workshop link entered is not a valid workshop link. Please fix any issues with the link and try submitting again.</h1>';
    } else if (document.URL.indexOf('result=noterms') !== -1){
        document.querySelector('#showErrorSuccess').innerHTML = 
            '<h1 class="error-notification">You must agree to the terms of the shuffle by ticking the box at the bottom of the page. ' +
            'Failure to agree to the terms will result in your submission not being entered.</h1>';
    }
}

export default onload;