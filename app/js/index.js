window.__webpack_public_path__ = '/wat';

window.onerror = function (e)  {
	document.body.innerHTML = JSON.stringify(e);
}

import "core-js";

import '@socket';
import '@vue';
import '@plugin-api';