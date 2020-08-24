<template>
	<div>
		<div>
			<h1 class="title">주문정보 및 결제</h1>
		</div>

		<div class="chkout-container">
			<section class="chkout-form-box">
				<h2 class="blind-box">배송 및 결제정보</h2>

				<fieldset class="chkout-fs">
					<legend class="chkout-fs__title">배송지 정보</legend>

					<label class="input-field chkout-fs__item">
						<div class="input-label">
							<span id="chkout-fs-receiver">
								수령인 이름
								<span class="icon--required">*</span>
							</span>
						</div>

						<div class="text-input">
							<input
								type="text"
								class="text-input__input"
								aria-labelledby="chkout-fs-receiver"
								aria-required="true"
								autocomplete="off"
								autocorrect="off"
								spellcheck="false"
								autocapitalize="none"
								v-model="orderInfo.receiver"
							/>
						</div>
					</label>

					<div class="chkout-fs__item chkout-fs__item--w-btn">
						<label class="input-field">
							<div class="input-label">
								<span id="chkout-fs-zipcd">
									우편번호
									<span class="icon--required">*</span>
								</span>
							</div>

							<div class="text-input">
								<input
									type="text"
									class="text-input__input text-input__input--readonly"
									aria-labelledby="chkout-fs-zipcd"
									aria-required="true"
									autocomplete="off"
									autocorrect="off"
									spellcheck="false"
									autocapitalize="none"
									v-model="orderInfo.zipCd"
									readonly
								/>
							</div>
						</label>
						<button
							type="button"
							class="btn"
							@click="openAddrBox = !openAddrBox"
						>
							{{ openAddrBox ? "검색창 닫기" : "우편번호 검색" }}
						</button>
					</div>

					<div class="chkout-fs-direc chkout-addr-sec" v-if="openAddrBox">
						<div class="chkout-addr-box">
							<div class="chkout-addr-search-box">
								<div class="text-input">
									<input
										type="text"
										aria-label="도로명 주소검색"
										autocomplete="off"
										autocorrect="off"
										spellcheck="false"
										autocapitalize="none"
										class="text-input__input"
										v-model="addrSearchText"
										@input="searchAddr"
									/>
								</div>

								<button
									type="button"
									aria-label="검색"
									class="btn btn--primary"
									@click="searchAddr"
								>
									<i class="fas fa-search" aria-hidden="true"></i>
								</button>

								<button type="button" class="blind-box">검색창 닫기</button>
							</div>

							<div class="chkout-addr-rslt-box">
								<ul class="chkout-addr-rslt-list" v-if="fetchedAddrList.length">
									<li
										class="chkout-addr-rslt"
										v-for="(item, index) in fetchedAddrList"
										:key="index"
									>
										<div class="chkout-addr-rslt__zipcd">
											{{ item.zipNo }}
										</div>
										<dl @click="(evt) => selectAddr(evt, item.zipNo)">
											<div class="chkout-addr-rslt__addr">
												<dt class="chkout-addr-rslt__addr-dt">도로명</dt>
												<dd class="chkout-addr-rslt__addr-dd">
													<button
														type="button"
														class="chkout-addr-rslt__addr-sel-btn"
													>
														{{ item.roadAddr }} {{ item.bdNm || "" }}
													</button>
												</dd>
											</div>

											<div class="chkout-addr-rslt__addr">
												<dt class="chkout-addr-rslt__addr-dt">지번</dt>
												<dd class="chkout-addr-rslt__addr-dd">
													<button
														type="button"
														class="chkout-addr-rslt__addr-sel-btn"
													>
														{{ item.jibunAddr }}
													</button>
												</dd>
											</div>
										</dl>
									</li>
								</ul>

								<div v-else>
									<p class="chkout-addr-no-rslt">
										검색결과가 없습니다. 잘못된 철자가 없는지, 정확한 주소인지
										다시 한번 확인해 주세요.
									</p>
								</div>
							</div>
						</div>
					</div>

					<label class="input-field chkout-fs__item">
						<div class="input-label">
							<span id="chkout-fs-address">
								주소
								<span class="icon--required">*</span>
							</span>
						</div>

						<div class="text-input">
							<input
								type="text"
								class="text-input__input text-input__input--readonly"
								aria-labelledby="chkout-fs-address"
								aria-required="true"
								autocomplete="off"
								autocorrect="off"
								spellcheck="false"
								autocapitalize="none"
								v-model="orderInfo.address"
								readonly
							/>
						</div>
					</label>

					<label class="input-field chkout-fs__item">
						<div class="input-label">
							<span id="chkout-fs-sub-address" class="blind-box">
								상세주소
								<span>*</span>
							</span>
						</div>

						<div class="text-input">
							<input
								type="text"
								class="text-input__input"
								aria-labelledby="chkout-fs-sub-address"
								aria-required="true"
								autocomplete="off"
								autocorrect="off"
								spellcheck="false"
								autocapitalize="none"
								v-model="orderInfo.subAddress"
							/>
						</div>
					</label>

					<div class="chkout-fs__item chkout-fs__item--country-cd">
						<div class="input-label">
							<span>
								연락처
								<span class="icon--required">*</span>
							</span>
						</div>

						<select-box
							id="chkout-fs-country-code"
							:list="countryCdList"
							default-label="국가코드"
							@change="selectCountryCd"
						></select-box>
					</div>

					<label class="input-field chkout-fs__item">
						<div class="input-label">
							<span id="chkout-fs-telno" class="blind-box">
								전화번호
								<span>*</span>
							</span>
						</div>

						<div class="text-input">
							<input
								type="tel"
								class="text-input__input"
								aria-labelledby="chkout-fs-telno"
								aria-required="true"
								autocomplete="off"
								autocorrect="off"
								spellcheck="false"
								autocapitalize="none"
								placeholder="하이픈(-) 없이 입력해주세요"
								v-model="orderInfo.telNo"
							/>
						</div>
					</label>

					<label class="input-field chkout-fs__item">
						<div class="input-label">
							<span id="chkout-fs-delivery-requests">배송시 요청사항</span>
						</div>

						<div class="text-input">
							<input
								type="text"
								class="text-input__input"
								aria-labelledby="chkout-fs-delivery-requests"
								aria-required="false"
								autocomplete="off"
								autocorrect="off"
								spellcheck="false"
								autocapitalize="none"
								v-model="orderInfo.deliReq"
							/>
						</div>
					</label>

					<div class="chkout-fs-direc">
						<ul>
							<li v-for="(item, index) in diretions" :key="index">
								{{ item }}
							</li>
						</ul>

						<div class="chkout-fs-chckbox">
							<checkbox
								label="다음에도 이 배송지 정보를 사용합니다"
								id="keep-delivery-address-info"
								:checked="true"
								@change="toggleKeepAddr"
							></checkbox>
						</div>
					</div>
				</fieldset>

				<fieldset class="chkout-fs">
					<legend class="chkout-fs__title">쿠폰 / 클럽머니</legend>

					<div class="chkout-fs__item chkout-fs__item--country-cd">
						<div class="input-label">
							<span>쿠폰</span>
						</div>

						<select-box
							id="chkout-fs-coupon"
							:list="myInfo.couponList"
							:disabled="!couponCnt"
							:default-label="
								couponCnt ? `보유 쿠폰 ${couponCnt}장` : '보유 쿠폰 없음'
							"
							@change="selectCoupon"
						></select-box>
					</div>

					<div class="chkout-fs__item chkout-fs__item--w-btn">
						<label class="input-field">
							<div class="input-label" aria-hidden="true">
								<span id="chkout-fs-club-money">클럽머니</span>
							</div>

							<div class="text-input">
								<input
									type="number"
									class="text-input__input"
									aria-label="사용할 클럽머니 금액"
									autocomplete="off"
									step="10"
									min="0"
									:max="myInfo.cm"
									aria-valuemin="0"
									:aria-valuemax="myInfo.cm"
									:aria-valuenow="orderInfo.cm"
									v-model="orderInfo.cm"
									@input="inputCmAmt"
									@blur="checkCmAmt"
								/>
							</div>
						</label>

						<button type="button" class="btn" @click="toggleCm">
							{{ cmBtnLabel }}
						</button>
					</div>

					<div class="chkout-fs-direc">
						<span class="chkout-fs-direc--colored">
							내 클럽머니 ₩
							<span class="chkout-fs-direc--em">{{
								myInfo.cm | addCommas
							}}</span>
						</span>
					</div>
				</fieldset>

				<fieldset class="chkout-fs">
					<legend class="chkout-fs__title">결제 방법</legend>

					<ul class="pay-mtd-list">
						<li
							class="pay-mtd-item"
							v-for="(item, index) in payMtdList"
							:key="index"
						>
							<div>
								<input
									type="radio"
									:id="`radio-pay-mtd-${index}`"
									class="blind-box"
									:value="item.value"
									v-model="orderInfo.payMtd"
								/>
								<label
									:for="`radio-pay-mtd-${index}`"
									class="pay-mtd-item__label"
									:class="[
										item.imgClass,
										orderInfo.payMtd === item.value
											? 'pay-mtd-item__label--selected'
											: '',
									]"
								>
									<span :class="{ 'blind-box': item.imgClass }">{{
										item.label
									}}</span>
								</label>
							</div>

							<div
								class="pay-mtd-item__desc-box"
								v-if="orderInfo.payMtd === item.value"
							>
								<div class="pay-mtd-item__desc-title">{{ item.label }}</div>
								<ul class="pay-mtd-item__desc-list">
									<li
										class="pay-mtd-item__desc-item"
										v-for="(desc, index) in item.desc"
										:key="index"
									>
										<p class="pay-mtd-item__desc-content">{{ desc }}</p>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</fieldset>
			</section>

			<section class="chkout-order-info-box">
				<div class="container">
					<div class="chkout-order-info-title-box">
						<h2 class="chkout-order-info-title">
							주문상품 정보 (총 {{ orderCnt }}개)
						</h2>
					</div>

					<div class="chkout-prdt-box">
						<ul>
							<li
								class="chkout-prdt-item"
								v-for="(item, index) in orderList"
								:key="index"
							>
								<div>
									<a class="chkout-prdt-link">
										<div class="chkout-prdt-img-box">
											<img
												class="chkout-prdt-img"
												:src="item.prdtInfo.img.path"
												:alt="item.prdtInfo.img.alt"
											/>
										</div>

										<div>
											<div class="chkout-prdt-name">
												{{ item.prdtInfo.prdtName }}
											</div>
											<div>
												<b class="chkout-prdt-opt"
													>{{ item.optionLabel }}: {{ item.label }}</b
												>
											</div>
											<div class="chkout-prdt-price">
												<span
													class="chkout-prdt-dscnt"
													v-if="item.prdtInfo.dscntRate"
													>[{{ item.prdtInfo.dscntRate * 100 }}%]</span
												>
												{{ item.prdtInfo.salePrice * item.qty }} /
												{{ item.qty }}개
											</div>
										</div>
									</a>
								</div>
							</li>
						</ul>
					</div>

					<div class="chkout-total-box">
						<div class="bag-total-box">
							<ul>
								<li>
									<span class="total-box__label">총 주문금액</span>
									<span class="bag-total-box__price">
										<span class="bag-total-box__price-unit">₩</span>
										{{ bagInfo.totalAmt | addCommas }}
									</span>
								</li>
								<li>
									<span class="total-box__label">배송비</span>
									<span class="bag-total-box__price">
										<span class="bag-total-box__price-unit">₩</span>
										{{ bagInfo.deliCharge | addCommas }}
									</span>
								</li>
								<li>
									<span class="total-box__label">클럽머니 사용</span>
									<span class="bag-total-box__price">
										<span class="bag-total-box__price-unit">₩</span>
										{{ orderInfo.cm | addCommas }}
									</span>
								</li>
								<li>
									<span class="total-box__label">쿠폰 사용</span>
									<span class="bag-total-box__price">
										<span class="bag-total-box__price-unit">₩</span>
										{{ couponDscntAmt | addCommas }}
									</span>
								</li>
							</ul>

							<div>
								<div class="bag-total-box__total">
									<span class="total-box__label">합계</span>
									<span class="bag-total-box__price">
										<span class="bag-total-box__price-unit">₩</span>
										{{ totalPayAmt | addCommas }}
									</span>
								</div>
							</div>

							<div>
								<checkbox
									:id="'check-confirm-order'"
									label="주문하실 상품 및 결제, 주문정보 확인하였으며, 이에 동의합니다. (필수)"
									@change="toggleConfirmOrder"
								></checkbox>
							</div>

							<button
								type="button"
								class="em-btn em-btn--buy-now"
								:class="{ 'checkout-ready': confirmOrder }"
							>
								결제하기
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
import { getAddr } from "./../../../api/common.js";

export default {
	props: {
		bagInfo: {
			type: Object,
			default() {
				return null;
			},
		},
	},
	data() {
		return {
			orderList: [],
			orderInfo: {
				receiver: "",
				zipCd: "",
				address: "",
				subAddress: "",
				telCountryCd: "",
				telNo: "",
				deliReq: "",
				cm: 0,
				coupontDscnt: 0,
				saveAsBasic: false,
				payMtd: null,
			},
			myInfo: {
				cm: 10000,
				couponList: [
					{
						label: "사용 안함",
						value: "",
						rate: 0,
					},
					{
						label: "첫구매 10% 할인 구폰 (최대 1만원 할인)",
						value: "CP001",
						rate: 0.1,
					},
				],
			},
			countryCdList: [
				{
					label: "한국 (+82)",
					value: "82",
				},
			],
			diretions: [
				"제주 및 도서 산간 지역의 배송은 추가 배송비가 발생할 수 있습니다.",
			],
			payMtdList: [
				{
					label: "신용/체크카드",
					value: "PM001",
					desc: [`MAC 환경에서도 신용카드 결제가 가능합니다.(ISP 결제 제외)`],
				},
				{
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
				{
					label: "무통장입금",
					value: "PM007",
					desc: [
						`입금기한: 주문기준일 +3일`,
						`무통장 입금시 사용되는 가상계좌는 매 주문 시마다 새로운 계좌번호(개인전용)가 부여되며 해당 주문에만 유효합니다.`,
						`다른 주문건에 대한 가상계좌로 입금하시거나 잘못된 계좌로 입금하시면 자동 입금 확인이 되지 않으며, 다른 계좌번호로 잘못 입력하신 경우에는 고객센터로 문의 주시기 바랍니다.`,
					],
				},
				{
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
				{
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
				{
					label: "토스",
					value: "PM004",
					imgClass: "pay-mtd-item__label--toss",
					desc: [
						`자세한 내용은 토스에서 제공하는 카드사별 정책을 확인해주세요.`,
					],
				},
				{
					label: "카카오페이",
					value: "PM005",
					imgClass: "pay-mtd-item__label--kakao",
					desc: [
						`자세한 내용은 카카오페이에서 제공하는 카드사별 정책을 확인해주세요.`,
						`결제 불가 카드: 현대카드`,
					],
				},
				{
					label: "페이코",
					value: "PM006",
					imgClass: "pay-mtd-item__label--payco",
					desc: [`MAC 환경에서도 신용카드 결제가 가능합니다.(ISP 결제 제외)`],
				},
			],
			useAllCm: false,
			confirmOrder: false,
			openAddrBox: false,
			addrSearchText: "",
			fetchedAddrList: [],
		};
	},
	computed: {
		orderCnt() {
			return this.orderList
				.map((item) => item.qty)
				.reduce((accm, item) => accm + item, 0);
		},
		cmBtnLabel() {
			return this.useAllCm ? "사용 안함" : "모두 사용";
		},
		couponCnt() {
			return this.myInfo.couponList.length - 1;
		},
		couponDscntAmt() {
			return this.orderInfo.coupontDscnt * this.bagInfo.totalAmt;
		},
		totalPayAmt() {
			return (
				this.bagInfo.totalAmt +
				this.bagInfo.deliCharge -
				this.orderInfo.cm -
				this.couponDscntAmt
			);
		},
	},
	methods: {
		searchAddr() {
			if (this.addrSearchText.length < 2) return (this.fetchedAddrList = []);

			getAddr({ keyword: this.addrSearchText }).then((res) => {
				console.log(res);
				const rslt = res.data.results;
				if (rslt.common.errorCode !== "0")
					return alert("도로명 주소검색 API 오류");
				this.fetchedAddrList = rslt.juso;
			});
		},
		selectAddr(evt, zipNo) {
			console.log(evt);
			this.orderInfo.zipCd = zipNo;
			this.orderInfo.address = evt.target.innerText;
			this.openAddrBox = false;
		},
		selectCountryCd(val) {
			this.orderInfo.telCountryCd = val.value;
		},
		selectCoupon(val) {
			this.orderInfo.coupontDscnt = val.rate;
		},
		toggleKeepAddr(val) {
			this.orderInfo.saveAsBasic = val;
		},
		toggleCm() {
			this.useAllCm = !this.useAllCm;
			this.orderInfo.cm = this.useAllCm ? this.myInfo.cm : 0;
		},
		inputCmAmt() {
			if (this.orderInfo.cm > this.myInfo.cm)
				return (this.orderInfo.cm = this.myInfo.cm);

			const maxAmt = this.bagInfo.totalAmt + this.bagInfo.deliCharge;
			if (this.orderInfo.cm > maxAmt) this.orderInfo.cm = maxAmt;
		},
		checkCmAmt() {
			if (!this.orderInfo.cm.length) this.orderInfo.cm = 0;
		},
		toggleConfirmOrder(val) {
			this.confirmOrder = val;
		},
	},
	mounted() {
		this.orderList = this.bagInfo.orderList;
	},
};
</script>

<style></style>
