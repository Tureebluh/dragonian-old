

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
                tempString += "<td><img data-id='" + element['shuffle_report_ID'] + "' class='goodShuffle' style='max-height: 25%; max-width: 25%; cursor: pointer;' src='/img/yes.svg' /></td>";
                tempString += "<td><img data-id='" + element['shuffle_report_ID'] + "' class='badShuffle' style='max-height: 25%; max-width: 25%; cursor: pointer;' src='/img/no.svg' /></td>";
            tempString += "</tr>";
        });
        document.querySelector('#shuffleReportTable').innerHTML = tempString;

        document.querySelectorAll('.goodShuffle').forEach(element => {
            element.addEventListener('click', (event) => {
                console.log(event.target.dataset.id);
            });
        });
        
        document.querySelectorAll('.badShuffle').forEach(element => {
            element.addEventListener('click', (event) => {
                console.log(event.target.dataset.id);
            });
        });
    }).catch(error => {console.error(error)});
}

export default onload;