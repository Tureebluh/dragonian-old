

const onload = () => {

    fetch('/admin/reports/shuffle/unread', {credentials: 'include'})
    .then(res => {
        return res.json();
    })
    .then(resJson => {
        let tempString = "";
        tempString += "<th>Steam Workshop Link</th>";
        tempString += "<th>Good</th>";
        tempString += "<th>Bad</th>";
        resJson[0].forEach(element => {
            tempString += "<tr>";
                tempString += "<td><a target='_BLANK' href='" + element.workshopURL + "'>Reported Link</a></td>";
                tempString += "<td><img data-valid='1' data-id='" + element['shuffle_report_ID'] + "' class='shuffleReportAction' style='max-height: 30%; max-width: 30%; cursor: pointer;' src='/img/yes.svg' /></td>";
                tempString += "<td><img data-valid='0' data-id='" + element['shuffle_report_ID'] + "' class='shuffleReportAction' style='max-height: 30%; max-width: 30%; cursor: pointer;' src='/img/no.svg' /></td>";
            tempString += "</tr>";
        });
        document.querySelector('#shuffleReportTable').innerHTML = tempString;

        document.querySelectorAll('.shuffleReportAction').forEach(element => {
            element.addEventListener('click', (event) => {
                let payload = {
                    shuffleReportID: event.target.dataset.id,
                    isValid: parseInt(event.target.dataset.valid)
                };
                
                fetch('/admin/reports/shuffle/validate', {
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
                    if(resJson.result === 'Success'){
                        //Visually remove the tr from the page render so user knows they've already checked this one
                        event.target.parentElement.parentElement.setAttribute('style', 'display:none');
                        document.querySelector('#showErrorSuccess').innerHTML = 
                            '<h1 class="success-notification">Shuffle Report Updated & Removed From List</h1>';
                        setTimeout(()=>{
                            document.querySelector('#showErrorSuccess').innerHTML = "";
                        }, 10000);
                    }
                }).catch(error => {console.error(error)});
            });
        });
    }).catch(error => {console.error(error)});
}

export default onload;