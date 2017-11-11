"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emojis_1 = require("./emojis");
const emojisByCategory = {};
for (let name in emojis_1.default) {
    let emoji = emojis_1.default[name];
    if (emojisByCategory[emoji.category] === undefined) {
        emojisByCategory[emoji.category] = {};
    }
    emojisByCategory[emoji.category][name] = emojis_1.default[name];
}
console.log(emojisByCategory);
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
    <div></div>
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
            this.container = this.shadowRoot.querySelector('div');
        }
        // add any initial variables here
    }
    /**
     * Part of the custom element spec. Called after your element is attached to
     * the DOM. Do anything related to the element or its children here in most
     * cases.
     */
    connectedCallback() {
        this.container.innerHTML = emojis_1.default['grinning'].char;
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
