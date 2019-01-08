import ContestResults from './ContestResults';
//Adding a comment to force a rebuild
const onload = () => {
    
    //Get total number of users who voted on contest
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

        //Get scores from judges for contest
        fetch('/api/contest/judged/scores', {credentials: 'include'})
        .then(res => {
            return res.json();
        }).then(resJson =>{
            if(resJson[0] !== 'undefined'){

                //Build table headers
                let thArray = ['Steam User', 'Submission Link', 'Judges Scores', 'Community Votes', 'Total Score'];
                thArray.forEach(element => {
                    let node = document.createElement("TH");
                    let textnode = document.createTextNode(element);
                    node.appendChild(textnode);
                    document.querySelector('#contestResultsTable').appendChild(node);
                });

                //Get all top contest submissions by community vote total
                fetch('/api/contest/judge/topsubs', {credentials: 'include'})
                .then(res => {
                    return res.json();
                }).then(votesJson => {
                    let resultsArray = [];

                    //Loop through all judge scores
                    resJson[0].forEach(result => {
                        let contestResults = {};

                        //Loop through all the submissions with their community vote amount
                        votesJson[0].forEach(element => {

                            //Compare judged element with voted element and build object
                            if(element.contest_submission_ID === result.contest_submission_ID){
                                contestResults = new ContestResults(result.contest_submission_ID, element.total, voterObj.voters,
                                                         result.judges_max, result.judges_total, result.personaname, result.avatarfull, result.workshop_URL);
                                //Store object in array
                                resultsArray.push(contestResults);
                            }
                        });
                    });

                    //Sort each submission by the result of finalScore() descending (highest score first)
                    let sorted = resultsArray.sort((a,b)=>{
                        return a.finalScore > b.finalScore ? -1 : 1;
                    });

                    //Add name of contest to header
                    document.querySelector('#contestName').textContent = "" + votesJson[0][0]['Name'];

                    //Add each submissions scores to table
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