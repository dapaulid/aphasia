/* jshint esversion: 8 */
import { WebComponent } from '../lib/webcomponent.js';

import '../keyboard/keyboard.js';

class Main extends WebComponent {

	initialize() {

		this.hint_timer = new Timer(this.hint.bind(this), 5000);
		this.ui.keyboard.addEventListener('input', e => this.type(e.detail));

		this.ui.textout.onkeypress = (e) => {
			e.preventDefault();
			this.type(e.key);
		};
		this.ui.textout.focus();
		
		this.exercise("bitte tippe diesen text ab!");		
	}

	type(str) {
		this.hint_timer.restart();
		const text = this.ui.textout.value + str;
		if (!this.ui.textinp.value.startsWith(text)) {
			this.ui.keyboard.incorrect(str);
			return;
		}
		this.ui.keyboard.correct(str);
		this.ui.textout.value = text;
	}
	
	exercise(text) {
		this.ui.textinp.value = text;
		this.ui.textout.value = "";
	}
	
	hint() {
		const expectedText = this.ui.textinp.value;
		const actualText = this.ui.textout.value;
		if (expectedText == actualText) {
			// all good
			return;
		}
		if (!expectedText.startsWith(actualText)) {
	
		}
		const i = this.ui.textout.value.length;
		this.ui.keyboard.highlight(this.ui.textinp.value[i]);
	}	
}

WebComponent.define(Main, import.meta);
