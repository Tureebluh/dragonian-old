import ContestResults from './ContestResults';

var onload = () => {
    fetch('/api/contest/voters/judged', {credentials: 'include'})
    .then(res => {
        return res.json();
    }).then(resJson =>{
        if(resJson[0][0].voters !== 0){
            return resJson[0][0];
        } else {
            return {};
        }
    }).then(voterObj => {
        fetch('/api/contest/judged/scores', {credentials: 'include'})
        
        .then(res => {
            return res.json();
        }).then(resJson =>{
            if(resJson[0] !== 'undefined'){
                let thArray = ['Steam User', 'Submission Link', 'Judges Scores', 'Community Votes', 'Total Score'];
                thArray.forEach(element => {
                    let node = document.createElement("TH");
                    let textnode = document.createTextNode(element);
                    node.appendChild(textnode);
                    document.querySelector('#contestResultsTable').appendChild(node);
                });
                fetch('/api/contest/judge/topsubs', {credentials: 'include'})
                
                .then(res => {
                    return res.json();
                }).then(votesJson => {
                    let resultsArray = [];
                    resJson[0].forEach(result => {
                        let contestResults = {};
                        votesJson[0].forEach(element => {
                            if(element.contest_submission_ID === result.contest_submission_ID){
                                contestResults = new ContestResults(result.contest_submission_ID, element.total, voterObj.voters,
                                                         result.judges_max, result.judges_total, result.personaname, result.avatarfull, result.workshop_URL);
                                resultsArray.push(contestResults);
                            }
                        });
                    });
                    let sorted = resultsArray.sort((a,b)=>{
                        return a.finalScore > b.finalScore ? -1 : 1;
                    });
                    sorted.forEach(obj => {
                        let node = obj.getResultTR();
                        document.querySelector('#contestResultsTable').appendChild(node);
                    });
                    
                }).catch(error => {console.error(error)});
            }
        }).catch(error => {console.error(error)});
    }).catch(error => {console.error(error)});
}

export default onload;