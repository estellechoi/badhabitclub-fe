<template>
  <div class="prdt-detail-box">
    <div class="prdt-img">
      <img
        v-for="(item, index) in prdtInfo.imgList"
        :key="index"
        :src="item.path"
        :alt="`${prdtInfo.prdtName} ${item.alt} 사진`"
      />
    </div>

    <div class="prdt-summary">
      <!-- PRDT HEADER -->
      <div class="prdt-header prdt-summary__content">
        <h2 class="prdt-header__title">{{ prdtInfo.prdtName }}</h2>

        <div class="prdt-header__info">
          <span class="prdt-header__review">
            <a>
              <span class="rating-star">
                <i
                  class="fas fa-star"
                  v-for="(item, index) in starList"
                  :key="index"
                  :class="{ 'rating-star-icon--gray' : item > prdtInfo.starCnt }"
                ></i>
              </span>

              <span class="review-cnt">{{ prdtInfo.reviewCnt }} 개 리뷰 보기</span>
            </a>
          </span>
        </div>

        <div class="prdt-btn-box">
          <button class="prdt-fav-btn" @click="toggleLike">
            <span class="blind-box">찜하기</span>
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
        <div class="prdt-origin-price">
          <span class="discount-rate">{{ prdtInfo.dscntRate * 100 }}%</span>
          <span class="origin-price">
            <del>{{ prdtInfo.originPrice }}</del>
          </span>
        </div>

        <div class="prdt-sale-price">
          <span class="total-price">
            ₩
            <strong>{{ prdtInfo.salePrice }}</strong>
          </span>
        </div>
      </div>

      <!-- PRDT BENEFITS -->
      <div class="buy-benefits prdt-summary__content">
        <details class="benefits-box">
          <summary class="benefits-box__title">추가 혜택을 확인하세요</summary>
          <ul class="benefits-box__list">
            <li class="benefits-box__item" v-for="(item, index) in bnftList" :key="index">
              <span>{{ item.title }}</span>
              <span>
                <span v-html="item.unit"></span>
                {{ item.benefitRate * prdtInfo.originPrice * prdtInfo.dscntRate }}
                {{ item.description ? `(${item.description})` : '' }}
              </span>
            </li>
          </ul>
        </details>
      </div>

      <!-- SELECT OPTIONS -->
      <div class="buy-options prdt-summary__content">
        <select-box
          id="buy-options"
          :list="optionsList"
          :defaultLabel="'사이즈'"
          @change="pushSelected"
        ></select-box>
      </div>

      <div v-if="selectedList.length">
        <div class="selected-prdts prdt-summary__content">
          <ul class="selected-prdts-list" @click="discardItem">
            <li class="selected-prdts-item" v-for="(item, index) in selectedList" :key="index">
              <div>{{ item.label }}</div>

              <spinner :label="item.label" @change="(val) => item.qty = val"></spinner>

              <div class="selected-prdts-item__amt">
                <span>{{ item.qty * prdtInfo.salePrice }}</span>
                <button
                  type="button"
                  class="selected-prdts-item__disc-btn"
                  :aria-label="`${item.label} 옵션 선택 취소`"
                >
                  <i class="fas fa-times selected-prdts-item__disc-icon" :data-option="item.value"></i>
                </button>
              </div>
            </li>
          </ul>
        </div>

        <div class="total-amt-box prdt-summary__content">
          <span class="total-amt">₩ {{ totalAmt }}</span>
        </div>
      </div>

      <div class="msg-box" v-if="alertMsg">
        <span>{{ alertMsg }}</span>
      </div>

      <div class="buy-btn-box prdt-summary__content">
        <button type="button" class="buy-btn">Shopping Bag</button>
        <button type="button" class="buy-btn buy-btn--buy-now" @click="buyNow">Buy Now</button>
      </div>
    </div>

    <modal v-if="showModalShare" :aria-label="'상품 정보 공유하기'" @close="closeModal">
      <share slot="body"></share>
    </modal>

    <!-- <modal v-if="showSignUp" :ariaLabel="'회원가입'" @close="closeSignUp">
      <sign-up slot="body" @close="closeSignUp"></sign-up>
    </modal>-->
  </div>
</template>

<script>
import Share from "./../../modal/Share.vue";

export default {
  components: {
    Share,
  },
  data() {
    return {
      showModalShare: false,
      prdtInfo: {
        id: 2,
        prdtName: "Day Cap",
        originPrice: 30000,
        dscntRate: 0.66,
        salePrice: 30000 * 0.66,
        starCnt: 3,
        reviewCnt: 10,
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
      },
      starList: [1, 2, 3, 4, 5],
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
      optionsList: [
        {
          label: "S",
          value: "1",
        },
        {
          label: "M",
          value: "2",
        },
      ],
      selectedList: [],
      alertMsg: null,
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

      this.selectedList.forEach((item, index) => {
        if (item.value === target.dataset.option)
          this.selectedList.splice(index, 1);
      });
    },
    buyNow() {
      if (!this.selectedList.length)
        return (this.alertMsg = "사이즈를 선택해주세요.");
    },
  },
};
</script>

<style>
</style>