/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["volt"] = factory();
	else
		root["volt"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/parser */ \"./src/lib/parser.js\");\n\n\nfunction Volt(options) {\n  var volt = new Object();\n  var getTemplate = options.getTemplate ? options.getTemplate : null;\n\n  if (volt.getTemplate && !getTemplate) {\n    getTemplate = volt.getTemplate;\n  } else if (!getTemplate) {\n    getTemplate = function getTemplate(name) {\n      throw new Error('no getTemplate function defined.');\n    };\n  }\n\n  volt.compile = (0,_lib_parser__WEBPACK_IMPORTED_MODULE_0__.default)(getTemplate);\n\n  volt.render = function (compiled, data) {\n    var keys = [];\n    var values = [];\n\n    for (var i in data) {\n      keys.push(i);\n      values.push(data[i]);\n    }\n\n    var output = new Function(keys, compiled);\n    return output.apply(void 0, values);\n  };\n\n  volt.fetch = function (tpl, data) {\n    var compiled = volt.compile(tpl);\n    return volt.render(compiled, data);\n  };\n\n  return volt;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Volt);\n\n//# sourceURL=webpack://volt/./src/index.js?");

/***/ }),

/***/ "./src/lib/parser.js":
/*!***************************!*\
  !*** ./src/lib/parser.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar ldelim = '{';\nvar rdelim = '}';\n\nvar voltParser = function voltParser(getTemplate) {\n  var buildInConditions = {\n    \"if\": function _if(params) {\n      return \"if (\".concat(params, \") {\");\n    },\n    \"else\": function _else() {\n      return \"} else {\";\n    },\n    elseif: function elseif(params) {\n      return \"} else if (\".concat(params, \") {\");\n    },\n    endif: function endif() {\n      return '}';\n    },\n    \"for\": function _for(params) {\n      var args = params.match(/(.*)\\sin\\s(.*)$/);\n      return \"for (var i in \".concat(args[2], \") { if (Object.prototype.hasOwnProperty.call(\").concat(args[2], \", i)) { var \").concat(args[1], \" = \").concat(args[2], \"[i]; \");\n    },\n    endfor: function endfor() {\n      return '}}';\n    }\n  };\n\n  var findTag = function findTag(s) {\n    var expression = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';\n    var expressionAny = /^\\s*(.+)\\s*$/i;\n    var expressionTag = expression ? new RegExp('^\\\\s*(' + expression + ')\\\\s*$', 'i') : expressionAny;\n    var openCount = 0;\n    var offset = 0;\n    var i;\n    var sTag;\n    var found;\n\n    for (i = 0; i < s.length; ++i) {\n      if (s.substr(i, ldelim.length) === ldelim) {\n        if (i + 1 < s.length && s.substr(i + 1, 1).match(/\\s/)) {\n          continue;\n        }\n\n        if (!openCount) {\n          s = s.slice(i);\n          offset += parseInt(i);\n          i = 0;\n        }\n\n        ++openCount;\n      } else if (s.substr(i, rdelim.length) === rdelim) {\n        if (i - 1 >= 0 && s.substr(i - 1, 1).match(/\\s/)) {\n          continue;\n        }\n\n        if (! --openCount) {\n          sTag = s.slice(ldelim.length, i).replace(/[\\r\\n]/g, ' ');\n          found = sTag.match(expressionTag);\n\n          if (found) {\n            found.index = offset;\n            found[0] = s.slice(0, i + rdelim.length);\n            return found;\n          }\n        }\n\n        if (openCount < 0) {\n          // Ignore any number of unmatched right delimiters.\n          openCount = 0;\n        }\n      }\n    }\n\n    return null;\n  };\n\n  var applyPacking = function applyPacking(txt) {\n    if (txt.length > 0) {\n      return \"$VOLT_JS_TXT += \".concat(JSON.stringify(txt), \";\");\n    }\n\n    return '';\n  };\n\n  var getTree = function getTree(tplRaw) {\n    var tree = [];\n    var tpl = tplRaw;\n\n    while (true) {\n      var tag = findTag(tpl);\n\n      if (tag && tag.index) {\n        // Start of the template before tag as text\n        tree.push(applyPacking(tpl.slice(0, tag.index)));\n      } else {\n        break;\n      }\n\n      tpl = tpl.slice(tag.index + tag[0].length);\n      var tagContentComment = tag[1].match(/^#(.*)#$/);\n      var tagContentOutput = tag[1].match(/^{(.*)}$/);\n      var tagContentCond = tag[1].match(/^%-(.*)-%$/);\n      var tagContentFunc = tag[1].match(/^%(.*)%$/);\n\n      if (tagContentComment) {\n        // It is a comment.\n        tree.push(\"/* \".concat(tagContentComment[1].trim(), \" */\"));\n      } else if (tagContentOutput) {\n        // It is output variable\n        tree.push(\"$VOLT_JS_TXT += \".concat(tagContentOutput[1].trim(), \";\"));\n      } else if (tagContentCond) {\n        // One of the conditions.\n        var innerTag = tagContentCond[1].match(/^\\s*(\\w+)(.*)$/);\n\n        if (innerTag) {\n          var funcName = innerTag[1];\n          var paramStr = innerTag.length > 2 ? innerTag[2].replace(/^\\s+|\\s+$/g, '') : '';\n\n          if (funcName in buildInConditions) {\n            if (paramStr) {\n              tree.push(buildInConditions[funcName](paramStr));\n            } else {\n              tree.push(buildInConditions[funcName]());\n            }\n          }\n        }\n      } else if (tagContentFunc) {\n        // Functions may be?\n        var _innerTag = tagContentFunc[1].match(/^\\s*(\\w+)(.*)$/);\n\n        if (_innerTag) {\n          var _funcName = _innerTag[1];\n\n          var _paramStr = _innerTag.length > 2 ? _innerTag[2].replace(/^\\s+|\\s+$/g, '') : '';\n\n          if (_funcName in buildInConditions) {\n            if (_paramStr) {\n              tree.push(buildInConditions[_funcName](_paramStr));\n            } else {\n              tree.push(buildInConditions[_funcName]());\n            }\n          }\n        }\n      }\n    }\n\n    if (tpl) {\n      // Rest of the template after last tag as text\n      tree.push(applyPacking(tpl));\n    }\n\n    return tree;\n  };\n\n  return function (file) {\n    var contents = getTemplate(file);\n    var tree = getTree(contents);\n    return \"try{ var $VOLT_JS_TXT = ''; \".concat(tree.join(''), \" return $VOLT_JS_TXT; }catch(error){throw new Error(error.message);}\");\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (voltParser);\n\n//# sourceURL=webpack://volt/./src/lib/parser.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	__webpack_exports__ = __webpack_exports__.default;
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});