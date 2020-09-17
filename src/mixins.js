export default {
	methods: {
		animateNumbers(els) {
			els.forEach((el) => {
				const updateCount = () => {
					const targetVal = +el.getAttribute("data-target");
					if (!targetVal) return;

					const count = +el.innerText.replace(",", "");
					const speed = targetVal > 10000 ? 200 : 100;
					const inc = targetVal / speed;

					if (count < targetVal) {
						el.innerText = this.$options.filters.addCommas(count + inc);
						window.setTimeout(updateCount, 2);
					} else el.innerText = this.$options.filters.addCommas(targetVal);
				};

				updateCount();
			});
		},
		levelClass(level) {
			let className = "";
			switch (level) {
				case "LV001":
					className = "";
					break;
				case "LV002":
					className = "user-level-icon--gold";
					break;
				case "LV003":
					className = "user-level-icon--vip";
					break;
				default:
					className = "";
					break;
			}
			return className;
		},
		statusClass(status) {
			let className = "";
			switch (status) {
				case "UT001":
					className = "";
					break;
				case "UT002":
					className = "user-status-icon--blocked";
					break;
				case "UT003":
					className = "user-status-icon--del";
					break;
				default:
					className = "";
					break;
			}
			return className;
		},
	},
};
