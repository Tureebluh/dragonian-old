if(window.location.pathname === '/admin/contest'){
    //When admin selects contest from dropdown list
    document.querySelector('#contestDropdown').addEventListener('change', (event)=>{
        if(event.target.value !== '0') {
            fetch('/api/contest/all/' + event.target.value, {credentials: 'include'})
            .then(res => {
                return res.json();
            })
            .then(resJson => {
                let temp = resJson[0][0];

                document.querySelector('#contestName').value = temp.Name;
                document.querySelector('#contestSubmissionStart').value = temp.SubmissionStartDate.toString().replace('Z','');
                document.querySelector('#contestSubmissionEnd').value = temp.SubmissionEndDate.toString().replace('Z','');
                document.querySelector('#contestVoteStart').value = temp.VoteStartDate.toString().replace('Z','');
                document.querySelector('#contestVoteEnd').value = temp.VoteEndDate.toString().replace('Z','');
                document.querySelector('#contestDescription').value = temp.Description;
                document.querySelector('#createEditContestHeader').textContent = "Edit Contest";
                document.querySelector('#submitContest').value = "Edit Contest";
                document.querySelector('#contestActive').checked = temp.Active.data[0] ? true : false;
                document.querySelector('#contestActive').disabled = false;
            })
            .catch(error => {console.error(error)});
        } else {
            document.querySelector('#createEditContestHeader').textContent = "Create Contest";
            document.querySelector('#submitContest').value = "Create Contest";
            document.querySelector('#contestActive').checked = true;
            document.querySelector('#contestActive').disabled = true;
        }
    });    
}

