<template>
  <section class="section--order-complt">
    <div>
      <!-- <h1 class="title title--center">주문 완료</h1> -->
      <h1 class="title-box">
        주문 완료
        <span class="title-box__un-im">{{ orderDt }}</span>
      </h1>
    </div>

    <div class="text-box-group">
      <div class="order-complt-details">
        <h2 class="order-complt-details__title">배송지</h2>
        <div>{{ deliInfo }}</div>
      </div>

      <div class="order-complt-details">
        <h2 class="order-complt-details__title">결제 정보</h2>
        <div>{{ payMtd }}</div>
        <div>₩ {{ payAmt | addCommas }} 결제 {{ payStat }}</div>
      </div>

      <div class="order-complt-details">
        <h2 class="order-complt-details__title">클럽 혜택</h2>
        <div>
          <i class="fas fa-coins"></i>
          {{ point }} 적립
        </div>
      </div>
    </div>

    <div class="centering-box">
      <button type="button" class="btn" @click="goMyPage">주문 목록 보기</button>
      <button type="button" class="btn" @click="goHome">닫기</button>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    nowOrderInfo() {
      return this.$store.getters.orderList[
        this.$store.getters.orderList.length - 1
      ];
    },
    deliInfo() {
      return `${this.nowOrderInfo.orderInfo.country}
      ${this.nowOrderInfo.orderInfo.zipCd}
      ${this.nowOrderInfo.orderInfo.address}
      ${this.nowOrderInfo.orderInfo.subAddress} ${this.nowOrderInfo.orderInfo.receiver}`;
    },
    payMtd() {
      return `${this.CONST.payMtd[this.nowOrderInfo.orderInfo.payMtd].label}`;
    },
    payAmt() {
      return this.nowOrderInfo.totalPayAmt;
    },
    payStat() {
      return this.nowOrderInfo.orderInfo.payMtd === "PM007" ? "대기" : "완료";
    },
    point() {
      return this.nowOrderInfo.point;
    },
    orderDt() {
      return new Intl.DateTimeFormat(
        navigator.appName === "Netscape"
          ? navigator.language
          : navigator.userLanguage
      ).format(this.nowOrderInfo.orderInfo.orderDt);
    },
  },
  methods: {
    goMyPage() {
      this.$router.push({ path: "/my-page" });
    },
    goHome() {
      this.$router.push({ path: "/" });
    },
  },
  mounted() {
    console.log(this.nowOrderInfo);
  },
};
</script>

<style>
</style>