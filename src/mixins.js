export default {
	methods: {
		pastDays(val) {
			const today = new Date();
			const year = today.getFullYear();
			let month = today.getMonth() + 1;
			month = month >= 10 ? month : `0${month}`;
			let day = today.getDate();
			day = day >= 10 ? day : `0${day}`;

			val = val.split("-").join("");

			return parseInt(`${year}${month}${day}`) - parseInt(val);
		},
		selectImgFile(evt, img) {
			const files = Array.from(evt.target.files);
			const accept = evt.target.accept;

			if (!this.validateFileType(files, accept))
				return window.alert(`${accept.toString()} 이미지만 업로드 가능합니다.`);

			// 썸네일
			const objUrl = URL.createObjectURL(files[0]);
			img.src = objUrl;
			img.onload = () => URL.revokeObjectURL(objUrl);

			return files;
		},
		validateFileType(files, accept) {
			return files.every((file) => accept.includes(file.type));
		},
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
