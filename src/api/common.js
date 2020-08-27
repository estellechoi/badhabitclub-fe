import axios from "axios";

const HTTP = axios.create({
	headers: {
		Accept: "application/json",
	},
});

export const getAddr = (param) => {
	return HTTP.get(
		`http://www.juso.go.kr/addrlink/addrLinkApi.do?resultType=json&confmKey=${
			process.env.VUE_APP_ADDR_API_CONFIRMKEY
		}&currentPage=${1}&countPerPage=${10}&keyword=${encodeURIComponent(
			param.keyword
		)}`,
		{
			"Content-Type": "text/plain;charset=UTF-8",
		}
	);
};

export const getAddrGoogle = (param) => {
	const latlng = Object.values(param);
	return HTTP.get(
		`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng[0]},${latlng[1]}&key=${process.env.VUE_APP_GOOGLEMAP_KEY}`,
		{
			"Content-Type": "text/plain;charset=UTF-8",
		}
	);
};
