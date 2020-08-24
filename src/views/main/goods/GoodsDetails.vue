<template>
	<div>
		<div class="prdt-info-box">
			<div class="prdt-detail">
				<!-- IMAGE BOX -->
				<div class="prdt-detail__prdt-img">
					<img
						v-for="(item, index) in prdtInfo.imgList"
						:key="index"
						:src="item.path"
						:alt="`${prdtInfo.prdtName} ${item.alt} 사진`"
					/>
				</div>

				<!-- DETAILS -->
				<div class="prdt-detail__desc">
					<!-- HIGHLIGHTS -->
					<ul class="prdt-highlights-list">
						<li
							class="prdt-highlights-item"
							v-for="(item, index) in prdtInfo.hightlights"
							:key="index"
						>
							<div class="prdt-highlights-item__icon">
								<span v-html="item.icon"></span>
							</div>
							<div>
								<div class="prdt-highlights-item__title">{{ item.label }}</div>
								<div class="prdt-highlights-item__desc">{{ item.desc }}</div>
							</div>
						</li>
					</ul>

					<!-- SIZE DETAILS -->
					<div class="prdt-size-details">
						<custom-table
							:caption="'사이즈 상세'"
							:caption-class="'prdt-details-sub-title'"
							:columns="[
								{
									title: 'Size',
									data: 'label',
								},
								{
									title: '총길이',
									data: 'length',
								},
								{
									title: '가슴',
									data: 'chest',
								},
								{
									title: '어깨',
									data: 'shoulder',
								},
								{
									title: '소매',
									data: 'arm',
								},
								{
									title: '암홀',
									data: 'armhole',
								},
							]"
							:row-data="prdtInfo.optionsList"
						></custom-table>
					</div>
				</div>
			</div>

			<div class="prdt-buy-helper">
				<div class="prdt-summary">
					<!-- PRDT HEADER -->
					<div class="prdt-header prdt-summary__content">
						<h1 class="prdt-header__title">{{ prdtInfo.prdtName }}</h1>

						<div class="prdt-header__info">
							<rating-star
								:star-cnt="starCnt"
								:raters-cnt="prdtInfo.reviewList.length"
								:label="' 개 리뷰 보기'"
							></rating-star>
						</div>

						<div class="prdt-btn-box">
							<button class="prdt-fav-btn" @click="toggleLike">
								<span class="blind-box">좋아요</span>
								<i class="fa-heart" :class="like ? 'fas' : 'far'"></i>
								<!-- <i class="fas fa-heart"></i> -->
							</button>

							<button class="prdt-share-btn" @click="showModalShare = true">
								<span class="blind-box">공유하기</span>
								<i class="fas fa-share-alt"></i>
							</button>
						</div>
					</div>

					<!-- PRDT PRICE -->
					<div class="prdt-price prdt-summary__content">
						<price-tag
							:dscntRate="prdtInfo.dscntRate"
							:originPrice="prdtInfo.originPrice"
							:salePrice="prdtInfo.salePrice"
						></price-tag>
					</div>

					<!-- PRDT BENEFITS -->
					<div class="buy-benefits prdt-summary__content">
						<details class="benefits-box">
							<summary class="benefits-box__title"
								>추가 혜택을 확인하세요</summary
							>
							<ul class="benefits-box__list">
								<li
									class="benefits-box__item"
									v-for="(item, index) in bnftList"
									:key="index"
								>
									<span>{{ item.title }}</span>
									<span>
										<span v-html="item.unit"></span>
										{{
											(item.benefitRate *
												prdtInfo.originPrice *
												prdtInfo.dscntRate)
												| addCommas
										}}
										{{ item.description ? `(${item.description})` : "" }}
									</span>
								</li>
							</ul>
						</details>
					</div>

					<!-- SELECT OPTIONS -->
					<div class="buy-options prdt-summary__content">
						<select-box
							id="buy-options"
							:list="prdtInfo.optionsList"
							:defaultLabel="prdtInfo.optionLabel"
							@change="pushSelected"
						></select-box>
					</div>

					<div v-if="selectedList.length">
						<div class="selected-prdts prdt-summary__content">
							<ul class="selected-prdts-list" @click="discardItem">
								<li
									class="selected-prdts-item"
									v-for="(item, index) in selectedList"
									:key="index"
								>
									<div>{{ item.label }}</div>

									<spinner
										:label="item.label"
										@change="(val) => (item.qty = val)"
									></spinner>

									<div class="selected-prdts-item__amt">
										<span>{{
											(item.qty * prdtInfo.salePrice) | addCommas
										}}</span>
										<button
											type="button"
											class="selected-prdts-item__disc-btn"
											:aria-label="`${item.label} 옵션 선택 취소`"
										>
											<i
												class="fas fa-times selected-prdts-item__disc-icon"
												:data-option="item.value"
											></i>
										</button>
									</div>
								</li>
							</ul>
						</div>

						<div class="total-amt-box prdt-summary__content">
							<span class="total-amt">₩ {{ totalAmt | addCommas }}</span>
						</div>
					</div>

					<div class="msg-box" v-if="alertMsg">
						<span>{{ alertMsg }}</span>
					</div>

					<div class="buy-btn-box prdt-summary__content">
						<button type="button" class="em-btn" @click="putIntoBag">
							{{ bagStatus }}
						</button>
						<button
							type="button"
							class="em-btn em-btn--buy-now"
							@click="buyNow"
						>
							Buy Now
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="prdt-review-box">
			<div>
				<h2 class="prdt-review prdt-details-sub-title">
					<rating-star
						:star-cnt="starCnt"
						:raters-cnt="prdtInfo.reviewList.length"
					></rating-star>
				</h2>
			</div>

			<div>
				<ul>
					<li v-for="(item, index) in prdtInfo.reviewList" :key="index">
						<article class="prdt-review-artc">
							<header class="prdt-review-artc__header">
								<div class="prdt-review-artc__profile-img">
									<a :aria-label="item.userName">
										<img
											:src="item.userProfImgPath"
											:alt="`${item.userName} 프로필 사진`"
										/>
									</a>
								</div>

								<div class="prdt-review-artc__user-info">
									{{ item.userName }}
									<div class="prdt-review-artc__reg-dt">
										<span>{{ item.regDt }}</span>
									</div>
								</div>
							</header>

							<div class="prdt-review-artc__main-con">
								<p>{{ item.content }}</p>
							</div>
						</article>
					</li>
				</ul>
			</div>
		</div>

		<!-- MODAL -->
		<modal
			v-if="showModalShare"
			:aria-label="'상품 정보 공유하기'"
			@close="showModalShare = false"
		>
			<share slot="body"></share>
		</modal>
	</div>
</template>

<script>
import Share from "./../../modal/Share.vue";
import bus from "./../../../utils/bus.js";

export default {
	components: {
		Share,
	},
	data() {
		return {
			showModalShare: false,
			puttingStatus: 0,
			prdtInfo: {
				id: 2,
				prdtName: "Day Cap",
				originPrice: 30000,
				dscntRate: 0.66,
				salePrice: 30000 * 0.66,
				imgList: [
					{
						path: "/img/prdt1.png",
						alt: "상품 메인",
					},
					{
						path: "/img/prdt1-side.png",
						alt: "상품 상세",
					},
				],
				hightlights: [
					{
						label: "친환경 소재",
						value: "0",
						icon: '<i class="fab fa-pagelines"></i>',
						desc: "면 100%",
					},
					{
						label: "첫 세탁 단독세탁",
						value: "1",
						icon: '<i class="fas fa-tint"></i>',
						desc: "첫 세탁 단독세탁 필수",
					},
					{
						label: "중고",
						value: "2",
						icon: '<i class="fas fa-tshirt"></i>',
						desc: "업사이클링 상품",
					},
					{
						label: "인기있는 상품",
						value: "3",
						icon: '<i class="fas fa-heart"></i>',
						desc: "100명 이상의 좋아요",
					},
					{
						label: "빠른 배송",
						value: "4",
						icon: '<i class="fas fa-fighter-jet"></i>',
						desc: "오후 2시 이전 주문시 당일 발송",
					},
					{
						label: "무료 배송",
						value: "5",
						icon: '<i class="fas fa-comment-dollar"></i>',
						desc: "주문 금액 상관없이 무료 배송",
					},
				],
				optionLabel: "사이즈",
				optionsList: [
					{
						label: "S",
						value: "1",
						length: 68,
						chest: 62,
						shoulder: 69,
						arm: 58,
						armhole: 26,
					},
					{
						label: "M",
						value: "2",
						length: 68,
						chest: 62,
						shoulder: 69,
						arm: 58,
						armhole: 26,
					},
				],
				reviewList: [
					{
						userName: "Bomnie",
						content: "모자 너무 조아용 히히히",
						userProfImgPath: "/img/profile.png",
						star: 5,
						regDt: "2020-08-01",
					},
					{
						userName: "Bomnie",
						content: "모자 너무 조아용 히히히",
						userProfImgPath: "/img/profile.png",
						star: 5,
						regDt: "2020-08-01",
					},
					{
						userName: "Bomnie",
						content: "모자 너무 조아용 히히히",
						userProfImgPath: "/img/profile.png",
						star: 4,
						regDt: "2020-08-01",
					},
					{
						userName: "Bomnie",
						content: "모자 너무 조아용 히히히",
						userProfImgPath: "/img/profile.png",
						star: 2,
						regDt: "2020-08-01",
					},
					{
						userName: "Bomnie",
						content: "모자 너무 조아용 히히히",
						userProfImgPath: "/img/profile.png",
						star: 4,
						regDt: "2020-08-01",
					},
					{
						userName: "Bomnie",
						content: "모자 너무 조아용 히히히",
						userProfImgPath: "/img/profile.png",
						star: 4,
						regDt: "2020-08-01",
					},
					{
						userName: "Bomnie",
						content: "모자 너무 조아용 히히히",
						userProfImgPath: "/img/profile.png",
						star: 5,
						regDt: "2020-08-01",
					},
					{
						userName: "Bomnie",
						content: "모자 너무 조아용 히히히",
						userProfImgPath: "/img/profile.png",
						star: 4,
						regDt: "2020-08-01",
					},
					{
						userName: "Bomnie",
						content: "모자 너무 조아용 히히히",
						userProfImgPath: "/img/profile.png",
						star: 4,
						regDt: "2020-08-01",
					},
					{
						userName: "Bomnie",
						content: "모자 너무 조아용 히히히",
						userProfImgPath: "/img/profile.png",
						star: 5,
						regDt: "2020-08-01",
					},
					{
						userName: "Bomnie",
						content: "모자 너무 조아용 히히히",
						userProfImgPath: "/img/profile.png",
						star: 4,
						regDt: "2020-08-01",
					},
					{
						userName: "Bomnie",
						content: "모자 너무 조아용 히히히",
						userProfImgPath: "/img/profile.png",
						star: 5,
						regDt: "2020-08-01",
					},
				],
			},
			bnftList: [
				{
					title: "현대카드로 결제시",
					benefitRate: 0.98,
					unit: "₩",
					description: "2% 청구할인",
				},
				{
					title: "할부금",
					benefitRate: 0.5,
					unit: "₩",
					description: "2개월 할부시",
				},
				{
					title: "적립금",
					benefitRate: 0.01,
					unit: "<i class='fab fa-bitcoin'></i>",
				},
			],
			like: false,
			selectedList: [],
			alertMsg: null,
			starCnt: 0,
			starList: [1, 2, 3, 4, 5],
		};
	},
	computed: {
		totalAmt() {
			let amt = 0;
			this.selectedList.forEach((item) => {
				amt += item.qty * this.prdtInfo.salePrice;
			});
			return amt;
		},
		bagStatus() {
			let label = "Shopping Bag";
			switch (this.puttingStatus) {
				case 0:
					label = "Shopping Bag";
					break;
				case 1:
					label = "Wait...";
					break;
				case 2:
					label = "Ok!";
					break;
			}
			return label;
		},
	},
	watch: {
		selectedList(newVal) {
			if (newVal.length) this.alertMsg = null;
		},
	},
	methods: {
		closeModal() {
			console.log("호출!");
			this.showModalShare = false;
		},
		toggleLike() {
			this.like = !this.like;
		},
		pushSelected(val) {
			if (this.selectedList.some((item) => item.value === val.value)) return;
			this.selectedList.push({ ...val, qty: 1 });
		},
		discardItem(evt) {
			const target = evt.target;
			if (target.tagName !== "I") return;

			this.selectedList.some((item, index) => {
				if (item.value === target.dataset.option) {
					this.selectedList.splice(index, 1);
					return true;
				}
			});
		},
		putIntoBag() {
			if (!this.selectedList.length)
				return (this.alertMsg = "사이즈를 선택해주세요.");

			this.puttingStatus = 1;
			window.setTimeout(() => {
				this.puttingStatus = 2;
				window.setTimeout(() => {
					this.puttingStatus = 0;
					bus.$emit("change-bag");

					// 쇼핑백 담기 api
					const param = this.selectedList.map((item) => ({
						...item,
						optionLabel: this.prdtInfo.optionLabel,
						prdtInfo: {
							id: this.prdtInfo.id,
							prdtName: this.prdtInfo.prdtName,
							originPrice: this.prdtInfo.originPrice,
							dscntRate: this.prdtInfo.dscntRate,
							salePrice: this.prdtInfo.salePrice,
							img: this.prdtInfo.imgList[0],
						},
						bagId: 1,
					}));
					this.$store.commit("ADD_BAG_LIST", param);
				}, 700);
			}, 1000);
		},
		buyNow() {
			if (!this.selectedList.length)
				return (this.alertMsg = "사이즈를 선택해주세요.");
		},
		getGoodsDetails() {
			// 상품 정보 GET api
			const totalStarCnt = this.prdtInfo.reviewList
				.map((item) => item.star)
				.reduce((accm, currentVal) => accm + currentVal);

			this.starCnt = totalStarCnt / this.prdtInfo.reviewList.length;
		},
	},
	mounted() {
		this.getGoodsDetails();
	},
};
</script>

<style></style>
