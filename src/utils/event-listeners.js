export default (window, document, input) => {
	"use strict";

	window.addEventListener("scroll", () => {
		getScrollY();
		checkScroll();
	});

	// const $searchInput = document.getElementById("home-search-box__input");

	function getScrollY() {
		const y = window.pageYOffset; // IE 10
		const $header = document.querySelector("header");
		// const $banner = document.querySelector(".banner");

		if (y > 45) {
			$header.classList.add("scrolled");
			// $banner.classList.add("banner--hidden");
			input.classList.remove("full-width");
		} else {
			$header.classList.remove("scrolled");
			// $banner.classList.remove("banner--hidden");
		}
	}

	function checkScroll() {
		const scrollY = window.scrollY;
		const innerHeight = window.innerHeight;
		const docHeight = document.body.scrollHeight;
		const isAllScrolled = scrollY + innerHeight >= docHeight;

		const $signBox = document.querySelector(".sign-box");

		if (isAllScrolled) $signBox.classList.add("hidden");
		else $signBox.classList.remove("hidden");
	}
};
