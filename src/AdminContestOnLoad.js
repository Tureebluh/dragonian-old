import ContestOption from './ContestOption';
import ContestRule from './ContestRule';
import ContestCriteriaOption from './ContestCriteriaOption';

var onload = () => {
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
}

export default onload;