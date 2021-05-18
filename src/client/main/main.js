const textout = document.getElementById("textout");
const textinp = document.getElementById("textinp");
const keyboard = document.getElementById("keyboard");

const hint_timer = new Timer(hint, 5000);

textout.onkeypress = (e) => {
	e.preventDefault();
	type(e.key);
}
textout.focus();

function type(str) {
	hint_timer.restart();
	const text = textout.value + str;
	if (!textinp.value.startsWith(text)) {
		incorrect(keymap[str]);
		return;
	}
	correct(keymap[str]);
	textout.value = text;
}

const keymap = {};
document.querySelectorAll('.key').forEach((element) => {
	keymap[element.textContent] = element;
	element.onclick = () => {
		type(element.textContent);
	};
});

function exercise(text) {
	textinp.value = text;
	textout.value = "";
}

function element_from_key(key) {
	const element = keymap[key];
	if (!element) {
		throw "invalid key: " + key;
	}
	return element;
}

function animate(element, state, animation)
{
	element = element || keyboard;
	element.classList.add(state);
	animateCSS(element, animation).then(() => {
		element.classList.remove(state);
	});
}

function highlight(element) {
	animate(element, "highlight", "heartBeat");
}

function correct(element) {
	animate(element, "correct", "bounce");
}

function incorrect(element) {
	animate(element, "incorrect", "wobble");
}


function hint() {
	const expectedText = textinp.value;
	const actualText = textout.value;
	if (expectedText == actualText) {
		// all good
		return;
	}
	if (!expectedText.startsWith(actualText)) {

	}
	const i = textout.value.length;
	let next_key = keymap[textinp.value[i]];
	if (next_key) {
		highlight(next_key);
	} else {
		console.error("failed to determine next key");
	}
}

exercise("bitte tippe diesen text ab!");

