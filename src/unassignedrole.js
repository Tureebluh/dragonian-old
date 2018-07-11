class UnassignedRole {
    constructor(Name, personaname, avatarfull, collab_role_assoc_ID, collab_role, comment, CreatedDate) {
        this.Name = Name;
        this.personaname = personaname;
        this.avatarfull = avatarfull;
        this.collab_role_assoc_ID = collab_role_assoc_ID;
        this.collab_role = collab_role;
        this.comment = comment;
        this.CreatedDate = CreatedDate;
    }

    get Name(){
        return this.Name;
    }
    get personaname(){
        return this.personaname;
    }
    get avatarfull(){
        return this.avatarfull;
    }
    get collab_role(){
        return this.collab_role;
    }
    get collab_role_assoc_ID(){
        return this.collab_role_assoc_ID;
    }
    get comment(){
        return this.comment;
    }
    get CreatedDate(){
        return this.CreatedDate;
    }

    unassignedRoleDiv(){
        let tempString = "";
        tempString += "<div class=\"unassignedRole\" data-collab_role_assoc_ID=\"" + this.collab_role_assoc_ID + "\">";
            tempString += "<span class=\"Name\">" + this.Name + "</span>";
            tempString += "<span class=\"personaname\">" + this.personaname + "<img src=\"" + this.avatarfull + "\" alt=\"Steam Profile Picture\" />" + "</span>";
            tempString += "<span class=\"collab_role\">" + this.collab_role + "</span>";
            tempString += "<span class=\"comment\">" + this.comment + "</span>";
            tempString += "<span class=\"CreatedDate\">" + this.CreatedDate + "</span>";
        return tempString;
    }
}