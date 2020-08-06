<template>
  <main role="main">
    <section class="section section--mypage">
      <div class="container">
        <section class="profile-box">
          <div class="img-box">
            <div class="img-box__display">
              <img src="img/user.jpeg" alt="프로필 사진" />
            </div>
          </div>

          <div class="centering-box">
            <a class="btn btn--link">프로필 사진 바꾸기</a>
          </div>

          <ul class="profile-menu-box">
            <li class="profile-menu-item" v-for="(item, index) in menuList" :key="index">
              <span v-html="item.icon"></span>

              <div class="profile-menu-item__title">{{ item.title }}</div>

              <div>{{ item.content }}</div>
            </li>
          </ul>

          <div class="centering-box">
            계정을 비활성화 하셔야하나요?
            <a class="btn btn--link" @click="goDeleteAcct">지금 처리하기</a>
          </div>
        </section>

        <section class="order-box">
          <h2 class="centering-box">Order List</h2>
          <h3 class="centering-box sub-title">배송 조회</h3>

          <ul class="order-list">
            <li class="order-list__item" v-for="(item, index) in orderList" :key="index">
              <div class="order-date">Ordered {{ item.orderDt }}</div>

              <div class="order-item">
                <div class="img-box">
                  <div class="img-box__display">
                    <img :src="item.imgPath" :alt="`${item.prdtName} 상품 이미지`" />
                  </div>
                </div>

                <div class="order-item__info">
                  <a>
                    <strong class="item-name">{{ item.prdtName }}</strong>
                  </a>

                  <div class="order-detail">{{ item.cnt }} 개 * ₩ {{ item.prdtPrice }}</div>
                </div>

                <div
                  class="order-item__status"
                  :class="{ 'order-item__status--active' : item.status !== '3' }"
                >
                  <strong>{{ item.statusLabel }}</strong>

                  <strong>{{ item.arrivalDt }} 도착 {{ item.status !== '3' ? '예정' : ''}}</strong>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {
          icon: `<i class="fab fa-bitcoin"></i>`,
          title: "클럽 머니",
          content: "₩ 10,000",
        },
        {
          icon: `<i class="fas fa-comment-dots"></i>`,
          title: "내 후기",
          content: "6 개",
        },
      ],
      orderList: [
        {
          orderDt: "2020-08-06",
          prdtId: 1,
          prdtName: "Day Cap",
          prdtPrice: "10000",
          cnt: 1,
          imgPath: "img/prdt1.png",
          status: "2",
          statusLabel: "배송중",
          arrivalDt: "8/9",
        },
        {
          orderDt: "2020-08-06",
          prdtId: 1,
          prdtName: "Day Cap",
          prdtPrice: "10000",
          cnt: 1,
          imgPath: "img/prdt1.png",
          status: "3",
          statusLabel: "배송완료",
          arrivalDt: "8/9",
        },
        {
          orderDt: "2020-08-06",
          prdtId: 1,
          prdtName: "Day Cap",
          prdtPrice: "10000",
          cnt: 1,
          imgPath: "img/prdt1.png",
          status: "3",
          statusLabel: "배송완료",
          arrivalDt: "8/9",
        },
        {
          orderDt: "2020-08-06",
          prdtId: 1,
          prdtName: "Day Cap",
          prdtPrice: "10000",
          cnt: 1,
          imgPath: "img/prdt1.png",
          status: "3",
          statusLabel: "배송완료",
          arrivalDt: "8/9",
        },
      ],
    };
  },
  methods: {
    goDeleteAcct() {
      this.$router.push("deleteAccount");
    },
  },
};
</script>

<style>
</style>