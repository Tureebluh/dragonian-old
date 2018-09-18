/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ChangeEvents = __webpack_require__(7);

var _ChangeEvents2 = _interopRequireDefault(_ChangeEvents);

var _CollabOnLoad = __webpack_require__(8);

var _CollabOnLoad2 = _interopRequireDefault(_CollabOnLoad);

var _AdminContestOnLoad = __webpack_require__(9);

var _AdminContestOnLoad2 = _interopRequireDefault(_AdminContestOnLoad);

var _ContestOnLoad = __webpack_require__(10);

var _ContestOnLoad2 = _interopRequireDefault(_ContestOnLoad);

var _ContestVoteOnLoad = __webpack_require__(11);

var _ContestVoteOnLoad2 = _interopRequireDefault(_ContestVoteOnLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Can only have one window function in bundle.js, so we're checking the pathname to see which page the user is on
window.onload = function () {
    /******************************************************** 
                            COLLAB
    *********************************************************/
    if (window.location.pathname === "/collabs") {
        (0, _CollabOnLoad2.default)();
    }

    /******************************************************** 
                        ADMIN-CONTEST
    *********************************************************/
    if (window.location.pathname === '/admin/contest') {
        (0, _AdminContestOnLoad2.default)();
    }

    /******************************************************** 
                            CONTEST
    *********************************************************/
    if (window.location.pathname === '/contest') {
        (0, _ContestOnLoad2.default)();
    }

    /******************************************************** 
                        CONTEST-VOTING
    *********************************************************/
    if (window.location.pathname === '/contest/vote/') {
        (0, _ContestVoteOnLoad2.default)();
    }
};

// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
    if (document.querySelector('#adminDropdown') !== null) {
        if (!e.target.matches('.dropbtn')) {
            var myDropdown = document.getElementById("adminDropdown");
            if (myDropdown.classList.contains('show')) {
                myDropdown.classList.remove('show');
            }
        }
    }
};

//If user scrolls down page
window.onscroll = function () {
    if (document.querySelector('#backToTop') !== null) {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            document.getElementById("backToTop").style.display = "block";
        } else {
            document.getElementById("backToTop").style.display = "none";
        }
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UnassignedRole = function () {
    function UnassignedRole(Name, personaname, avatarfull, collab_role_assoc_ID, collab_role, comment, CreatedDate) {
        _classCallCheck(this, UnassignedRole);

        this._Name = Name;
        this._personaname = personaname;
        this._avatarfull = avatarfull;
        this._collab_role_assoc_ID = collab_role_assoc_ID;
        this._collab_role = collab_role;
        this._comment = comment;
        this._CreatedDate = CreatedDate;
    }

    _createClass(UnassignedRole, [{
        key: "unassignedRoleDiv",
        value: function unassignedRoleDiv() {
            var tempString = "";
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
    }, {
        key: "Name",
        set: function set(Name) {
            this._Name = Name;
        },
        get: function get() {
            return this._Name;
        }
    }, {
        key: "personaname",
        set: function set(personaname) {
            this._personaname = personaname;
        },
        get: function get() {
            return this._personaname;
        }
    }, {
        key: "avatarfull",
        set: function set(avatarfull) {
            this._avatarfull = avatarfull;
        },
        get: function get() {
            return this._avatarfull;
        }
    }, {
        key: "collab_role_assoc_ID",
        set: function set(collab_role_assoc_ID) {
            this._collab_role_assoc_ID = collab_role_assoc_ID;
        },
        get: function get() {
            return this._collab_role_assoc_ID;
        }
    }, {
        key: "collab_role",
        set: function set(collab_role) {
            this._collab_role = collab_role;
        },
        get: function get() {
            return this._collab_role;
        }
    }, {
        key: "comment",
        set: function set(comment) {
            this._comment = comment;
        },
        get: function get() {
            return this._comment;
        }
    }, {
        key: "CreatedDate",
        set: function set(CreatedDate) {
            this._CreatedDate = CreatedDate;
        },
        get: function get() {
            return this._CreatedDate;
        }
    }]);

    return UnassignedRole;
}();

exports.default = UnassignedRole;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Contest = function () {
    function Contest(contest_ID, Name, SubmissionStartDate, SubmissionEndDate, VoteStartDate, VoteEndDate, Description, rules, submitted) {
        _classCallCheck(this, Contest);

        this._contest_ID = contest_ID;
        this._Name = Name;
        this._SubmissionStartDate = SubmissionStartDate;
        this._SubmissionEndDate = SubmissionEndDate;
        this._VoteStartDate = VoteStartDate;
        this._VoteEndDate = VoteEndDate;
        this._Description = Description;
        this._rules = rules;
        this._submitted = submitted;
    }

    _createClass(Contest, [{
        key: "activeContestDiv",


        //Builds Contest Div using object
        value: function activeContestDiv() {
            var tempString = "";
            tempString += "<div class=\"contest-banner-container\">";
            tempString += "<div class=\"Name\"><h1>" + this._Name + "</h1></div>";
            tempString += "<br>";
            tempString += "<div class=\"sml-container\">";
            tempString += "<span class=\"SubmissionStartDate\"><h2>Start</h2>" + this._SubmissionStartDate.toString() + "</span>";
            tempString += "<span class=\"SubmissionEndDate\"><h2>End</h2>" + this._SubmissionEndDate.toString() + "</span>";
            tempString += "</div>";
            tempString += "<br>";
            tempString += "<div class=\"sml-container\">";
            tempString += "<span class=\"VoteStartDate\"><h2>Vote Start</h2>" + this._VoteStartDate.toString() + "</span>";
            tempString += "<span class=\"VoteEndDate\"><h2>Vote End</h2>" + this._VoteEndDate.toString() + "</span>";
            tempString += "</div>";
            tempString += "</div>";
            tempString += "<br>";
            tempString += "<div class=\"Description\"><h2>Summary</h2>" + this._Description + "</div>";
            tempString += "<br>";
            tempString += "<h1>Rules</h1>";
            tempString += "<div id=\"rulesDiv\">";
            if (this._rules !== null) {
                this._rules.forEach(function (tempRule) {
                    tempString += "<div class=\"rule\">&bull; " + tempRule.rule + "</div>";
                });
            }
            tempString += "</div>";
            tempString += "<br>";
            return tempString;
        }
    }, {
        key: "entryOrVote",
        value: function entryOrVote() {
            if (this.VoteStartDate < Date.now()) {
                var tempString = '';
                tempString += '<form action="/contest/vote/" method="post" class="contestVotingForm">';
                tempString += '<input type="hidden" id="contestIDHidden" name="contestID">';
                tempString += '<input type="submit" alt="Go To Voting Page" value="Vote On Contest">';
                tempString += '</form>';
                return tempString;
            } else if (this.submitted !== 1 && this.SubmissionEndDate > Date.now()) {
                var _tempString = "";
                _tempString += '<h2 id="submissionHeader">Contest Entry</h2>';
                _tempString += '<form action="/api/contest/submit/" method="post" class="contestSubmissionForm">';
                _tempString += '<input type="hidden" id="contestIDHidden" name="contestID">';
                _tempString += '<input type="url" id="submissionURL" name="submissionURL" placeholder="https://steamcommunity.com/sharedfiles/filedetails/?id=XXXXXXXXXX" required/>';
                _tempString += '<br>';
                _tempString += '<br>';
                _tempString += '<span>';
                _tempString += '<input type="checkbox" id="verifySubmissionCB" name="verifySubmissionCB" required> By ticking this box and clicking the button("Submit Entry"), I agree and acknowledge that this is my own work';
                _tempString += ' and is associated with this Steam&#174; account. Violating these terms will result in the immediate and irrevocable termination of my privileges on this website.<br>';
                _tempString += '<br>';
                _tempString += '<input type="submit" id="submitContestUser" alt="Submit To Contest" value="Submit Entry">';
                _tempString += '</span>';
                _tempString += '</form>';
                return _tempString;
            } else if (this.submitted === 1 && this.SubmissionEndDate > Date.now()) {
                var _tempString2 = "";
                _tempString2 += '<h2 id="submissionHeader" class="success-notification">Awesome!<br>We have your submission!</h2>';
                _tempString2 += '<input type="hidden" id="contestIDHidden" name="contestID">';
                return _tempString2;
            } else if (this.SubmissionEndDate < Date.now() && this.VoteStartDate > Date.now()) {
                var _tempString3 = "";
                _tempString3 += '<input type="hidden" id="contestIDHidden" name="contestID">';
                var hoursUntil = Math.round((this.VoteStartDate.getTime() - Date.now()) / 1000 / 60 / 60);
                if (hoursUntil > 0) {
                    hoursUntil += ' hour(s)';
                } else {
                    hoursUntil = Math.round((this.VoteStartDate.getTime() - Date.now()) / 1000 / 60) + ' minute(s)';
                }
                _tempString3 += '<h2 id="submissionHeader">Community voting for this contest will begin in ' + hoursUntil + '.<br>Be sure to check out the stream to see all the contest submissions before the voting goes live!</h2>';
                _tempString3 += '<a href="https://www.twitch.tv/r3ddragons" target="_blank"><img src="img/twitch_purple_combo.svg"></a>';
                return _tempString3;
            }
        }
    }, {
        key: "Name",
        set: function set(Name) {
            this._Name = Name;
        },
        get: function get() {
            return this._Name;
        }
    }, {
        key: "contest_ID",
        set: function set(contest_ID) {
            this._contest_ID = contest_ID;
        },
        get: function get() {
            return this._contest_ID;
        }
    }, {
        key: "SubmissionStartDate",
        set: function set(SubmissionStartDate) {
            this._SubmissionStartDate = SubmissionStartDate;
        },
        get: function get() {
            return this._SubmissionStartDate;
        }
    }, {
        key: "SubmissionEndDate",
        set: function set(SubmissionEndDate) {
            this._SubmissionEndDate = SubmissionEndDate;
        },
        get: function get() {
            return this._SubmissionEndDate;
        }
    }, {
        key: "VoteStartDate",
        set: function set(VoteStartDate) {
            this._VoteStartDate = VoteStartDate;
        },
        get: function get() {
            return this._VoteStartDate;
        }
    }, {
        key: "VoteEndDate",
        set: function set(VoteEndDate) {
            this._VoteEndDate = VoteEndDate;
        },
        get: function get() {
            return this._VoteEndDate;
        }
    }, {
        key: "Description",
        set: function set(Description) {
            this._Description = Description;
        },
        get: function get() {
            return this._Description;
        }
    }, {
        key: "rules",
        set: function set(rules) {
            this._rules = rules;
        },
        get: function get() {
            return this._rules;
        }
    }, {
        key: "submitted",
        set: function set(submitted) {
            this._submitted = submitted;
        },
        get: function get() {
            return this._submitted;
        }
    }]);

    return Contest;
}();

exports.default = Contest;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContestOption = function () {
    function ContestOption(contest_ID, Name) {
        _classCallCheck(this, ContestOption);

        this._contest_ID = contest_ID;
        this._Name = Name;
    }

    _createClass(ContestOption, [{
        key: "getContestOption",
        value: function getContestOption() {
            var node = document.createElement("OPTION");
            node.value = this._contest_ID;
            var textnode = document.createTextNode(this._Name);
            node.appendChild(textnode);
            return node;
        }
    }, {
        key: "contest_ID",
        set: function set(contest_ID) {
            this._contest_ID = contest_ID;
        },
        get: function get() {
            return this._contest_ID;
        }
    }, {
        key: "Name",
        set: function set(Name) {
            this._Name = Name;
        },
        get: function get() {
            return this._Name;
        }
    }]);

    return ContestOption;
}();

exports.default = ContestOption;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContestRule = function () {
    function ContestRule(contest_rule_ID, rule) {
        _classCallCheck(this, ContestRule);

        this._contest_rule_ID = contest_rule_ID;
        this._rule = rule;
    }

    _createClass(ContestRule, [{
        key: "getRuleOption",
        value: function getRuleOption() {
            var node = document.createElement("OPTION");
            node.value = this._contest_rule_ID;
            var textnode = document.createTextNode(this._rule);
            node.appendChild(textnode);
            return node;
        }
    }, {
        key: "contest_rule_ID",
        set: function set(contest_rule_ID) {
            this._contest_rule_ID = contest_rule_ID;
        },
        get: function get() {
            return this._contest_rule_ID;
        }
    }, {
        key: "rule",
        set: function set(rule) {
            this._rule = rule;
        },
        get: function get() {
            return this._rule;
        }
    }]);

    return ContestRule;
}();

exports.default = ContestRule;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContestSubmission = function () {
    function ContestSubmission(contest_submission_ID, workshop_URL, personaname, avatarfull) {
        _classCallCheck(this, ContestSubmission);

        this._contest_submission_ID = contest_submission_ID;
        this._workshop_URL = workshop_URL;
        this._personaname = personaname;
        this._avatarfull = avatarfull;
    }

    _createClass(ContestSubmission, [{
        key: 'getSubmissionDiv',
        value: function getSubmissionDiv() {
            var tempString = "";
            tempString += '<div class="contest-submission" id="contestSubmission' + this._contest_submission_ID + '">';
            tempString += '<span class="steaminfo"><img src="' + this._avatarfull + '" class="submission-avatar" />&nbsp;' + this._personaname + '</span>';
            tempString += '<br>';
            tempString += '<a href="' + this._workshop_URL + '" target="_blank" class="contest-submission-url">Submission Link</a>';
            tempString += '</div>';

            return tempString;
        }
    }, {
        key: 'getSubmissionOption',
        value: function getSubmissionOption() {
            var node = document.createElement("OPTION");
            node.value = this._contest_submission_ID;
            var textnode = document.createTextNode(this._personaname);
            node.appendChild(textnode);
            return node;
        }
    }, {
        key: 'contest_submission_ID',
        set: function set(contest_submission_ID) {
            this._contest_submission_ID = contest_submission_ID;
        },
        get: function get() {
            return this._contest_submission_ID;
        }
    }, {
        key: 'workshop_URL',
        set: function set(workshop_URL) {
            this._workshop_URL = workshop_URL;
        },
        get: function get() {
            return this._workshop_URL;
        }
    }, {
        key: 'personaname',
        set: function set(personaname) {
            this._personaname = personaname;
        },
        get: function get() {
            return this._personaname;
        }
    }, {
        key: 'avatarfull',
        set: function set(avatarfull) {
            this._avatarfull = avatarfull;
        },
        get: function get() {
            return this._avatarfull;
        }
    }]);

    return ContestSubmission;
}();

exports.default = ContestSubmission;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (window.location.pathname === '/admin/contest') {
    //When admin selects contest from dropdown list
    document.querySelector('#contestNameDropdown').addEventListener('change', function (event) {
        if (event.target.value !== '0') {
            fetch('/api/contest/all/' + event.target.value, { credentials: 'include' }).then(function (res) {
                return res.json();
            }).then(function (resJson) {
                var temp = resJson[0][0];

                var subStart = new Date(temp.SubmissionStartDate.toString());
                var offset = 14;
                subStart.setHours(subStart.getHours() - offset);

                var subEnd = new Date(temp.SubmissionEndDate.toString());
                subEnd.setHours(subEnd.getHours() - offset);

                var voteStart = new Date(temp.VoteStartDate.toString());
                voteStart.setHours(voteStart.getHours() - offset);

                var voteEnd = new Date(temp.VoteEndDate.toString());
                voteEnd.setHours(voteEnd.getHours() - offset);

                document.querySelector('#contestName').value = temp.Name;
                document.querySelector('#contestSubmissionStart').value = subStart.toISOString().replace('Z', '');
                document.querySelector('#contestSubmissionEnd').value = subEnd.toISOString().replace('Z', '');
                document.querySelector('#contestVoteStart').value = voteStart.toISOString().replace('Z', '');
                document.querySelector('#contestVoteEnd').value = voteEnd.toISOString().replace('Z', '');
                document.querySelector('#contestDescription').value = temp.Description;
                document.querySelector('#createEditContestHeader').textContent = "Edit Contest";
                document.querySelector('#submitContest').value = "Edit Contest";
                document.querySelector('#contestActive').checked = temp.Active.data[0] ? true : false;
                document.querySelector('#contestActive').disabled = false;
                document.querySelector('#contestRulesDropdown').disabled = false;

                //Fetch rules associated with contest_ID
                fetch('/api/contest/rules/' + event.target.value, { credentials: 'include' }).then(function (res) {
                    return res.json();
                }).then(function (resJson) {
                    var rules = resJson[0];
                    if (rules !== null) {
                        document.querySelector('#contestRulesDropdown').childNodes.forEach(function (tempOption) {
                            rules.forEach(function (element) {
                                if (tempOption.value == element.contest_rule_ID) {
                                    tempOption.selected = true;
                                    return;
                                }
                            });
                        });
                    }
                }).catch(function (error) {
                    return console.error(error);
                });
            }).catch(function (error) {
                console.error(error);
            });
        } else {
            document.querySelector('#createEditContestHeader').textContent = "Create Contest";
            document.querySelector('#submitContest').value = "Create Contest";
            document.querySelector('#contestActive').checked = true;
            document.querySelector('#contestActive').disabled = true;
            document.querySelector('#contestRulesDropdown').disabled = true;
        }
    });
    document.querySelector('#ruleNameDropdown').addEventListener('change', function (event) {
        if (event.target.value !== '0') {
            document.querySelector('#createEditRuleHeader').textContent = "Edit Rule";
            document.querySelector('#submitRule').value = "Edit Rule";
            document.querySelector('#contestRule').value = document.querySelector('#ruleNameDropdown').selectedOptions[0].text;
        } else {
            document.querySelector('#createEditRuleHeader').textContent = "Create Rule";
            document.querySelector('#submitRule').value = "Create Rule";
        }
    });
}
if (document.querySelector('#adminPanel') !== null) {
    document.querySelector('#adminPanel').addEventListener('click', function (event) {
        document.getElementById("adminDropdown").classList.toggle("show");
    });
}
if (window.location.pathname === '/contest/vote/') {
    document.querySelector('.jump-to-icon').addEventListener('click', function (event) {
        var tempString = '#contestSubmission' + document.querySelector('#' + event.target.id.toString().replace('Btn', '')).value;
        document.querySelector(tempString).scrollIntoView();
    });
    // document.querySelector('#secondPickBtn').addEventListener('click', (event) => {
    //     let tempString = '#contestSubmission' + document.querySelector('#secondPick').value;
    //     document.querySelector(tempString).scrollIntoView();
    // });
    // document.querySelector('#thirdPickBtn').addEventListener('click', (event) => {
    //     let tempString = '#contestSubmission' + document.querySelector('#thirdPick').value;
    //     document.querySelector(tempString).scrollIntoView();
    // });
    // document.querySelector('#fourthPickBtn').addEventListener('click', (event) => {
    //     let tempString = '#contestSubmission' + document.querySelector('#fourthPick').value;
    //     document.querySelector(tempString).scrollIntoView();
    // });
    // document.querySelector('#fifthPickBtn').addEventListener('click', (event) => {
    //     let tempString = '#contestSubmission' + document.querySelector('#fifthPick').value;
    //     document.querySelector(tempString).scrollIntoView();
    // });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _UnassignedRole = __webpack_require__(2);

var _UnassignedRole2 = _interopRequireDefault(_UnassignedRole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onload = function onload() {
    var unassignedRoles = '<h1>Page Currently Under Construction!</h1>';
    document.querySelector('#collabsDiv').innerHTML = unassignedRoles;
};

exports.default = onload;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ContestOption = __webpack_require__(4);

var _ContestOption2 = _interopRequireDefault(_ContestOption);

var _ContestRule = __webpack_require__(5);

var _ContestRule2 = _interopRequireDefault(_ContestRule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onload = function onload() {
    fetch('/api/contest/names/all', { credentials: 'include' }).then(function (res) {
        return res.json();
    }).then(function (resJson) {
        resJson[0].forEach(function (contest) {
            var node = new _ContestOption2.default(contest.contest_ID, contest.Name).getContestOption();
            document.querySelector('#contestNameDropdown').appendChild(node);
        });
    }).catch(function (error) {
        console.error(error);
    });

    fetch('/api/contest/rules', { credentials: 'include' }).then(function (res) {
        return res.json();
    }).then(function (resJson) {
        resJson[0].forEach(function (rule) {
            var node = new _ContestRule2.default(rule.contest_rule_ID, rule.rule).getRuleOption();
            document.querySelector('#ruleNameDropdown').appendChild(node);
            document.querySelector('#contestRulesDropdown').appendChild(node.cloneNode(true));
        });
    }).catch(function (error) {
        console.error(error);
    });
    //Display to user that contest was updated successfully
    if (document.URL.indexOf('result=success') !== -1) {
        document.querySelector('#showErrorSuccess').innerHTML = '<h1 class="success-notification">Contest updated successfully.</h1>';
    }
};

exports.default = onload;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Contest = __webpack_require__(3);

var _Contest2 = _interopRequireDefault(_Contest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onload = function onload() {
    //If user is on contest page, load the oldest active contest and pull all rules associated with that contest. Store all info in an object and call
    //call provided function to create HTML visual of data
    //NOTE: Cookies are not sent with fetch() by default, therefore {credentials} are supplied to server to authenticate fetch() request
    fetch('/api/contest/all/active', { credentials: 'include' }).then(function (res) {
        return res.json();
        //Return res in JSON form to next then()
    }).then(function (resJson) {
        if (typeof resJson[0][0] !== 'undefined') {
            var subStart = new Date(resJson[0][0].SubmissionStartDate);
            var offset = 7;
            subStart.setHours(subStart.getHours() - offset);

            var subEnd = new Date(resJson[0][0].SubmissionEndDate);
            subEnd.setHours(subEnd.getHours() - offset);

            var voteStart = new Date(resJson[0][0].VoteStartDate);
            voteStart.setHours(voteStart.getHours() - offset);

            var voteEnd = new Date(resJson[0][0].VoteEndDate);
            voteEnd.setHours(voteEnd.getHours() - offset);

            var activeContest = new _Contest2.default(resJson[0][0].contest_ID, resJson[0][0].Name, subStart, subEnd, voteStart, voteEnd, resJson[0][0].Description, null);
            return activeContest;
        } else {
            return {};
        }
        //Create obj and return to next then()
    }).then(function (contestObj) {
        if (contestObj.hasOwnProperty('_contest_ID')) {
            //Check if user has submitted to contest
            fetch('/api/contest/submission/check/' + contestObj.contest_ID, { credentials: 'include' }).then(function (res) {
                return res.json();
            }).then(function (resJson) {
                contestObj.submitted = resJson.submitted;
            }).then(function () {
                //Fetch rules associated with contest_ID
                fetch('/api/contest/rules/' + contestObj.contest_ID, { credentials: 'include' }).then(function (res) {
                    return res.json();
                }).then(function (resJson) {
                    contestObj.rules = resJson[0];
                    document.querySelector('#activeContest').innerHTML = contestObj.activeContestDiv();
                    document.querySelector('#submitEntrySection').innerHTML = contestObj.entryOrVote();
                    document.querySelector('#contestIDHidden').value = contestObj.contest_ID;
                }).catch(function (error) {
                    return console.error(error);
                });
            }).catch(function (error) {
                return console.error(error);
            });
        } else {
            document.querySelector('#activeContest').innerHTML = '<h1>No Contest Currently Running.<br>Check back soon!</h1>';
            document.querySelector('#submitEntrySection').innerHTML = '';
        }
    }).catch(function (error) {
        return console.error(error);
    });

    if (document.URL.indexOf('result=subsuccess') !== -1) {
        document.querySelector('#showErrorSuccess').innerHTML = '<h1 class="success-notification">Contest entry successfully submitted. Thank you for participating in the contest!</h1>';
    } else if (document.URL.indexOf('result=badurl') !== -1) {
        document.querySelector('#showErrorSuccess').innerHTML = '<h1 class="error-notification">The workshop link entered is not a valid workshop link. Please fix any issues with the link and try submitting again.</h1>';
    } else if (document.URL.indexOf('result=noterms') !== -1) {
        document.querySelector('#showErrorSuccess').innerHTML = '<h1 class="error-notification">You must agree to the terms of the contest by ticking the box at the bottom of the page. ' + 'Failure to agree to the terms will result in your submission not being entered.</h1>';
    } else if (document.URL.indexOf('result=votesuccess') !== -1) {
        document.querySelector('#showErrorSuccess').innerHTML = '<h1 class="success-notification">Your contest votes have been successfully submitted. Thank you for participating in the voting process!</h1>';
    } else if (document.URL.indexOf('result=votefail') !== -1) {
        document.querySelector('#showErrorSuccess').innerHTML = '<h1 class="error-notification">Oops! Something went wrong with your voting selections. Please visit the voting page and try again.</h1>';
    } else if (document.URL.indexOf('result=voteduplicate') !== -1) {
        document.querySelector('#showErrorSuccess').innerHTML = '<h1 class="error-notification">You cannot vote for the same submission more than once. Please visit the voting page and try again.</h1>';
    }
};

exports.default = onload;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ContestSubmission = __webpack_require__(6);

var _ContestSubmission2 = _interopRequireDefault(_ContestSubmission);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onload = function onload() {
    fetch('/api/contest/submissions', { credentials: 'include' }).then(function (res) {
        return res.json();
        //Return res in JSON form to next then()
    }).then(function (resJson) {
        if (typeof resJson[0][0] !== 'undefined') {
            var allSubRes = resJson[0];
            var allSubHtml = '<h1>Submissions</h1>';
            allSubRes.forEach(function (submission) {
                var tempSub = new _ContestSubmission2.default(submission.contest_submission_ID, submission.workshop_URL, submission.personaname, submission.avatarfull);
                allSubHtml += tempSub.getSubmissionDiv();
                var node = tempSub.getSubmissionOption();
                document.querySelector('#firstPick').appendChild(node);
                document.querySelector('#secondPick').appendChild(node.cloneNode(true));
                document.querySelector('#thirdPick').appendChild(node.cloneNode(true));
                document.querySelector('#fourthPick').appendChild(node.cloneNode(true));
                document.querySelector('#fifthPick').appendChild(node.cloneNode(true));
            });
            document.querySelector('#contestSubmissionContainer').innerHTML = allSubHtml;
        }
    }).catch(function (error) {
        return console.error(error);
    });
};

exports.default = onload;

/***/ })
/******/ ]);