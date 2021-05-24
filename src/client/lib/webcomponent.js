/* jshint esversion: 8 */

const TAG_PREFIX = "wc-";

function getElementNameFromUrl(url) {
	const baseName = url.split('/').pop();
	return TAG_PREFIX + baseName.split('.')[0];
}

async function load(url) {
	const response = await fetch(url);
	return response.text();
}

export class WebComponent extends HTMLElement {
	
	static define(constructor, meta) {
		constructor.meta = meta;

		// load static files
		const baseUrl = meta.url.substr(0, meta.url.lastIndexOf('.'));
		constructor.assets = {
			html: load(baseUrl + '.html'),
			css: load(baseUrl + '.css'),
		};
	
		const name = getElementNameFromUrl(meta.url);
		window.customElements.define(name, constructor);
	}

	constructor() {
		super();
		this.useShadow = true;
		if (this.useShadow) {
			this.attachShadow({mode: 'open'});
			this.dom = this.shadowRoot;
		} else {
			this.dom = this;
		}
		this.ui = null;
	}

	initialize() {
		// implemented by subclasses
	}

	async connectedCallback() {
		// set our DOM
		this.dom.innerHTML = await this.constructor.assets.html;
		// include CSS
		const style = document.createElement('style');
		style.innerText = await this.constructor.assets.css;
		this.dom.appendChild(style);
		// setup references to elements with id
		this.ui = {};
		for (const e of this.dom.querySelectorAll('[id]')) {
			const elementName = e.tagName.toLowerCase();
			if (elementName.includes('-') && !customElements.get(elementName)) {
				console.warn("custom element <" + elementName + "> not defined. import missing?");
			}
			// TODO really needed when not using shadow DOM?
			if (this.ui[e.id] && !elementName.includes('-')) {
				// custom element wins
				continue;
			}
			this.ui[e.id] = e;
		}
		// notify subclass		
		this.initialize();
	}

	emit(eventName, detail = null) {
		const event = new CustomEvent(eventName, { detail: detail });
		this.dispatchEvent(event);
	}

}
