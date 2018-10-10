class UserOption {
    constructor(SteamID, personaname){
        this._SteamID = SteamID;
        this._personaname = personaname;
    }

    set SteamID(SteamID){
        this._SteamID = SteamID;
    }
    get SteamID(){
        return this._SteamID;
    }

    set personaname(personaname){
        this._personaname = personaname;
    }
    get personaname(){
        return this._personaname;
    }

    getUserOption(){
        let node = document.createElement("OPTION");
        node.value = this._SteamID;
        let textnode = document.createTextNode(this._personaname);
        node.appendChild(textnode);
        return node;
    }
}

export default UserOption;