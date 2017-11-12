import 'fun-tabs';
import {IEmojis, IEmoji, IEmojisByCategory} from './IEmojis';
import emojis from './emojis';
const emojisByCategory: IEmojisByCategory = {}

let createdTabs: { [category: string]: boolean} = {};
let tabTemplate = ``;
let contentContainers: { [category: string]: string } = {};

for(let name in emojis) {
    if(createdTabs[emojis[name].category] === undefined) {
        let newTab = document.createElement('fun-tab');
        tabTemplate += `<fun-tab>${emojis[name].char}</fun-tab>`
        createdTabs[emojis[name].category] = true;
        contentContainers[emojis[name].category] = `<div class="container">`;
    }

    contentContainers[emojis[name].category] += `<div class="emoji">${emojis[name].char}</div>`;
}

let contentTemplate = ``;

for(let category in contentContainers) {
    contentTemplate += `${contentContainers[category]}</div>`;
}

/**
 * The template that is used for the shadow root for every copy of your element,
 * which houses the styles and layout for the element.
 */
const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {
            
        }

        #emojiPopup {
            width: 0px;
            background: white;
            border-radius: 3px;
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
            overflow:hidden;
            transition: all ease 0.5s;
            border-radius: 150px;
            height: 0px;
            margin-top: 150px;
            margin-left: 150px;
            position: absolute;
        }

        #emojiPopup.open {
            display: block;
            width: 300px;
            border-radius: 3px;
            height: 300px;
            margin-top: 0px;
            margin-left: 0px;
        }

        #emojiPopup.open .container, #emojiPopup.open fun-tabs {
            opacity: 1;
            transition-delay: 0.5s;
        }

        .content {
            height: 260px;
            overflow:hidden;
        }

        .container {
            display: none;
            padding: 10px;
            overflow-y: auto;
            height: calc(100% - 20px);
            opacity: 0;
            transition: ease opacity 0.3s;
        }
        .container.selected  {
            display: block;
        }
        .emoji {
            float: left;
            padding: 4px;
            width: 20px;
            height: 20px;
            cursor: pointer;
        }

        fun-tabs {
            border-bottom: solid 1px #eee;
            height: 40px;
            margin: 0px auto;
            opacity: 0;
            transition: ease opacity 0.3s;
            width: 288px;
        }

        fun-tab {
            padding: 5px 10px;
        }
        fun-tab, .emoji {
            background: white;
            transition: ease background 0.3s;
            border-radius: 3px;
        }
        fun-tab:hover, .emoji:hover {
            background: #eee;
        }
    </style>
    <button>open</button>
    <div id="emojiPopup">
        <fun-tabs selected="0">${tabTemplate}</fun-tabs>
        <div class="content">${contentTemplate}</div>
    </div>
`;

/**
 * This is the class that controls each instance of your custom element.
 */
class EmojiSelector extends HTMLElement {
    tabContainer: any;
    tabs: NodeListOf<Element>;
    containers: NodeListOf<Element>;
    openButton: Element;
    popupWindow: HTMLElement;
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
            this.tabContainer = <any>this.shadowRoot.querySelector('fun-tabs');
            this.tabs = this.shadowRoot.querySelectorAll('fun-tab');
            this.containers = this.shadowRoot.querySelectorAll('.container');
            this.openButton = <Element>this.shadowRoot.querySelector('button');
            this.popupWindow = <HTMLElement>this.shadowRoot.querySelector('#emojiPopup');
        }

        // add any initial variables here
    }

    /**
     * Part of the custom element spec. Called after your element is attached to
     * the DOM. Do anything related to the element or its children here in most
     * cases.
     */
    connectedCallback() {
        this.containers[0].className = 'container selected';
        for(let i = 0; i < this.tabs.length; i++) {
            this.tabs[i].addEventListener('click', () => {
                for(let x = 0; x < this.containers.length; x++) {
                    this.containers[x].className = 'container';
                }

                this.containers[i].className = 'container selected';
            });
        }

        const self = this;
        this.openButton.addEventListener('click', () => {
            
            const offset = this.findTopLeft(this.openButton);
            this.popupWindow.style.top = (offset.top-150)+'px';
            this.popupWindow.style.left = (offset.left-150)+'px';
            this.popupWindow.className = 'open';
        });
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

    findTopLeft(element: Element) {
        const rec = element.getBoundingClientRect();
        return {top: rec.top + window.scrollY, left: rec.left + window.scrollX};
    }
}

customElements.define("emoji-selector", EmojiSelector);
