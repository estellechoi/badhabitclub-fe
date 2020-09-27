<template>
  <section class="section section--prdt">
    <div class="container">
      <div class="admin-overview-box">
        <h1 class="title title--min order-title">
          <span>주문번호 {{ orderInfo.orderNo }}</span>
          <strong class="order-badge text-badge text-badge--late">+ {{ orderInfo.pastDays }}일</strong>
          <strong class="order-badge text-badge text-badge--blue">{{ orderInfo.status | codeLabel }}</strong>
          <strong class="order-badge order-badge--date">
            <span class="blind-box">주문일시</span>
            {{ orderInfo.orderDt }}
          </strong>
        </h1>
      </div>

      <div class="row-flex-container">
        <section class="row-flex-section order-info">
          <div class="shadow-box">
            <h2 class="title title--min">{{ orderInfo.prdtList.length }}개 상품</h2>

            <ul class="order-list">
              <li class="order-list__item" v-for="(item, index) in orderInfo.prdtList" :key="index">
                <div class="order-item">
                  <div class="img-box">
                    <div class="img-box__display">
                      <div class="img-box__img">
                        <img :src="item.imgPath" :alt="`${item.prdtName} 상품 이미지`" />
                      </div>
                    </div>
                  </div>

                  <div class="order-item__info">
                    <a>
                      <strong class="item-name">{{ item.prdtName }}</strong>
                    </a>

                    <div class="order-detail">
                      <span class="user-numbers__unit">KRW</span>
                      <span>{{ item.salePrice | addCommas }}</span>
                      /
                      {{ item.qty }} 개
                    </div>
                  </div>

                  <!-- <div
                    class="order-item__status"
                    :class="{ 'order-item__status--active' : item.status !== 3 }"
                  >
                    <strong class="order-item__deli-dt">
                      {{ item.arrivalDt }} 도착
                      <span v-if="item.status !== 3">예정</span>
                    </strong>

                    <div class="order-item__status-bar">
                      <progress-3d-bar
                        :tabindex="-1"
                        :valuemax="3"
                        :valuenow="item.status"
                        :outer-class="item.status === 3 ? 'progress-3d-container--black-done' : ''"
                      ></progress-3d-bar>
                    </div>
                  </div>-->
                </div>
              </li>
            </ul>
          </div>

          <div class="shadow-box">
            <h2 class="title title--min">배송정보</h2>

            <div class="order-delivery-info">
              <div class="img-box" aria-hidden="true">
                <div class="img-box__display">
                  <div class="img-box__img">
                    <img
                      :src="orderInfo.deliveryInfo.coImgPath"
                      :alt="`${orderInfo.deliveryInfo.coName} 로고`"
                    />
                  </div>
                </div>
              </div>

              <div class="order-delivery-info__co-name">{{ orderInfo.deliveryInfo.coName }}</div>

              <div>
                <span class="user-numbers__unit">{{ orderInfo.deliveryInfo.unit }}</span>
                {{ orderInfo.deliveryInfo.fee | addCommas }}
              </div>
            </div>
          </div>

          <div class="shadow-box order-pay-info">
            <h2 class="title title--min">
              결제정보
              <credit-card></credit-card>
            </h2>

            <div>
              <span class="blind-box">결제방법: {{ orderInfo.payMtd | codeLabel }}</span>

              <ul class="order-pay-details-list">
                <li
                  class="order-pay-details-item"
                  v-for="(item, index) in orderInfo.payInfo"
                  :key="index"
                >
                  <span class="order-pay-details-item__label">{{ item.cd | codeLabel }}</span>
                  <span>
                    <span class="user-numbers__unit">{{ item.unit }}</span>
                    {{ item.amt | addCommas }}
                  </span>
                </li>
              </ul>

              <div>
                <div class="order-pay-details-item order-pay-details-item--total">
                  <span class="order-pay-details-item__label">결제금액</span>
                  <span>
                    <span class="user-numbers__unit">{{ orderInfo.unit }}</span>
                    {{ orderInfo.totalAmt | addCommas }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="order-processing">
            <h2 class="title title--min">진행현황 추적</h2>
            <div class="order-processing__inner">
              <div
                class="order-processing-axis"
                :style="`height: ${orderInfo.history.length * 156}px`"
              ></div>

              <ul class="order-processing-list">
                <li
                  class="order-processing-item"
                  v-for="(item, index) in orderInfo.history"
                  :key="index"
                >
                  <div class="order-processing-dot-container">
                    <span class="order-processing-dot" aria-hidden="true">
                      <span class="order-processing-dot order-processing-dot--inner"></span>
                    </span>
                    <span class="order-processing-dot-label">{{ index ? item.dt : '오늘' }}</span>
                  </div>

                  <div class="shadow-box">
                    <div class="order-processing-content">
                      <span class="text-badge text-badge--blue">{{ item.cd | codeLabel }}</span>
                      <span class="order-processing-content__desc">{{ item.currentLocation }}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section class="row-flex-section order-user-info">
          <div class="shadow-box">
            <h2 class="title title--min">고객 정보</h2>

            <div class="order-user-info__item">
              <a
                class="order-user-link"
                :aria-label="`${orderInfo.userInfo.userName} 고객 상세 페이지로 이동하기`"
                @click="goUserDetails"
              >
                <div class="img-box" aria-hidden="true">
                  <div class="img-box__display">
                    <div class="img-box__img">
                      <img
                        :src="orderInfo.userInfo.imgPath"
                        :alt="`${orderInfo.userInfo.userName} 프로필 사진`"
                      />
                    </div>
                  </div>
                </div>

                <div class="order-user-link__label" aria-hidden="true">
                  <span>{{ orderInfo.userInfo.userName }}</span>
                  <span>
                    <i class="fas fa-long-arrow-alt-right"></i>
                  </span>
                </div>
              </a>
            </div>

            <div class="order-user-info__item">
              <h3 class="title title--min">연락처</h3>
              <div class="order-user-info__text">
                <span class="blind-box">이메일 주소</span>
                {{ orderInfo.userInfo.email }}
              </div>

              <div class="order-user-info__text">
                <span class="blind-box">휴대폰 번호</span>
                +{{ orderInfo.userInfo.countryNo }}) {{ orderInfo.userInfo.mblNo.substr(1) }}
              </div>
            </div>

            <div class="order-user-info__item">
              <h3 class="title title--min">배송지 주소</h3>
              <div class="order-user-info__text">
                <span class="blind-box">배송지 국가</span>
                {{ orderInfo.userInfo.country | codeLabel }}
              </div>

              <div class="order-user-info__text">
                <span class="blind-box">우편번호</span>
                {{ orderInfo.userInfo.zipCd }}
              </div>

              <div class="order-user-info__text">
                <span class="blind-box">주소</span>
                {{ orderInfo.userInfo.addr }}
              </div>

              <div class="order-user-info__text">
                <span class="blind-box">상세 주소</span>
                {{ orderInfo.userInfo.subAddr }}
              </div>

              <div class="order-user-info__text">
                <span class="blind-box">수령인</span>
                {{ orderInfo.userInfo.receiver }}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      orderInfo: {},
    };
  },
  methods: {
    fetchOrderInfo(id) {
      console.log(id);
      // api
      this.orderInfo = {
        payMtd: "PM001",
        history: [
          {
            cd: "ST003",
            dt: "2020-09-20",
            currentLocation: "인천 집하장",
          },
          {
            cd: "ST002",
            dt: "2020-09-19",
            currentLocation: "배드해빗클럽",
          },
          {
            cd: "ST002",
            dt: "2020-09-18",
            currentLocation: "배드해빗클럽",
          },
          {
            cd: "ST002",
            dt: "2020-09-17",
            currentLocation: "배드해빗클럽",
          },
          {
            cd: "ST007",
            dt: "2020-09-16",
            currentLocation: "배드해빗클럽",
          },
        ],
        orderId: "OD001",
        orderNo: "200916PR001US001",
        orderDt: "2020-09-16",
        pastDays: this.pastDays("2020-09-16"),
        prdtList: [
          {
            prdtId: "PR001",
            prdtName: "Day Cap",
            salePrice: "37000",
            qty: 1,
            imgPath: "/img/prdt1.png",
          },
          {
            prdtId: "PR002",
            prdtName: "Original Logo T-shirts White/Red",
            salePrice: "50000",
            qty: 1,
            imgPath: "/img/prdt2.png",
          },
        ],
        payInfo: [
          {
            cd: "PY001",
            amt: 87000,
            unit: "KRW",
          },
          {
            cd: "PY002",
            amt: 3000,
            unit: "KRW",
          },
          {
            cd: "PY003",
            amt: 10000,
            unit: "KRW",
          },
        ],
        status: "ST001",
        arrivalDt: "9/18",
        userInfo: {
          userId: "US001",
          userName: "김보민",
          email: "bomnie.kim@gmail.com",
          countryNo: "82",
          mblNo: "010-3592-0612",
          imgPath: "/img/profile.png",
          orderCnt: 3,
          country: "KR",
          zipCd: "02440",
          addr: "서울특별시 동대문구 이문로 86",
          subAddr: "1101호",
          receiver: "김보민",
        },
        unit: "KRW",
        totalAmt: 80000,
        deliveryInfo: {
          coId: "DC001",
          coName: "CJ대한통운",
          coImgPath: "/img/delivery-co-logo.png",
          fee: 3000,
          unit: "KRW",
        },
      };
    },
    goUserDetails() {
      this.$router.push({ path: `../user/${this.orderInfo.userInfo.userId}` });
    },
  },
  mounted() {
    this.fetchOrderInfo(this.$route.params.orderId);
  },
};
</script>

<style>
</style>