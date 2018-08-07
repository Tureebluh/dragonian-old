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


var _UnassignedRole = __webpack_require__(2);

var _UnassignedRole2 = _interopRequireDefault(_UnassignedRole);

var _Contest = __webpack_require__(3);

var _Contest2 = _interopRequireDefault(_Contest);

var _ContestOption = __webpack_require__(4);

var _ContestOption2 = _interopRequireDefault(_ContestOption);

var _ContestRule = __webpack_require__(5);

var _ContestRule2 = _interopRequireDefault(_ContestRule);

var _ChangeEvents = __webpack_require__(6);

var _ChangeEvents2 = _interopRequireDefault(_ChangeEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Can only have one window.onload function so we're checking the pathname to see which page the user is on
window.onload = function () {

    //If user is on collab page display under construction
    if (window.location.pathname === "/collabs") {
        var unassignedRoles = '<h1>Page Currently Under Construction!</h1>';
        document.querySelector('#collabsDiv').innerHTML = unassignedRoles;

        //When admin creates a contest, it will redirect back to same page with added URL params if successful.
    } else if (window.location.pathname === '/admin/contest') {
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

        if (document.URL.indexOf('result=success') !== -1) {
            this.alert('Action was successful!');
        }

        //If user is on contest page, load the oldest active contest and pull all rules associated with that contest. Store all info in an object and call
        //call provided function to create HTML visual of data
        //NOTE: Cookies are not sent with fetch() by default, therefore {credentials} are supplied to server to authenticate fetch() request
    } else if (window.location.pathname === '/contest') {
        fetch('/api/contest/all/active', { credentials: 'include' }).then(function (res) {
            return res.json();
            //Return res in JSON form to next then()
        }).then(function (resJson) {
            if (typeof resJson[0][0] !== 'undefined') {
                var activeContest = new _Contest2.default(resJson[0][0].contest_ID, resJson[0][0].Name, new Date(resJson[0][0].SubmissionStartDate), new Date(resJson[0][0].SubmissionEndDate), new Date(resJson[0][0].VoteStartDate), new Date(resJson[0][0].VoteEndDate), resJson[0][0].Description, null);
                return activeContest;
            } else {
                return {};
            }
            //Create obj and return to next then()
        }).then(function (contestObj) {
            if (contestObj.hasOwnProperty('_contest_ID')) {
                document.querySelector('#contestIDSubmit').value = contestObj.contest_ID;
                //Fetch rules associated with contest_ID
                fetch('/api/contest/rules/' + contestObj.contest_ID, { credentials: 'include' }).then(function (res) {
                    return res.json();
                }).then(function (resJson) {
                    contestObj.rules = resJson[0];
                    document.querySelector('#activeContest').innerHTML = contestObj.activeContestDiv();
                }).catch(function (error) {
                    return console.error(error);
                });
            } else {
                document.querySelector('#activeContest').innerHTML = '<h1>No Contest Currently Running.<br>Check back soon!</h1>';
            }
        }).catch(function (error) {
            return console.error(error);
        });
    }
};

// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
    if (!e.target.matches('.dropbtn')) {
        var myDropdown = document.getElementById("adminDropdown");
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
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
    function Contest(contest_ID, Name, SubmissionStartDate, SubmissionEndDate, VoteStartDate, VoteEndDate, Description, rules) {
        _classCallCheck(this, Contest);

        this._contest_ID = contest_ID;
        this._Name = Name;
        this._SubmissionStartDate = SubmissionStartDate;
        this._SubmissionEndDate = SubmissionEndDate;
        this._VoteStartDate = VoteStartDate;
        this._VoteEndDate = VoteEndDate;
        this._Description = Description;
        this._rules = rules;
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
            tempString += "<span class=\"SubmissionStartDate\"><h2>Start</h2>" + this._SubmissionStartDate.toLocaleString() + "</span>";
            tempString += "<span class=\"SubmissionEndDate\"><h2>End</h2>" + this._SubmissionEndDate.toLocaleString() + "</span>";
            tempString += "</div>";
            tempString += "<br>";
            tempString += "<div class=\"sml-container\">";
            tempString += "<span class=\"VoteStartDate\"><h2>Vote Start</h2>" + this._VoteStartDate.toLocaleString() + "</span>";
            tempString += "<span class=\"VoteEndDate\"><h2>Vote End</h2>" + this._VoteEndDate.toLocaleString() + "</span>";
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


if (window.location.pathname === '/admin/contest') {
    //When admin selects contest from dropdown list
    document.querySelector('#contestNameDropdown').addEventListener('change', function (event) {
        if (event.target.value !== '0') {
            fetch('/api/contest/all/' + event.target.value, { credentials: 'include' }).then(function (res) {
                return res.json();
            }).then(function (resJson) {
                var temp = resJson[0][0];

                document.querySelector('#contestName').value = temp.Name;
                document.querySelector('#contestSubmissionStart').value = temp.SubmissionStartDate.toString().replace('Z', '');
                document.querySelector('#contestSubmissionEnd').value = temp.SubmissionEndDate.toString().replace('Z', '');
                document.querySelector('#contestVoteStart').value = temp.VoteStartDate.toString().replace('Z', '');
                document.querySelector('#contestVoteEnd').value = temp.VoteEndDate.toString().replace('Z', '');
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

/***/ })
/******/ ]);