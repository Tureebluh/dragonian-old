class ContestOption {
    constructor(contest_ID, Name){
        this._contest_ID = contest_ID;
        this._Name = Name;
    }

    set contest_ID(contest_ID){
        this._contest_ID = contest_ID;
    }
    get contest_ID(){
        return this._contest_ID;
    }

    set Name(Name){
        this._Name = Name;
    }
    get Name(){
        return this._Name;
    }

    getContestOption(){
        let node = document.createElement("OPTION");
        node.value = this._contest_ID;
        let textnode = document.createTextNode(this._Name);
        node.appendChild(textnode);
        return node;
    }
}

export default ContestOption;