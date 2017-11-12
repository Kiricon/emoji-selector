import 'fun-tabs';
import {IEmojis, IEmoji, IEmojisByCategory} from './IEmojis';
import emojis from './emojis';
const emojisByCategory: IEmojisByCategory = {}

let createdTabs: { [category: string]: boolean} = {};
let tabTemplate = ``;
for(let name in emojis) {
    if(createdTabs[emojis[name].category] === undefined) {
        let newTab = document.createElement('fun-tab');
        tabTemplate += `<fun-tab>${emojis[name].char}</fun-tab>`
        createdTabs[emojis[name].category] = true;
    }
}

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
    <fun-tabs selected="0">${tabTemplate}</fun-tabs>
`;

/**
 * This is the class that controls each instance of your custom element.
 */
class EmojiSelector extends HTMLElement {
    tabContainer: Element;
    /**
     * Part of the custom element spec. Returns an array of strings that are 
     * the names of attributes that this element observes/listens to.
     * 
     * @returns {Array} an array of strings, each of which representing an 
     *  attribute.
     */
    static get observedAttributes() {
        return [];
    };

    constructor() {
        super();

        // create shadow root for any children context
        this.attachShadow({mode: "open"});
        if(this.shadowRoot) {
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            this.tabContainer = <Element>this.shadowRoot.querySelector('fun-tabs');
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
    attributeChangedCallback(name: string, oldValue: string | number, newValue: string | number) {
        // respond to a changed attribute here
    }
}

customElements.define("emoji-selector", EmojiSelector);
