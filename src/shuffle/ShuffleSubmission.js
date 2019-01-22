class ShuffleSubmission {
    constructor(SteamID, avatarfull, personaname, r1_workshop_URL, r2_SteamID, r2_workshop_URL, r3_SteamID, r3_workshop_URL, r4_SteamID, r4_workshop_URL){
        this._SteamID = SteamID;
        this._avatarfull = avatarfull;
        this._personaname = personaname;
        this._r1_workshop_URL = r1_workshop_URL;
        this._r2_workshop_URL = r2_workshop_URL;
        this._r3_workshop_URL = r3_workshop_URL;
        this._r4_workshop_URL = r4_workshop_URL;
        this._r2_SteamID = r2_SteamID;
        this._r3_SteamID = r3_SteamID;
        this._r4_SteamID = r4_SteamID;
    }
    set SteamID(SteamID){
        this._SteamID = SteamID;
    }
    get SteamID(){
        return this._SteamID;
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

    set r1_workshop_URL(r1_workshop_URL){
        this._r1_workshop_URL = r1_workshop_URL;
    }
    get r1_workshop_URL(){
        return this._r1_workshop_URL;
    }
    set r2_workshop_URL(r2_workshop_URL){
        this._r2_workshop_URL = r2_workshop_URL;
    }
    get r2_workshop_URL(){
        return this._r2_workshop_URL;
    }
    set r3_workshop_URL(r3_workshop_URL){
        this._r3_workshop_URL = r3_workshop_URL;
    }
    get r3_workshop_URL(){
        return this._r3_workshop_URL;
    }
    set r4_workshop_URL(r4_workshop_URL){
        this._r4_workshop_URL = r4_workshop_URL;
    }
    get r4_workshop_URL(){
        return this._r4_workshop_URL;
    }

    set r2_SteamID(r2_SteamID){
        this._r2_SteamID = r2_SteamID;
    }
    get r2_SteamID(){
        return this._r2_SteamID;
    }
    set r3_SteamID(r3_SteamID){
        this._r3_SteamID = r3_SteamID;
    }
    get r3_SteamID(){
        return this._r3_SteamID;
    }
    set r4_SteamID(r4_SteamID){
        this._r4_SteamID = r4_SteamID;
    }
    get r4_SteamID(){
        return this._r4_SteamID;
    }
}

export default ShuffleSubmission;