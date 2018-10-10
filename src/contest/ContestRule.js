class ContestRule {
    constructor(contest_rule_ID, rule){
        this._contest_rule_ID = contest_rule_ID;
        this._rule = rule;
    }

    set contest_rule_ID(contest_rule_ID){
        this._contest_rule_ID = contest_rule_ID;
    }
    get contest_rule_ID(){
        return this._contest_rule_ID;
    }

    set rule(rule){
        this._rule = rule;
    }
    get rule(){
        return this._rule;
    }

    getRuleOption(){
        let node = document.createElement("OPTION");
        node.value = this._contest_rule_ID;
        let textnode = document.createTextNode(this._rule);
        node.appendChild(textnode);
        return node;
    }
}

export default ContestRule;