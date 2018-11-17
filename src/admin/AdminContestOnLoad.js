import ContestOption from '../contest/ContestOption';
import ContestRule from '../contest/ContestRule';
import ContestCriteriaOption from '../contest/ContestCriteriaOption';

const onload = () => {
    fetch('/api/contest/names/all', {credentials: 'include'})
    .then(res => {
        return res.json();
    })
    .then(resJson => {
        resJson[0].forEach(contest => {
            let node = new ContestOption(contest.contest_ID, contest.Name).getContestOption();
            document.querySelector('#contestNameDropdown').appendChild(node);
        });
    }).catch(error => {console.error(error)});

    fetch('/api/contest/rules/', {credentials: 'include'})
    .then(res => {
        return res.json();
    })
    .then(resJson => {
        resJson[0].forEach(rule => {
            let node = new ContestRule(rule.contest_rule_ID, rule.rule).getRuleOption();
            document.querySelector('#ruleNameDropdown').appendChild(node);
            document.querySelector('#contestRulesDropdown').appendChild(node.cloneNode(true));
        });
    }).catch(error => {console.error(error)});

    fetch('/api/contest/criteria/', {credentials: 'include'})
    .then(res => {
        return res.json();
    })
    .then(resJson => {
        resJson[0].forEach(criteria => {
            let node = new ContestCriteriaOption(criteria.contest_criteria_ID, criteria.contest_criteria).getCriteriaOption();
            document.querySelector('#criteriaNameDropdown').appendChild(node);
            document.querySelector('#contestCriteriaDropdown').appendChild(node.cloneNode(true));
        });
    }).catch(error => {console.error(error)});

    //Display to user that contest was updated successfully
    if(document.URL.indexOf('result=success') !== -1){
        document.querySelector('#showErrorSuccess').innerHTML = 
            '<h1 class="success-notification">Contest updated successfully.</h1>';
    }

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
                let offset = 0;
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
                document.querySelector('#contestJudged').checked = temp.Judged.data[0] ? true : false;
                document.querySelector('#contestJudged').disabled = false;
                document.querySelector('#contestRulesDropdown').disabled = false;
                document.querySelector('#contestCriteriaDropdown').disabled = false;

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

                //Fetch criteria associated with contest_ID
                let payload = {
                    contest_ID: event.target.value
                };

                fetch('/api/contest/criteria/contestid', {
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
                    let criteria = resJson[0];
                    if(criteria !== null){
                        document.querySelector('#contestCriteriaDropdown').childNodes.forEach(tempOption => {
                            criteria.forEach(element => {
                                if(tempOption.value == element.contest_criteria_ID){
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
            document.querySelector('#contestJudged').checked = true;
            document.querySelector('#contestJudged').disabled = true;
            document.querySelector('#contestRulesDropdown').disabled = true;
            document.querySelector('#contestCriteriaDropdown').disabled = true;
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

    document.querySelector('#criteriaNameDropdown').addEventListener('change', (event) => {
        if(event.target.value !== '0') {
            
            let payload = {
                contest_criteria_ID: event.target.value
            };
            
            fetch('/api/contest/criteria/id', {
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
                document.querySelector('#contestCriteriaDescription').value = resJson[0][0].contest_criteria_description;
                document.querySelector('#contestCriteriaWeight').value = resJson[0][0].contest_criteria_weight;
            }).catch(error => console.error(error));

            document.querySelector('#createEditCriteriaHeader').textContent = "Edit Criteria";
            document.querySelector('#submitCriteria').value = "Edit Criteria";
            document.querySelector('#contestCriteria').value = document.querySelector('#criteriaNameDropdown').selectedOptions[0].text;

        } else {
            document.querySelector('#createEditCriteriaHeader').textContent = "Create Criteria";
            document.querySelector('#submitCriteria').value = "Create Criteria";
        }
    });
}

export default onload;