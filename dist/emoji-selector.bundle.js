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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const emojilib = __webpack_require__(1);
/**
 * The template that is used for the shadow root for every copy of your element,
 * which houses the styles and layout for the element.
 */
const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {
            display: block;
        }
    </style>
`;
/**
 * This is the class that controls each instance of your custom element.
 */
class EmojiSelector extends HTMLElement {
    /**
     * Part of the custom element spec. Returns an array of strings that are
     * the names of attributes that this element observes/listens to.
     *
     * @returns {Array} an array of strings, each of which representing an
     *  attribute.
     */
    static get observedAttributes() {
        return [];
    }
    ;
    constructor() {
        super();
        // create shadow root for any children context
        this.attachShadow({ mode: "open" });
        if (this.shadowRoot) {
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }
        // add any initial variables here
    }
    /**
     * Part of the custom element spec. Called after your element is attached to
     * the DOM. Do anything related to the element or its children here in most
     * cases.
     */
    connectedCallback() {
    }
    /**
     * Part of the custom element spec. Called after your element is remove from
     * the DOM. Disconnect any listeners or anything else here.
     */
    disconnectedCallback() {
    }
    /**
     * Part of the custom element spec. Called when one of the observed
     * attributes changes, either via setAttribute() or with the attribute being
     * manually set in the HTML.
     *
     * @param {String} name the name of the attribute that changed
     * @param {Mixed} oldValue the previous value of the attribute
     * @param {Mixed} newValue the new value of the attribute
     */
    attributeChangedCallback(name, oldValue, newValue) {
        // respond to a changed attribute here
    }
}
customElements.define("emoji-selector", EmojiSelector);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  lib: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./emojis\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
  ordered: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./ordered\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
  fitzpatrick_scale_modifiers: ["🏻", "🏼", "🏽", "🏾", "🏿"]
}


/***/ })
/******/ ]);