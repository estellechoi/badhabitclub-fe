const API_KEY = process.env.VUE_APP_GOOGLEMAP_KEY;
const CALLBACK = "getMap";

let resolvePromise;
let rejectPromise;

const initPromise = new Promise((resolve, reject) => {
	resolvePromise = resolve;
	rejectPromise = reject;
});

export default () => {
	// The callback is called by the Google Maps script when the script is successfully loaded.
	window[CALLBACK] = () => resolvePromise(window.google);

	// Inject a script tag into the `<head>` to load the Google Maps script.
	const head = document.querySelector("head");
	if (head.contains(document.querySelector("#google-map-api")))
		return initPromise;

	const script = document.createElement("script");
	script.id = "google-map-api";
	script.async = true;
	script.defer = true;
	script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${CALLBACK}`;
	script.onerror = rejectPromise;
	head.appendChild(script);

	return initPromise;
};
