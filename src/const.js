const country = [
	{ label: "Afghanistan", value: "AF" },
	{ label: "Aland Islands", value: "AX" },
	{ label: "Albania", value: "AL" },
	{ label: "Algeria", value: "DZ" },
	{ label: "American Samoa", value: "AS" },
	{ label: "Andorra", value: "AD" },
	{ label: "Angola", value: "AO" },
	{ label: "Anguilla", value: "AI" },
	{ label: "Antarctica", value: "AQ" },
	{ label: "Antigua and Barbuda", value: "AG" },
	{ label: "Argentina", value: "AR" },
	{ label: "Armenia", value: "AM" },
	{ label: "Aruba", value: "AW" },
	{ label: "Australia (Australia)", value: "AU" },
	{ label: "Austria", value: "AT" },
	{ label: "Azerbaijan", value: "AZ" },
	{ label: "Bahamas", value: "BS" },
	{ label: "Bahrain", value: "BH" },
	{ label: "Bangladesh", value: "BD" },
	{ label: "Barbados", value: "BB" },
	{ label: "Belarus", value: "BY" },
	{ label: "Belgium", value: "BE" },
	{ label: "Belize", value: "BZ" },
	{ label: "Benin", value: "BJ" },
	{ label: "Bermuda shorts", value: "BM" },
	{ label: "Bolivia", value: "BO" },
	{ label: "Bosnia and Herzegovina", value: "BA" },
	{ label: "Botswana", value: "BW" },
	{ label: "Bouvet Island", value: "BV" },
	{ label: "Brazil", value: "BR" },
	{ label: "British Indian Ocean Territory", value: "IO" },
	{ label: "British Virgin Islands", value: "VG" },
	{ label: "Brunei", value: "BN" },
	{ label: "Bulgaria", value: "BG" },
	{ label: "Burkina Faso", value: "BF" },
	{ label: "Burundi", value: "BI" },
	{ label: "butane", value: "BT" },
	{ label: "Cambodia", value: "KH" },
	{ label: "Cameroon", value: "CM" },
	{ label: "Canada", value: "CA" },
	{ label: "Cape Verde", value: "CV" },
	{ label: "catarrh", value: "QA" },
	{ label: "Cayman Islands", value: "KY" },
	{ label: "Central African Republic", value: "CF" },
	{ label: "Chad", value: "TD" },
	{ label: "Chile", value: "CL" },
	{ label: "China", value: "CN" },
	{ label: "Christmas Island", value: "CX" },
	{ label: "Cocos Islands", value: "CC" },
	{ label: "Columbia", value: "CO" },
	{ label: "Comoros", value: "KM" },
	{ label: "Cook islands", value: "CK" },
	{ label: "Costa Rica", value: "CR" },
	{ label: "Croatia", value: "HR" },
	{ label: "Cuba", value: "CU" },
	{ label: "Cyprus", value: "CY" },
	{ label: "Czech Republic", value: "CZ" },
	{ label: "Democratic Republic of the Congo", value: "CD" },
	{ label: "Denmark", value: "DK" },
	{ label: "Djibouti", value: "DJ" },
	{ label: "Dominican", value: "DM" },
	{ label: "Dominican Republic", value: "DO" },
	{ label: "East Timor", value: "TL" },
	{ label: "Ecuador", value: "EC" },
	{ label: "Egypt", value: "EG" },
	{ label: "El Salvador", value: "SV" },
	{ label: "England", value: "GB" },
	{ label: "Equatorial Guinea", value: "GQ" },
	{ label: "Eritrea", value: "ER" },
	{ label: "Estonia", value: "EE" },
	{ label: "Ethiopia", value: "ET" },
	{ label: "Falkland Islands", value: "FK" },
	{ label: "Faroe Islands", value: "FO" },
	{ label: "Federation of Micronesia", value: "FM" },
	{ label: "Finland", value: "FI" },
	{ label: "France", value: "FR" },
	{ label: "French Guiana", value: "GF" },
	{ label: "French Polynesia", value: "PF" },
	{ label: "French Southern and Antarctic Region", value: "TF" },
	{ label: "Gabon", value: "GA" },
	{ label: "Gambia", value: "GM" },
	{ label: "Georgia", value: "GE" },
	{ label: "Germany", value: "DE" },
	{ label: "Ghana", value: "GH" },
	{ label: "Gibraltar", value: "GI" },
	{ label: "Greece", value: "GR" },
	{ label: "Greenland", value: "GL" },
	{ label: "Guadeloupe", value: "GP" },
	{ label: "Guam", value: "GU" },
	{ label: "Guatemala", value: "GT" },
	{ label: "Guinea", value: "GN" },
	{ label: "Guinea-Bissau", value: "GW" },
	{ label: "Guyana", value: "GY" },
	{ label: "Haiti", value: "HT" },
	{ label: "Heard and McDonald Islands", value: "HM" },
	{ label: "Honduras", value: "HN" },
	{ label: "Hong Kong", value: "HK" },
	{ label: "Hungary", value: "HU" },
	{ label: "Iceland", value: "IS" },
	{ label: "India", value: "IN" },
	{ label: "Indonesia", value: "ID" },
	{ label: "Iran", value: "IR" },
	{ label: "Iraq", value: "IQ" },
	{ label: "Ireland", value: "IE" },
	{ label: "Israel", value: "IL" },
	{ label: "Italy", value: "IT" },
	{ label: "Ivory Coast", value: "CI" },
	{ label: "Jamaica", value: "JM" },
	{ label: "Japan", value: "JP" },
	{ label: "Jordan", value: "JO" },
	{ label: "Kazakhstan", value: "KZ" },
	{ label: "Kenya", value: "KE" },
	{ label: "Kiribati", value: "KI" },
	{ label: "Kuwait", value: "KW" },
	{ label: "Kyrgyzstan", value: "KG" },
	{ label: "Laos", value: "LA" },
	{ label: "Latvia", value: "LV" },
	{ label: "Lebanon", value: "LB" },
	{ label: "Lesotho", value: "LS" },
	{ label: "Liberia", value: "LR" },
	{ label: "Libya", value: "LY" },
	{ label: "Liechtenstein", value: "LI" },
	{ label: "Lithuania", value: "LT" },
	{ label: "Luxembourg", value: "LU" },
	{ label: "Macau", value: "MO" },
	{ label: "Madagascar", value: "MG" },
	{ label: "Malawi", value: "MW" },
	{ label: "Malaysia", value: "MY" },
	{ label: "Maldive Islands", value: "MV" },
	{ label: "Mali", value: "ML" },
	{ label: "Malta", value: "MT" },
	{ label: "Marshall Islands", value: "MH" },
	{ label: "Martinique", value: "MQ" },
	{ label: "Mauritania", value: "MR" },
	{ label: "Mauritius", value: "MU" },
	{ label: "Mayotte", value: "YT" },
	{ label: "Mexico", value: "MX" },
	{ label: "Moldova", value: "MD" },
	{ label: "Monaco", value: "MC" },
	{ label: "Mongolia", value: "MN" },
	{ label: "Montserrat", value: "MS" },
	{ label: "Morocco", value: "MA" },
	{ label: "Mozambique", value: "MZ" },
	{ label: "Myanmar", value: "MM" },
	{ label: "Namibia", value: "NA" },
	{ label: "Nauru", value: "NR" },
	{ label: "Nepal", value: "NP" },
	{ label: "Netherlands", value: "NL" },
	{ label: "Netherlands Antilles", value: "AN" },
	{ label: "New Zealand", value: "NZ" },
	{ label: "Nicaragua", value: "NI" },
	{ label: "Niger", value: "NE" },
	{ label: "Nigeria", value: "NG" },
	{ label: "Niue", value: "NU" },
	{ label: "Norfolk Island", value: "NF" },
	{ label: "Northern Mariana Islands", value: "MP" },
	{ label: "Norway", value: "NO" },
	{ label: "Nouvelle Caledonia", value: "NC" },
	{ label: "Oman", value: "OM" },
	{ label: "Pakistan", value: "PK" },
	{ label: "Palau", value: "PW" },
	{ label: "Palestine", value: "PS" },
	{ label: "Panama", value: "PA" },
	{ label: "Papua New Guinea", value: "PG" },
	{ label: "Paraguay", value: "PY" },
	{ label: "Peru", value: "PE" },
	{ label: "Philippines", value: "PH" },
	{ label: "Pitcairn Islands", value: "PN" },
	{ label: "Poland", value: "PL" },
	{ label: "Portugal", value: "PT" },
	{ label: "Puerto Rico", value: "PR" },
	{ label: "Republic of China (Taiwan)", value: "TW" },
	{ label: "Republic of Korea (국내 배송)", value: "KR" },
	{ label: "Republic of Macedonia", value: "MK" },
	{ label: "Republic of South Africa", value: "ZA" },
	{ label: "Republic of the Congo", value: "CG" },
	{ label: "Reunion", value: "RE" },
	{ label: "Romania", value: "RO" },
	{ label: "Russia", value: "RU" },
	{ label: "Rwanda", value: "RW" },
	{ label: "Saint Kitts and Nevis", value: "KN" },
	{ label: "Saint Lucia", value: "LC" },
	{ label: "Saint Pierre Miquelon", value: "PM" },
	{ label: "Saint Vincent and the Grenadines", value: "VC" },
	{ label: "Samoa", value: "WS" },
	{ label: "San Marino", value: "SM" },
	{ label: "Sao Tome and Principe", value: "ST" },
	{ label: "Saudi Arabia", value: "SA" },
	{ label: "sebum", value: "FJ" },
	{ label: "Senegal", value: "SN" },
	{ label: "Serbia and Montenegro", value: "CS" },
	{ label: "Seychelles", value: "SC" },
	{ label: "Sierra Leone", value: "SL" },
	{ label: "Singapore", value: "SG" },
	{ label: "Slovakia", value: "SK" },
	{ label: "Slovenian", value: "SI" },
	{ label: "Solomon Islands", value: "SB" },
	{ label: "Somalia", value: "SO" },
	{ label: "South Georgia and the South Sandwich Islands", value: "GS" },
	{ label: "Spain", value: "ES" },
	{ label: "Sri Lanka", value: "LK" },
	{ label: "St Helena", value: "SH" },
	{ label: "surname", value: "SR" },
	{ label: "Svalbard Jan Mayen", value: "SJ" },
	{ label: "Swaziland", value: "SZ" },
	{ label: "Sweden", value: "SE" },
	{ label: "Swiss", value: "CH" },
	{ label: "Syria", value: "SY" },
	{ label: "Tajikistan", value: "TJ" },
	{ label: "Tanzania", value: "TZ" },
	{ label: "The Democratic People's Republic of Korea", value: "KP" },
	{ label: "tie", value: "TH" },
	{ label: "Togo", value: "TG" },
	{ label: "Tokelau Islands", value: "TK" },
	{ label: "Tonga", value: "TO" },
	{ label: "Trinidad and Tobago", value: "TT" },
	{ label: "Tunisia", value: "TN" },
	{ label: "Turkey", value: "TR" },
	{ label: "Turkmenistan", value: "TM" },
	{ label: "Turks and Caicos Islands", value: "TC" },
	{ label: "Tuvalu", value: "TV" },
	{ label: "U.S. minor system", value: "UM" },
	{ label: "U.S. Virgin Islands", value: "VI" },
	{ label: "Uganda", value: "UG" },
	{ label: "Ukraine", value: "UA" },
	{ label: "United Arab Emirates", value: "AE" },
	{ label: "Uruguay", value: "UY" },
	{ label: "USA", value: "US" },
	{ label: "Uzbekistan", value: "UZ" },
	{ label: "Vanuatu", value: "VU" },
	{ label: "Vatican City", value: "VA" },
	{ label: "Venezuela", value: "VE" },
	{ label: "Vietnam", value: "VN" },
	{ label: "Wagner grenadines", value: "GD" },
	{ label: "Wallis and Futuna", value: "WF" },
	{ label: "Way", value: "SD" },
	{ label: "Western Sahara", value: "EH" },
	{ label: "Yemen", value: "YE" },
	{ label: "Zambia", value: "ZM" },
	{ label: "Zimbabwe", value: "ZW" },
];

const payMtd = {
	PM001: {
		label: "신용/체크카드",
		value: "PM001",
		desc: [`MAC 환경에서도 신용카드 결제가 가능합니다.(ISP 결제 제외)`],
	},
	PM002: {
		label: "현대카드",
		value: "PM002",
		imgClass: "pay-mtd-item__label--hdcard",
		desc: [
			`모든 상품 2% 청구할인, 20% M포인트 사용, 3개월 무이자 할부 혜택이 제공됩니다.`,
			`M포인트 사용을 안 할 경우 결제 시 카드 포인트 사용 팝업창에서 사용안함을 선택하시면 됩니다.`,
			`30만원 이상 the Red Edition2 결제 시 레드 쇼핑 바우처 사용을 선택하여 이용하실 수 있습니다.`,
			`M포인트 사용과 바우처는 중복 사용할 수 없습니다.`,
			`바우처를 이용한 구매는 교환 및 부분 취소가 불가합니다. (전체 취소 후 재결제)`,
			`바우처 사용은 즉시 할인이 아닌 청구할인으로 결제 적용됩니다.`,
			`현대카드 Familly카드 (임직원 카드) 결제 시 5% 청구할인 혜택이 제공됩니다.`,
		],
	},
	PM007: {
		label: "무통장입금",
		value: "PM007",
		desc: [
			`입금기한: 주문기준일 +3일`,
			`무통장 입금시 사용되는 가상계좌는 매 주문 시마다 새로운 계좌번호(개인전용)가 부여되며 해당 주문에만 유효합니다.`,
			`다른 주문건에 대한 가상계좌로 입금하시거나 잘못된 계좌로 입금하시면 자동 입금 확인이 되지 않으며, 다른 계좌번호로 잘못 입력하신 경우에는 고객센터로 문의 주시기 바랍니다.`,
		],
	},
	PM008: {
		label: "휴대폰결제",
		value: "PM008",
		desc: [
			`배드해빗클럽에서 휴대폰으로 결제 가능한 최대 금액은 월 30만원 이며 개인별 한도금액은 통신사 및 개인 설정에 따라 다를 수 있습니다.`,
			`휴대폰으로 결제하신 금액은 익월 휴대폰 요금에 함께 청구되며 별도의 수수료는 부과되지 않습니다.`,
			`휴대폰 소액결제로 구매하실 경우 현금영수증이 발급되지 않습니다.`,
			`다음의 경우에는 휴대폰 결제를 이용하실 수 없습니다:
		  - 미납/체납 중인 휴대폰 요금이 있을 경우
		  - 이동통신사 가입기간(번호이동포함) 6개월 이하인 경우
		  - 외국인, 미성년자 요금제, 법인휴대폰, 선불요금제인 경우
		  - LGT 이용자 중 통신사로 [자동결제] 차단 신청하신 경우`,
			`취소/반품/환불시:
		  - 결제 당월 취소/반품/품절환불 : 휴대폰 이용요금에 부과예정이던 금액이 취소됩니다.
		  - 결제 당월 지난 후 취소/반품/품절환불 : 환불계좌 확인 후 무통장 계좌로`,
		],
	},
	PM003: {
		label: "네이버페이",
		value: "PM003",
		imgClass: "pay-mtd-item__label--npay",
		desc: [
			`네이버페이는 네이버ID로 별도 앱 설치 없이 신용카드 또는 은행계좌 정보를 등록하여 네이버페이 비밀번호로 결제할 수 있는 간편결제 서비스입니다.`,
			`네이버페이 카드 간편결제는 네이버페이에서 제공하는 카드사 별 무이자, 청구할인 혜택을 받을 수 있습니다.`,
			`결제 가능한 신용카드:
		신한, 삼성, 현대, BC, 국민, 하나, 롯데, NH농협, 씨티`,
			`결제 가능한 은행:
		NH농협, 국민, 신한, 우리, 기업, SC제일, 부산, 경남, 수협, 우체국`,
		],
	},
	PM004: {
		label: "토스",
		value: "PM004",
		imgClass: "pay-mtd-item__label--toss",
		desc: [`자세한 내용은 토스에서 제공하는 카드사별 정책을 확인해주세요.`],
	},
	PM005: {
		label: "카카오페이",
		value: "PM005",
		imgClass: "pay-mtd-item__label--kakao",
		desc: [
			`자세한 내용은 카카오페이에서 제공하는 카드사별 정책을 확인해주세요.`,
			`결제 불가 카드: 현대카드`,
		],
	},
	PM006: {
		label: "페이코",
		value: "PM006",
		imgClass: "pay-mtd-item__label--payco",
		desc: [`MAC 환경에서도 신용카드 결제가 가능합니다.(ISP 결제 제외)`],
	},
};

const userLevel = {
	LV001: {
		label: "Silver",
		pointRate: 0.01,
	},
	LV002: {
		label: "GOLD",
		pointRate: 0.012,
	},
	LV003: {
		label: "DIAMOND",
		pointRate: 0.02,
	},
};

export default {
	data() {
		return {
			CONST: {
				country,
				payMtd,
				userLevel,
			},
		};
	},
};