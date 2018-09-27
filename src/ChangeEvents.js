if(window.location.pathname === '/admin/contest'){
    //When admin selects contest from dropdown list
    document.querySelector('#contestNameDropdown').addEventListener('change', (event)=>{
        if(event.target.value !== '0') {
            fetch('/api/contest/all/' + event.target.value, {credentials: 'include'})
            .then(res => {
                return res.json();
            })
            .then(resJson => {
                let temp = resJson[0][0];
                
                let subStart = new Date(temp.SubmissionStartDate.toString());
                let offset = 14;
                subStart.setHours(subStart.getHours() - offset);

                let subEnd = new Date(temp.SubmissionEndDate.toString());
                subEnd.setHours(subEnd.getHours() - offset);

                let voteStart = new Date(temp.VoteStartDate.toString());
                voteStart.setHours(voteStart.getHours() - offset);

                let voteEnd = new Date(temp.VoteEndDate.toString());
                voteEnd.setHours(voteEnd.getHours() - offset);

                document.querySelector('#contestName').value = temp.Name;
                document.querySelector('#contestSubmissionStart').value = subStart.toISOString().replace('Z','');
                document.querySelector('#contestSubmissionEnd').value = subEnd.toISOString().replace('Z','');
                document.querySelector('#contestVoteStart').value = voteStart.toISOString().replace('Z','');
                document.querySelector('#contestVoteEnd').value = voteEnd.toISOString().replace('Z','');
                document.querySelector('#contestDescription').value = temp.Description;
                document.querySelector('#createEditContestHeader').textContent = "Edit Contest";
                document.querySelector('#submitContest').value = "Edit Contest";
                document.querySelector('#contestActive').checked = temp.Active.data[0] ? true : false;
                document.querySelector('#contestActive').disabled = false;
                document.querySelector('#contestRulesDropdown').disabled = false;

                //Fetch rules associated with contest_ID
                fetch('/api/contest/rules/' + event.target.value, {credentials: 'include'})
                .then(res => {
                    return res.json();
                }).then(resJson => {
                    let rules = resJson[0];
                    if(rules !== null){
                        document.querySelector('#contestRulesDropdown').childNodes.forEach(tempOption => {
                            rules.forEach(element => {
                                if(tempOption.value == element.contest_rule_ID){
                                    tempOption.selected = true;
                                    return;
                                }
                            });
                        });
                    }
                }).catch(error => console.error(error));
            })
            .catch(error => {console.error(error)});

        } else {
            document.querySelector('#createEditContestHeader').textContent = "Create Contest";
            document.querySelector('#submitContest').value = "Create Contest";
            document.querySelector('#contestActive').checked = true;
            document.querySelector('#contestActive').disabled = true;
            document.querySelector('#contestRulesDropdown').disabled = true;
        }
    });
    document.querySelector('#ruleNameDropdown').addEventListener('change', (event) => {
        if(event.target.value !== '0') {
            document.querySelector('#createEditRuleHeader').textContent = "Edit Rule";
            document.querySelector('#submitRule').value = "Edit Rule";
            document.querySelector('#contestRule').value = document.querySelector('#ruleNameDropdown').selectedOptions[0].text;
        } else {
            document.querySelector('#createEditRuleHeader').textContent = "Create Rule";
            document.querySelector('#submitRule').value = "Create Rule";
        }
    });
}
if(document.querySelector('#adminPanel') !== null){
    document.querySelector('#adminPanel').addEventListener('click', (event)=>{
        document.getElementById("adminDropdown").classList.toggle("show");
    });
}
if(window.location.pathname === '/contest/vote/') {
    document.querySelectorAll('.jump-to-icon').forEach((element)=>{
        element.addEventListener('click', (event) => {
            let tempString = '#contestSubmission' + document.querySelector('#' + event.target.id.toString().replace('Btn','')).value;
            document.querySelector(tempString).scrollIntoView();
        });
    });
}

