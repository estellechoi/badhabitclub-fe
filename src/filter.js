const commonCode = [
	{
		cd: "OV001",
		label: "매출",
	},
	{
		cd: "OV002",
		label: "주문건수",
	},
	{
		cd: "OV003",
		label: "주문당 결제금액",
	},
	{
		cd: "OV004",
		label: "방문자수",
	},
];

export default {
	init(Vue) {
		Vue.filter("addCommas", (val) => {
			if (!val && val !== 0) return "";
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		});

		Vue.filter("codeLabel", (val) => {
			if (!val && val !== 0) return "";
			const codeObj = commonCode.filter((item) => item.cd === val)[0];
			if (!codeObj) return "";
			return codeObj.label;
		});
	},
};
