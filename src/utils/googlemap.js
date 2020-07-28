const API_KEY = "AIzaSyCTQIlxBn5AfKGvsfJiormAE1esN3fcCkg";
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
	const script = document.createElement("script");
	script.async = true;
	script.defer = true;
	script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${CALLBACK}`;
	script.onerror = rejectPromise;
	document.querySelector("head").appendChild(script);

	return initPromise;
};