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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/home.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/about.js":
/*!**********************!*\
  !*** ./src/about.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: /Users/henry/Desktop/study/javastyProject/server/nodejstest/src/about.js: Support for the experimental syntax 'classProperties' isn't currently enabled (24:19):\\n\\n\\u001b[0m \\u001b[90m 22 | \\u001b[39m    \\u001b[90m//Property initializer syntax\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 23 | \\u001b[39m    \\u001b[90m// instanceProperty = \\\"bork\\\";\\u001b[39m\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 24 | \\u001b[39m    boundFunction \\u001b[33m=\\u001b[39m () \\u001b[33m=>\\u001b[39m {\\u001b[0m\\n\\u001b[0m \\u001b[90m    | \\u001b[39m                  \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 25 | \\u001b[39m        \\u001b[36mreturn\\u001b[39m \\u001b[32m\\\"d\\\"\\u001b[39m\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 26 | \\u001b[39m    }\\u001b[0m\\n\\u001b[0m \\u001b[90m 27 | \\u001b[39m\\u001b[0m\\n\\nAdd @babel/plugin-proposal-class-properties (https://git.io/vb4SL) to the 'plugins' section of your Babel config to enable transformation.\\n    at Parser.raise (/Users/henry/Desktop/study/javastyProject/server/nodejstest/node_modules/@babel/parser/lib/index.js:6420:17)\\n    at Parser.expectPlugin (/Users/henry/Desktop/study/javastyProject/server/nodejstest/node_modules/@babel/parser/lib/index.js:7778:18)\\n    at Parser.parseClassProperty (/Users/henry/Desktop/study/javastyProject/server/nodejstest/node_modules/@babel/parser/lib/index.js:11013:12)\\n    at Parser.pushClassProperty (/Users/henry/Desktop/study/javastyProject/server/nodejstest/node_modules/@babel/parser/lib/index.js:10978:30)\\n    at Parser.parseClassMemberWithIsStatic (/Users/henry/Desktop/study/javastyProject/server/nodejstest/node_modules/@babel/parser/lib/index.js:10917:14)\\n    at Parser.parseClassMember (/Users/henry/Desktop/study/javastyProject/server/nodejstest/node_modules/@babel/parser/lib/index.js:10851:10)\\n    at withTopicForbiddingContext (/Users/henry/Desktop/study/javastyProject/server/nodejstest/node_modules/@babel/parser/lib/index.js:10806:14)\\n    at Parser.withTopicForbiddingContext (/Users/henry/Desktop/study/javastyProject/server/nodejstest/node_modules/@babel/parser/lib/index.js:9884:14)\\n    at Parser.parseClassBody (/Users/henry/Desktop/study/javastyProject/server/nodejstest/node_modules/@babel/parser/lib/index.js:10783:10)\\n    at Parser.parseClass (/Users/henry/Desktop/study/javastyProject/server/nodejstest/node_modules/@babel/parser/lib/index.js:10757:22)\\n    at Parser.parseStatementContent (/Users/henry/Desktop/study/javastyProject/server/nodejstest/node_modules/@babel/parser/lib/index.js:10051:21)\\n    at Parser.parseStatement (/Users/henry/Desktop/study/javastyProject/server/nodejstest/node_modules/@babel/parser/lib/index.js:10009:17)\\n    at Parser.parseBlockOrModuleBlockBody (/Users/henry/Desktop/study/javastyProject/server/nodejstest/node_modules/@babel/parser/lib/index.js:10585:25)\\n    at Parser.parseBlockBody (/Users/henry/Desktop/study/javastyProject/server/nodejstest/node_modules/@babel/parser/lib/index.js:10572:10)\\n    at Parser.parseTopLevel (/Users/henry/Desktop/study/javastyProject/server/nodejstest/node_modules/@babel/parser/lib/index.js:9940:10)\\n    at Parser.parse (/Users/henry/Desktop/study/javastyProject/server/nodejstest/node_modules/@babel/parser/lib/index.js:11447:17)\\n    at parse (/Users/henry/Desktop/study/javastyProject/server/nodejstest/node_modules/@babel/parser/lib/index.js:11483:38)\\n    at parser (/Users/henry/Desktop/study/javastyProject/server/nodejstest/node_modules/@babel/core/lib/transformation/normalize-file.js:168:34)\\n    at normalizeFile (/Users/henry/Desktop/study/javastyProject/server/nodejstest/node_modules/@babel/core/lib/transformation/normalize-file.js:102:11)\\n    at runSync (/Users/henry/Desktop/study/javastyProject/server/nodejstest/node_modules/@babel/core/lib/transformation/index.js:44:43)\\n    at runAsync (/Users/henry/Desktop/study/javastyProject/server/nodejstest/node_modules/@babel/core/lib/transformation/index.js:35:14)\\n    at process.nextTick (/Users/henry/Desktop/study/javastyProject/server/nodejstest/node_modules/@babel/core/lib/transform.js:34:34)\\n    at process._tickCallback (internal/process/next_tick.js:61:11)\");\n\n//# sourceURL=webpack:///./src/about.js?");

/***/ }),

/***/ "./src/home.js":
/*!*********************!*\
  !*** ./src/home.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _about__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./about */ \"./src/about.js\");\n/* harmony import */ var _about__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_about__WEBPACK_IMPORTED_MODULE_0__);\n//webpack会查找src/index并生成dist中的main.js\n\nconsole.log('home'); // function component() {\n//     const element = document.createElement('div');\n//\n//     // Lodash, currently included via a script, is required for this line to work\n//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');\n//\n//     return element;\n// }\n//\n// function hello() {\n//     console.log('hello world');\n// }\n//\n// document.body.appendChild(component());\n\n//# sourceURL=webpack:///./src/home.js?");

/***/ })

/******/ });