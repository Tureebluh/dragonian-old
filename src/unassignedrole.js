class UnassignedRole {
    constructor(Name, personaname, avatarfull, collab_role_assoc_ID, collab_role, comment, CreatedDate) {
        this._Name = Name;
        this._personaname = personaname;
        this._avatarfull = avatarfull;
        this._collab_role_assoc_ID = collab_role_assoc_ID;
        this._collab_role = collab_role;
        this._comment = comment;
        this._CreatedDate = CreatedDate;
    }

    set Name(Name){
        this._Name = Name;
    }
    get Name(){
        return this._Name;
    }

    set personaname(personaname){
        this._personaname = personaname;
    }
    get personaname(){
        return this._personaname;
    }

    set avatarfull(avatarfull){
        this._avatarfull = avatarfull;
    }
    get avatarfull(){
        return this._avatarfull;
    }

    set collab_role_assoc_ID(collab_role_assoc_ID){
        this._collab_role_assoc_ID = collab_role_assoc_ID;
    }
    get collab_role_assoc_ID(){
        return this._collab_role_assoc_ID;
    }

    set collab_role(collab_role){
        this._collab_role = collab_role;
    }
    get collab_role(){
        return this._collab_role;
    }

    set comment(comment){
        this._comment = comment;
    }
    get comment(){
        return this._comment;
    }

    set CreatedDate(CreatedDate){
        this._CreatedDate = CreatedDate;
    }
    get CreatedDate(){
        return this._CreatedDate;
    }

    unassignedRoleDiv(){
        let tempString = "";
        tempString += "<div class=\"unassignedRole\" data-collab_role_assoc_ID=\"" + this._collab_role_assoc_ID + "\">";
            tempString += "<span class=\"Name\">" + this._Name + "</span>";
            tempString += "<span class=\"personaname\">" + this._personaname + "<img src=\"" + this._avatarfull + "\" alt=\"Steam Profile Picture\" />" + "</span>";
            tempString += "<span class=\"collab_role\">" + this._collab_role + "</span>";
            tempString += "<span class=\"comment\">" + this._comment + "</span>";
            tempString += "<span class=\"CreatedDate\">" + this._CreatedDate + "</span>";
            tempString += "<input class=\"btn_apply_role\" type=\"button\" value=\"submit\" />";
        tempString += "</div>";
        return tempString;
    }
}

export default UnassignedRole;

