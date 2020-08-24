export default {
	init(Vue) {
		Vue.filter("addCommas", (val) => {
			if (!val && val !== 0) return "";
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		});
	},
};
