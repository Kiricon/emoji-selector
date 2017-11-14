"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("fun-tabs");
const emojis_1 = require("./emojis");
const emojisByCategory = {};
let createdTabs = {};
let tabTemplate = ``;
let contentContainers = {};
for (let name in emojis_1.default) {
    if (createdTabs[emojis_1.default[name].category] === undefined) {
        let newTab = document.createElement('fun-tab');
        tabTemplate += `<fun-tab>${emojis_1.default[name].char}</fun-tab>`;
        createdTabs[emojis_1.default[name].category] = true;
        contentContainers[emojis_1.default[name].category] = `<div class="container">`;
    }
    contentContainers[emojis_1.default[name].category] += `<div class="emoji">${emojis_1.default[name].char}</div>`;
}
let contentTemplate = ``;
for (let category in contentContainers) {
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
            will-change: opacity, margin, height, width;
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
            width: 300px;
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
            padding: 0px 4px 6px 4px;
            width: 22px;
            height: 22px;
            cursor: pointer;
            text-align: center;
        }

        fun-tabs {
            border-bottom: solid 1px #eee;
            margin: 0px auto;
            opacity: 0;
            transition: ease opacity 0.3s;
            width: 288px;
            height: 38px;
            margin-top: 2px;
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

        button {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0px;
            height: 30px;
            width: 30px;
            background: rgba(255, 255, 255, 0);
            transition: background ease 0.3s;
            border-radius: 50%;
        }

        button:focus {
            outline: none;
        }

        button:hover {
            background: rgba(255, 255, 255, 1);
        }
    </style>
    <button>
        <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
        </svg>
    </button>
    <div id="emojiPopup">
        <fun-tabs selected="0">${tabTemplate}</fun-tabs>
        <div class="content">${contentTemplate}</div>
    </div>
`;
/**
 * This is the class that controls each instance of your custom element.
 */
class EmojiSelector extends HTMLElement {
    constructor() {
        super();
        // create shadow root for any children context
        this.attachShadow({ mode: "open" });
        if (this.shadowRoot) {
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            this.tabContainer = this.shadowRoot.querySelector('fun-tabs');
            this.tabs = this.shadowRoot.querySelectorAll('fun-tab');
            this.containers = this.shadowRoot.querySelectorAll('.container');
            this.openButton = this.shadowRoot.querySelector('button');
            this.popupWindow = this.shadowRoot.querySelector('#emojiPopup');
            this.emojis = this.shadowRoot.querySelectorAll('.emoji');
            this.svg = this.shadowRoot.querySelector('svg');
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
        for (let i = 0; i < this.tabs.length; i++) {
            this.tabs[i].addEventListener('click', () => {
                for (let x = 0; x < this.containers.length; x++) {
                    this.containers[x].className = 'container';
                }
                this.containers[i].className = 'container selected';
            });
        }
        const self = this;
        this.openButton.addEventListener('click', (e) => {
            this.open({ top: e.clientY, left: e.clientX });
        }, true);
        for (let i = 0; i < this.emojis.length; i++) {
            this.emojis[i].addEventListener('click', () => {
                if (typeof this.emojiSelected === 'function') {
                    this.emojiSelected(this.emojis[i].innerHTML);
                }
            });
        }
        window.addEventListener('click', () => {
            this.close();
        });
        this.popupWindow.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        this.openButton.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        if (this.getAttribute('padding') !== null) {
            this.openButton.style.padding = this.getAttribute('padding');
        }
        const size = this.getAttribute('size');
        if (size !== null) {
            this.openButton.style.height = size;
            this.openButton.style.width = size;
            this.svg.style.height = size.replace('px', '');
            this.svg.style.width = size.replace('px', '');
        }
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
    open(offset) {
        this.popupWindow.style.top = (offset.top - 150) + 'px';
        this.popupWindow.style.left = (offset.left - 150) + 'px';
        this.popupWindow.className = 'open';
    }
    close() {
        this.popupWindow.className = '';
    }
}
customElements.define("emoji-selector", EmojiSelector);
