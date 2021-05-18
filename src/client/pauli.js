/*jshint esversion: 6 */

console.log("hello from pauli.js");

document.addEventListener('DOMContentLoaded', () => {
	processIncludes(document);
});

//------------------------------------------------------------------------------
// helpers
//------------------------------------------------------------------------------
//
function loadJs(url, element) {
	const scriptTag = document.createElement('script');
	scriptTag.src = url;
	element.appendChild(scriptTag);
}

//------------------------------------------------------------------------------
//
function loadCss(url, element) {
	const linkTag = document.createElement('link');
	linkTag.rel = 'stylesheet';
	linkTag.href = url;
	element.appendChild(linkTag);
}

//------------------------------------------------------------------------------
//
function getAuxFile(ext, path = window.location.pathname) {
	return path.replace(/\.[^\.]*$/, ext);
}

//------------------------------------------------------------------------------
//
function processIncludes(element) {
	const includes = [...element.querySelectorAll('include')];
	return Promise.all(includes.map(e => include(e, e.getAttribute('href'))));
}

//------------------------------------------------------------------------------
//
function include(element, href) {
	// path to html?
	if (!href.endsWith('.html')) {
		// no -> assume directory
		href += '/' + href.split('/').pop() + '.html';
	}
	return fetch(href)
		.then(function (response) {
			return response.text();
		})
		.then(function (body) {
			element.innerHTML = body;
			loadCss(getAuxFile('.css', href), element);
			processIncludes(element).then(() => {
				loadJs(getAuxFile('.js', href), element);
			});
		});
}

//------------------------------------------------------------------------------
// end of file
