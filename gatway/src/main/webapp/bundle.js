/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _sample = __webpack_require__(/*! ./src/main/webapp/react/components/sample */ 1);
	
	var _sample2 = _interopRequireDefault(_sample);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/*!****************************************************!*\
  !*** ./src/main/webapp/react/components/sample.js ***!
  \****************************************************/
/***/ function(module, exports) {

	"use strict";
	
	var Sample = React.createClass({
	  displayName: "Sample",
	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "shopping-list" },
	      React.createElement(
	        "h1",
	        null,
	        "Shopping List for ",
	        this.props.name
	      ),
	      React.createElement(
	        "ul",
	        null,
	        React.createElement(
	          "li",
	          null,
	          "Instagram"
	        ),
	        React.createElement(
	          "li",
	          null,
	          "WhatsApp"
	        ),
	        React.createElement(
	          "li",
	          null,
	          "Oculus"
	        )
	      )
	    );
	  }
	});
	
	var root = document.getElementById('sample');
	if (root != null && root != undefined) {
	  console.log("found");
	  ReactDOM.render(React.createElement(Sample, { name: "Sam" }), root);
	}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map