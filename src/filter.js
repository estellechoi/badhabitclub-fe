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
	{
		cd: "OV005",
		label: "신규회원",
	},
	{
		cd: "OV006",
		label: "비활성 회원",
	},
	{
		cd: "OV007",
		label: "누적 회원수",
	},
	{
		cd: "OV008",
		label: "누적 주문금액",
	},
	{
		cd: "OV009",
		label: "평균 주문금액",
	},
	{
		cd: "OV010",
		label: "클럽머니",
	},
	{
		cd: "OV011",
		label: "좋아요",
	},
	{
		cd: "LV001",
		label: "Silver",
	},
	{
		cd: "LV002",
		label: "Gold",
	},
	{
		cd: "LV003",
		label: "VIP",
	},
	{
		cd: "UT001",
		label: "활성회원",
	},
	{
		cd: "UT002",
		label: "정지회원",
	},
	{
		cd: "UT003",
		label: "비활성회원",
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
