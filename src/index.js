import AdminContestOnLoad from './admin/AdminContestOnLoad';
import AdminContestSubOnLoad from './admin/AdminContestSubOnLoad';
import AdminShuffleOnLoad from './admin/AdminShuffleOnLoad';
import AdminRolesOnLoad from './admin/AdminRolesOnLoad';
import AdminReportsOnLoad from './admin/AdminReportsOnLoad';

import ProfileMeOnLoad from './user/ProfileMeOnLoad';

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
                    ADMIN-CONTEST-SUBMISSIONS MANAGEMENT
    *********************************************************/
    if(window.location.pathname === '/profile/me/' || window.location.pathname === '/profile/me'){
        ProfileMeOnLoad();
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
    if (!e.target.matches('.dropbtn') && !e.target.matches('.dropbtnhr')) {
        document.querySelector("#dropdownContent").classList.remove('show');
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

//Open navbar if user clicks dropbtn
document.querySelector('.dropbtn').addEventListener('click', (event)=>{
    document.getElementById("dropdownContent").classList.toggle("show");
});
//Open navbar if user clicks dropbtn
document.querySelector('.dropbtnhr').addEventListener('click', (event)=>{
    document.getElementById("dropdownContent").classList.toggle("show");
});
