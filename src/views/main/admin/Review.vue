<template>
  <section class="section section--review">
    <div class="container">
      <div>
        <h1 class="blind-box">리뷰</h1>
      </div>

      <div class="admin-total-star">
        <rating-star :star-cnt="starCnt" :raters-cnt="reviewList.length" :label="' 개 리뷰'"></rating-star>
      </div>

      <div class="admin-best-worst-box">
        <article
          class="shadow-box admin-best-worst-box__item"
          v-for="(item, index) in bestWorstPrdts"
          :key="index"
        >
          <h2 class="admin-best-worst-box__title">{{ item.label }}</h2>

          <div>
            <div class="admin-best-worst-box__star">
              <rating-star :star-cnt="item.star" :raters-cnt="item.reviewList.length" label=" 개 리뷰"></rating-star>
            </div>
            <span class="admin-best-worst-box__prdt-name">{{ item.prdtName }}</span>
          </div>

          <div class="admin-best-worst-box__info">
            <div class="admin-best-worst-box__price">
              <price-tag
                :dscnt-rate="item.dscntRate"
                :origin-price="item.originPrice"
                :sale-price="item.salePrice"
              ></price-tag>
            </div>

            <div class="img-box">
              <div class="img-box__display">
                <img :src="item.imgList[0].path" :alt="item.imgList[0].alt" />
              </div>
            </div>
          </div>

          <div v-if="item.expandBox">
            <comment-list :list="item.reviewList"></comment-list>
          </div>

          <button
            type="button"
            class="btn btn--primary"
            :class="{ 'btn--rotate-x-180' : item.expandBox }"
            aria-haspopup="true"
            :aria-label="item.expandBox ? '리뷰 모두 숨기기' : '리뷰 모두 보기'"
            :aria-expanded="item.expandBox"
            @click="toggleReviews(item.expandBox, index)"
          >
            <!-- @keypress="toggleReviews(item.expandBox, index)" -->
            <i class="fas fa-chevron-down"></i>
          </button>
        </article>
      </div>

      <div class="shadow-box admin-review-list-box">
        <h2 class="title title--min">최근 리뷰</h2>

        <comment-list :list="reviewList"></comment-list>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      bestWorstPrdts: [
        {
          label: "최고 별점 상품",
          prdtId: "PR001",
          prdtName: "Day Cap",
          brandName: "배드해빗클럽",
          originPrice: 30000,
          dscntRate: 0.66,
          salePrice: 30000 * 0.44,
          currency: "KRW",
          conditionCd: "IC002",
          likeCnt: 200,
          star: 5,
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
          ],
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
        {
          label: "최저 별점 상품",
          prdtId: "PR002",
          prdtName: "Original Logo T-shirts White/Red",
          brandName: "배드해빗클럽",
          originPrice: 50000,
          dscntRate: 0.66,
          salePrice: 50000 * 0.44,
          currency: "KRW",
          conditionCd: "IC002",
          likeCnt: 3,
          star: 2,
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
          ],
          imgList: [
            {
              path: "/img/prdt2.png",
              alt: "상품 메인",
            },
            {
              path: "/img/prdt2-side.png",
              alt: "상품 상세",
            },
          ],
        },
      ],
      reviewList: [
        {
          userName: "Bomnie",
          content: "모자 너무 조아용 히히히",
          userProfImgPath: "/img/profile.png",
          star: 5,
          regDt: "2020-08-01",
          prdtId: "PR001",
          prdtName: "Day Cap",
          prdtImgPath: "/img/prdt1.png",
        },
        {
          userName: "Bomnie",
          content: "걍 별로임",
          userProfImgPath: "/img/profile.png",
          star: 2,
          regDt: "2020-08-01",
          prdtId: "PR002",
          prdtName: "Original Logo T-shirts White/Red",
          prdtImgPath: "/img/prdt2.png",
        },
        {
          userName: "Bomnie",
          content: "괜히 샀다",
          userProfImgPath: "/img/profile.png",
          star: 2,
          regDt: "2020-08-01",
          prdtId: "PR001",
          prdtName: "Original Logo T-shirts White/Red",
          prdtImgPath: "/img/prdt2.png",
        },
        {
          userName: "Bomnie",
          content: "모자 너무 조아용 히히히",
          userProfImgPath: "/img/profile.png",
          star: 2,
          regDt: "2020-08-01",
          prdtId: "PR001",
          prdtName: "Day Cap",
          prdtImgPath: "/img/prdt1.png",
        },
        {
          userName: "Bomnie",
          content: "모자 너무 조아용 히히히",
          userProfImgPath: "/img/profile.png",
          star: 4,
          regDt: "2020-08-01",
          prdtId: "PR001",
          prdtName: "Day Cap",
          prdtImgPath: "/img/prdt1.png",
        },
        {
          userName: "Bomnie",
          content: "모자 너무 조아용 히히히",
          userProfImgPath: "/img/profile.png",
          star: 4,
          regDt: "2020-08-01",
          prdtId: "PR001",
          prdtName: "Day Cap",
          prdtImgPath: "/img/prdt1.png",
        },
        {
          userName: "Bomnie",
          content: "모자 너무 조아용 히히히",
          userProfImgPath: "/img/profile.png",
          star: 5,
          regDt: "2020-08-01",
          prdtId: "PR001",
          prdtName: "Day Cap",
          prdtImgPath: "/img/prdt1.png",
        },
        {
          userName: "Bomnie",
          content: "모자 너무 조아용 히히히",
          userProfImgPath: "/img/profile.png",
          star: 4,
          regDt: "2020-08-01",
          prdtId: "PR001",
          prdtName: "Day Cap",
          prdtImgPath: "/img/prdt1.png",
        },
        {
          userName: "Bomnie",
          content: "모자 너무 조아용 히히히",
          userProfImgPath: "/img/profile.png",
          star: 4,
          regDt: "2020-08-01",
          prdtId: "PR001",
          prdtName: "Day Cap",
          prdtImgPath: "/img/prdt1.png",
        },
        {
          userName: "Bomnie",
          content: "모자 너무 조아용 히히히",
          userProfImgPath: "/img/profile.png",
          star: 5,
          regDt: "2020-08-01",
          prdtId: "PR001",
          prdtName: "Day Cap",
          prdtImgPath: "/img/prdt1.png",
        },
        {
          userName: "Bomnie",
          content: "모자 너무 조아용 히히히",
          userProfImgPath: "/img/profile.png",
          star: 4,
          regDt: "2020-08-01",
          prdtId: "PR001",
          prdtName: "Day Cap",
          prdtImgPath: "/img/prdt1.png",
        },
        {
          userName: "Bomnie",
          content: "모자 너무 조아용 히히히",
          userProfImgPath: "/img/profile.png",
          star: 5,
          regDt: "2020-08-01",
          prdtId: "PR001",
          prdtName: "Day Cap",
          prdtImgPath: "/img/prdt1.png",
        },
      ],
    };
  },
  computed: {
    starCnt() {
      const totalStarCnt = this.reviewList
        .map((item) => item.star)
        .reduce((accm, currentVal) => accm + currentVal);

      return totalStarCnt / this.reviewList.length;
    },
  },
  methods: {
    toggleReviews(val, index) {
      this.bestWorstPrdts = this.bestWorstPrdts.map((prdt, prdtIndex) => {
        if (index === prdtIndex) prdt.expandBox = !val;
        return prdt;
      });
    },
  },
  mounted() {
    this.bestWorstPrdts = this.bestWorstPrdts.map((item) => {
      item.expandBox = false;
      return item;
    });
  },
};
</script>

<style>
</style>