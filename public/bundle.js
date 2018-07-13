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


var _unassignedrole = __webpack_require__(2);

var _unassignedrole2 = _interopRequireDefault(_unassignedrole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

window.onload = function () {
    if (window.location.pathname === "/collabs") {
        var unassignedRoles = '';
        for (var i = 0; i < 5; i++) {
            var temp = new UnassignedRole('Name ' + i.toString(), 'personaname ' + i.toString(), 'avatarfull ' + i.toString(), 'collab_role_assoc_ID ' + i.toString(), 'collab_role ' + i.toString(), 'comment ' + i.toString(), 'CreatedDate ' + i.toString());
            unassignedRoles += temp.unassignedRoleDiv();
        }
        document.getElementById('div-collabs').innerHTML = unassignedRoles;
    }
};

/***/ })
/******/ ]);