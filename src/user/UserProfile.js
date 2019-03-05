class UserProfile {
    constructor(CreatedDate, LastLogIn, avatarfull, personaname, verified){
        this._CreatedDate = CreatedDate;
        this._LastLogIn = LastLogIn;
        this._avatarfull = avatarfull;
        this._personaname = personaname;
        this._verified = verified;
    }

    set CreatedDate(CreatedDate){
        this._CreatedDate = CreatedDate;
    }
    get CreatedDate(){
        return this._CreatedDate;
    }

    set LastLogIn(LastLogIn){
        this._LastLogIn = LastLogIn;
    }
    get LastLogIn(){
        return this._LastLogIn;
    }

    set avatarfull(avatarfull){
        this._avatarfull = avatarfull;
    }
    get avatarfull(){
        return this._avatarfull;
    }

    set personaname(personaname){
        this._personaname = personaname;
    }
    get personaname(){
        return this._personaname;
    }

    set verified(verified){
        this._verified = verified;
    }
    get verified(){
        return this._verified;
    }

    userProfileDiv(){
        let tempString = '';
        tempString += '<h1>User Profile</h1>';
        tempString += '<h2><img src="' + this._avatarfull + '"/> &nbsp;' + this._personaname + '</h2>';
        tempString += '<br>';
        tempString += '<div class="dates">';
            tempString += '<span>Last login: ' + this._LastLogIn.toDateString() + '</span>';
            tempString += '<span>Member since: ' + this._CreatedDate.toDateString() + '</span>';
        tempString += '</div>';
        
        if(this._verified !== 1){
            tempString += '<h3 id="userVerified" class="error-notification">Not Verified<br><a href="/auth/verification/failed">Why am I seeing this?</a></h3>';
        } else {
            tempString += '<h3 id="userVerified" class="success-notification">Verified</h3>';
        }
        
        return tempString;
    }

    userShuffleDiv(){
        let tempString = '';

        tempString += '<h3>Completed Shuffles</h3>';
        tempString += '<br>';
        tempString += '<div class="link-container">';

            this.shuffles.forEach(element => {
                if(element['r4_workshop_URL']){
                    tempString += '<a target="_BLANK" href="' + element['r4_workshop_URL'] + '">' + element.Name + '</a>';
                }
            });
            
        tempString += '</div>';
        return tempString;
    }

    userContestDiv(){
        let tempString = '';

        tempString += '<h3>Completed Contest</h3>';
        tempString += '<br>';
        tempString += '<div class="link-container">';

            this.contests.forEach(element => {
                tempString += '<a target="_BLANK" href="' + element['workshop_URL'] + '">' + element.Name + '</a>';
            });
        
        tempString += '</div>';
        return tempString;
    }
}

export default UserProfile;