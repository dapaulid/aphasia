/* jshint esversion: 8 */
import { WebComponent } from '../lib/webcomponent.js';

class Keyboard extends WebComponent {
	initialize() {
		this.keymap = {};
		this.dom.querySelectorAll('.key').forEach((element) => {
			this.keymap[element.textContent] = element;
			element.onclick = () => {
				this.type(element.textContent);
			};
		});
	}

	type(str) {
		this.emit('input', str);
	}

	element_from_key(key) {
		const element = this.keymap[key];
		if (!element) {
			throw "invalid key: " + key;
		}
		return element;
	}
	
	animate(key, state, animation)
	{
		const element = this.keymap[key] || this.ui.keyboard;
		element.classList.add(state);
		animateCSS(element, animation).then(() => {
			element.classList.remove(state);
		});
	}
	
	highlight(key) {
		this.animate(key, "highlight", "heartBeat");
	}
	
	correct(key) {
		this.animate(key, "correct", "bounce");
	}
	
	incorrect(key) {
		this.animate(key, "incorrect", "wobble");
	}
}

WebComponent.define(Keyboard, import.meta);
