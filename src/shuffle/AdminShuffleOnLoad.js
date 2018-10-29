import ContestOption from '../contest/ContestOption';

const onload = () => {
    fetch('/api/shuffle/names/all', {credentials: 'include'})
    .then(res => {
        return res.json();
    })
    .then(resJson => {
        resJson[0].forEach(shuffle => {
            let node = new ContestOption(shuffle.Shuffle_ID, shuffle.Name).getContestOption();
            document.querySelector('#shuffleNameDropdown').appendChild(node);
        });
    }).catch(error => {console.error(error)});

    //Display to user that shuffle was updated successfully
    if(document.URL.indexOf('result=success') !== -1){
        document.querySelector('#showErrorSuccess').innerHTML = 
            '<h1 class="success-notification">Shuffle updated successfully.</h1>';
    }

    //When admin selects shuffle from dropdown list
    document.querySelector('#shuffleNameDropdown').addEventListener('change', (event)=>{
        if(event.target.value !== '0') {
            fetch('/api/shuffle/all/' + event.target.value, {credentials: 'include'})
            .then(res => {
                return res.json();
            })
            .then(resJson => {
                let temp = resJson[0][0];
                
                let roundOne = new Date(temp.RoundOneStart.toString());

                let roundTwo = new Date(temp.RoundTwoStart.toString());

                let roundThree = new Date(temp.RoundThreeStart.toString());

                let roundFour = new Date(temp.RoundFourStart.toString());

                let shuffleEnd = new Date(temp.EndDate.toString());

                document.querySelector('#shuffleName').value = temp.Name;
                document.querySelector('#shuffleRoundOne').value = roundOne.toISOString().replace('Z','');
                document.querySelector('#shuffleRoundTwo').value = roundTwo.toISOString().replace('Z','');
                document.querySelector('#shuffleRoundThree').value = roundThree.toISOString().replace('Z','');
                document.querySelector('#shuffleRoundFour').value = roundFour.toISOString().replace('Z','');
                document.querySelector('#shuffleEndDate').value = shuffleEnd.toISOString().replace('Z','');
                document.querySelector('#shuffleDescription').value = temp.Description;
                document.querySelector('#createEditShuffleHeader').textContent = "Edit Shuffle";
                document.querySelector('#submitShuffle').value = "Edit Shuffle";
                document.querySelector('#shuffleActive').checked = temp.Active.data[0] ? true : false;
                document.querySelector('#shuffleActive').disabled = false;
            })
            .catch(error => {console.error(error)});

        } else {
            console.log('Create A Shuffle Buffle My Friend..... Just... Nevermind..');
            document.querySelector('#createEditShuffleHeader').textContent = "Create Shuffle";
            document.querySelector('#submitShuffle').value = "Create Shuffle";
            document.querySelector('#shuffleActive').checked = true;
            document.querySelector('#shuffleActive').disabled = true;
        }
    });
}

export default onload;