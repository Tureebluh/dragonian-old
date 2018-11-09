import AdminContestOnLoad from './contest/AdminContestOnLoad';
import AdminContestSubOnLoad from './contest/AdminContestSubOnLoad';
import AdminShuffleOnLoad from './shuffle/AdminShuffleOnLoad';
import AdminRolesOnLoad from './AdminRolesOnLoad';
import AdminReportsOnLoad from './shuffle/AdminReportsOnLoad';
import CollabOnLoad from './collab/CollabOnLoad';
import ShuffleOnLoad from './shuffle/ShuffleOnLoad';
import ContestOnLoad from './contest/ContestOnLoad';
import ContestVoteOnLoad from './contest/ContestVoteOnLoad';
import ContestJudgeOnLoad from './contest/ContestJudgeOnLoad';
import ContestResultsOnLoad from './contest/ContestResultsOnLoad';



//Can only have one window function in bundle.js, so we're checking the pathname to see which page the user is on
window.onload = function(){
    /******************************************************** 
                        ADMIN-CONTEST
    *********************************************************/
    if(window.location.pathname === '/admin/contest/' || window.location.pathname === '/admin/contest'){
        AdminContestOnLoad();
    }

    /******************************************************** 
                        ADMIN-SHUFFLE
    *********************************************************/
    if(window.location.pathname === '/admin/shuffle/' || window.location.pathname === '/admin/shuffle'){
        AdminShuffleOnLoad();
    }

    /******************************************************** 
                    ADMIN-ROLE MANAGEMENT
    *********************************************************/
    if(window.location.pathname === '/admin/roles/' || window.location.pathname === '/admin/roles'){
        AdminRolesOnLoad();
    }

    /******************************************************** 
                    ADMIN-ROLE MANAGEMENT
    *********************************************************/
    if(window.location.pathname === '/admin/reports/' || window.location.pathname === '/admin/reports'){
        AdminReportsOnLoad();
    }

    /******************************************************** 
                    ADMIN-CONTEST-SUBMISSIONS MANAGEMENT
    *********************************************************/
    if(window.location.pathname === '/admin/contest/submissions' || window.location.pathname === '/admin/contest/submissions/'){
        AdminContestSubOnLoad();
    }

    /******************************************************** 
                            COLLAB
    *********************************************************/
    if(window.location.pathname === "/collabs/" || window.location.pathname === "/collabs"){
        CollabOnLoad();
    }

    /******************************************************** 
                            SHUFFLE
    *********************************************************/
    if(window.location.pathname === "/shuffle/" || window.location.pathname === "/shuffle"){
        ShuffleOnLoad();
    }

    /******************************************************** 
                            CONTEST
    *********************************************************/
    if(window.location.pathname === '/contest/' || window.location.pathname === '/contest'){
        ContestOnLoad();
    }

    /******************************************************** 
                        CONTEST-VOTING
    *********************************************************/
    if(window.location.pathname === '/contest/vote/' || window.location.pathname === '/contest/vote'){
        ContestVoteOnLoad();
    }

    /******************************************************** 
                        CONTEST-JUDGING
    *********************************************************/
    if(window.location.pathname === '/contest/judge/' || window.location.pathname === '/contest/judge'){
        ContestJudgeOnLoad();
    }

    /******************************************************** 
                        CONTEST-RESULTS
    *********************************************************/
    if(window.location.pathname === '/contest/results/' || window.location.pathname === '/contest/results'){
        ContestResultsOnLoad();
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

//If user is an admin
if(document.querySelector('#adminPanel') !== null){
    document.querySelector('#adminPanel').addEventListener('click', (event)=>{
        document.getElementById("adminDropdown").classList.toggle("show");
    });
}