import ChangeEvents from './ChangeEvents';
import CollabOnLoad from './CollabOnLoad';
import AdminContestOnLoad from './AdminContestOnLoad';
import ContestOnLoad from './ContestOnLoad';
import ContestVoteOnLoad from './ContestVoteOnLoad';



//Can only have one window function in bundle.js, so we're checking the pathname to see which page the user is on
window.onload = function(){
    /******************************************************** 
                            COLLAB
    *********************************************************/
    if(window.location.pathname === "/collabs"){
        CollabOnLoad();
    }

    /******************************************************** 
                        ADMIN-CONTEST
    *********************************************************/
    if(window.location.pathname === '/admin/contest'){
        AdminContestOnLoad();
    }

    /******************************************************** 
                            CONTEST
    *********************************************************/
    if(window.location.pathname === '/contest'){
        ContestOnLoad();
    }

    /******************************************************** 
                        CONTEST-VOTING
    *********************************************************/
    if(window.location.pathname === '/contest/vote/'){
        ContestVoteOnLoad();
    }
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
    if(document.querySelector('#adminDropdown') !== null){
        if (!e.target.matches('.dropbtn')) {
            var myDropdown = document.getElementById("adminDropdown");
            if (myDropdown.classList.contains('show')) {
                myDropdown.classList.remove('show');
            }
        }
    }
}

//If user scrolls down page
window.onscroll = function() {
    if(document.querySelector('#backToTop') !== null){
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            document.getElementById("backToTop").style.display = "block";
        } else {
            document.getElementById("backToTop").style.display = "none";
        }
    }
}