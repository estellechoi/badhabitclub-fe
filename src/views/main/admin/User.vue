<template>
  <section class="section section--user">
    <div class="container">
      <h1 class="blind-box">{{ userInfo.userName }} 회원정보 조회/수정</h1>

      <div class="shadow-box admin-user-box">
        <h2>
          <span class="blind-box">회원 프로필</span>
        </h2>

        <div class="img-box">
          <div class="img-box__display">
            <div class="img-box__img">
              <img :src="userInfo.userProfImgPath" :alt="`${userInfo.userName} 프로필 사진`" />
            </div>

            <details class="img-box__hover-effect" for="profile-img-uploader">
              <summary
                role="button"
                aria-haspopup="menu"
                aria-label="프로필 사진 바꾸기"
                @click="changeImage"
              >
                <i class="fas fa-camera" aria-hidden="true"></i>
              </summary>

              <ul class="img-update-menu-list" role="menu">
                <li class="img-update-menu-item">
                  <label
                    class="img-update-menu-item__btn"
                    for="profile-img-uploader"
                    role="menuitem"
                    tabindex="0"
                  >사진 업로드</label>
                  <input
                    type="file"
                    id="profile-img-uploader"
                    accept="image/png, image/jpeg"
                    hidden
                  />
                </li>
                <li class="img-update-menu-item">
                  <button class="img-update-menu-item__btn" type="button" role="menuitem">사진 삭제</button>
                </li>
              </ul>
            </details>
          </div>
        </div>

        <div>
          <h3 class="title title--min title--center">
            <span class="user-name">
              {{ userInfo.userName }}
              <!-- 활성유무 -->
              <span
                class="user-status-icon"
                :class="statusClass(userInfo.status)"
                :title="userInfo.status | codeLabel"
              >
                <span class="blind-box">{{ userInfo.status | codeLabel }}</span>
              </span>

              <!-- 레벨 -->
              <span class="user-level-icon" :class="levelClass(userInfo.level)">
                <i class="fas fa-certificate"></i>
                <span>&nbsp;{{ userInfo.level | codeLabel }}</span>
              </span>
            </span>
          </h3>

          <div class="title title--min title--center">
            <span class="user-email">{{ userInfo.email }}</span>
          </div>

          <div class="user-highlights" @click="goLikeList">
            <div
              class="user-numbers"
              v-for="(item) of numbers"
              :key="item.cd"
              :title="`${$options.filters.codeLabel(item.cd)} ${$options.filters.addCommas(item.figures)} ${item.unit ? item.unit : '개'}`"
            >
              <span
                class="user-numbers__label"
                v-html="item.icon ? item.icon : $options.filters.codeLabel(item.cd)"
              ></span>
              <div>
                <span class="user-numbers__unit" v-if="item.unit">{{ item.unit }}</span>
                <span
                  class="user-numbers__value"
                  ref="counter"
                  :data-cd="item.cd"
                  :data-target="item.figures"
                  aria-hidden="true"
                >0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="shadow-box">
        <h2 class="title title--min">주문 목록</h2>

        <ul class="order-list">
          <li class="order-list__item" v-for="(item, index) in userInfo.orderList" :key="index">
            <div class="order-date">
              <strong class="text-badge text-badge--black">주문일 {{ item.orderDt }}</strong>

              <strong
                v-if="item.status !== 3"
                class="text-badge"
                :class="{ 'text-badge--late' : pastDays(item.orderDt) > 1 }"
              >{{ pastDays(item.orderDt) ? `+ ${pastDays(item.orderDt)}일` : 'Today' }}</strong>

              <strong
                class="text-badge text-badge--blue"
                :class="{ 'text-badge--black' : item.status === 3 }"
              >{{ item.statusLabel }}</strong>
            </div>

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
                  <span>{{ item.prdtPrice | addCommas }}</span>
                  /
                  {{ item.qty }} 개
                </div>
              </div>

              <div
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
              </div>
            </div>
          </li>
        </ul>

        <div class="unfold-btn-box" @click="fetchOrderList">
          <span class="btn btn--primary">
            <span class="unfold-btn">
              <i class="fas fa-chevron-down"></i>
            </span>
          </span>
        </div>
      </div>

      <div class="shadow-box">
        <h2 class="title title--min">좋아요 표시한 상품들 ({{ likeCnt }}개)</h2>

        <div class="like-list-slider" aria-hidden="true">
          <button class="like-list-slider__btn" @click="moveListRightward">
            <i class="fas fa-angle-right"></i>
          </button>
        </div>

        <div class="like-list-slider like-list-slider--back" aria-hidden="true">
          <button class="like-list-slider__btn" @click="moveListLeftward">
            <i class="fas fa-angle-left"></i>
          </button>
        </div>

        <div class="like-list-box">
          <ul class="like-list" ref="likeList" :style="`left: ${moveLeft}px`">
            <li class="like-item" v-for="(item, index) in userInfo.likeList" :key="index">
              <div class="img-box">
                <div class="img-box__display">
                  <div class="img-box__img">
                    <img :src="item.imgList[0].path" :alt="`${item.prdtName} 상품 사진`" />
                  </div>

                  <div class="img-box__hover-effect">
                    <a :aria-label="`${item.prdtName} 상품 상세페이지로 이동하기`" aria-haspopup="false">
                      <span>{{ item.prdtName }}</span>
                      <span>
                        <span class="user-numbers__unit">{{ item.currency }}</span>
                        {{ item.salePrice | addCommas }}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="shadow-box centering-box">
        계정을 비활성화 하셔야하나요?
        <a class="btn btn--link" @click="goDeleteAcct">지금 처리하기</a>
      </div>
    </div>

    <!-- 프로필 사진 바꾸기 모달-->
    <modal v-if="showModal" aria-label="프로필 사진 바꾸기" @close="showModal = false">
      <sign-up slot="body" @close="showModal = false"></sign-up>
    </modal>
  </section>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      numbers: [],
      moveLeft: 0,
      page: 1,
      showModal: false,
    };
  },
  computed: {
    likeCnt() {
      return this.userInfo.likeList ? this.userInfo.likeList.length : 0;
    },
    pageCnt() {
      return Math.ceil(this.likeCnt / 5);
    },
  },
  methods: {
    getUserDetails(userId) {
      console.log(userId);

      // api
      this.userInfo = {
        userId: "US001",
        userName: "김보민",
        givenName: "보민",
        familyName: "김",
        email: "bomnie.kim@gmail.com",
        userProfImgPath: "/img/profile.png",
        level: "LV001",
        payAccmAmout: 2000000,
        unit: "KRW",
        clubMoney: 20000,
        orderCnt: 7,
        reviewCnt: 12,
        likeCnt: 49,
        status: "UT001", // 활성 (최근 1달내 접속)
        orderList: [
          {
            orderDt: "2020-09-16",
            prdtId: 1,
            prdtName: "Day Cap",
            prdtPrice: "37000",
            qty: 1,
            imgPath: "/img/prdt1.png",
            status: 0,
            statusLabel: "결제대기",
            arrivalDt: "9/18",
          },
          {
            orderDt: "2020-09-15",
            prdtId: 1,
            prdtName: "Original Logo T-shirts White/Red",
            prdtPrice: "50000",
            qty: 1,
            imgPath: "/img/prdt2.png",
            status: 1,
            statusLabel: "상품준비중",
            arrivalDt: "9/18",
          },
          {
            orderDt: "2020-09-14",
            prdtId: 1,
            prdtName: "Yes! Cap - Pink",
            prdtPrice: "37000",
            qty: 1,
            imgPath: "/img/prdt3.png",
            status: 2,
            statusLabel: "배송중",
            arrivalDt: "9/18",
          },
          {
            orderDt: "2020-09-10",
            prdtId: 1,
            prdtName: "Day Cap",
            prdtPrice: "10000",
            qty: 1,
            imgPath: "/img/prdt1.png",
            status: 3,
            statusLabel: "도착",
            arrivalDt: "9/11",
          },
          {
            orderDt: "2020-09-10",
            prdtId: 1,
            prdtName: "Day Cap",
            prdtPrice: "10000",
            qty: 1,
            imgPath: "/img/prdt1.png",
            status: 3,
            statusLabel: "도착",
            arrivalDt: "9/11",
          },
        ],
        likeList: [
          {
            prdtId: "PR002",
            prdtName: "Original Logo T-shirts White/Red",
            originPrice: 50000,
            dscntRate: 0,
            dscntValidUntil: "2020-12-31",
            currency: "KRW",
            salePrice: 50000 * 0,
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
          {
            prdtId: "PR001",
            prdtName: "Day Cap",
            originPrice: 37000,
            dscntRate: 0.66,
            dscntValidUntil: "2020-12-31",
            currency: "KRW",
            salePrice: 37000 * 0.44,
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
            prdtId: "PR003",
            prdtName: "Yes! Cap - Pink",
            originPrice: 37000,
            dscntRate: 0.66,
            dscntValidUntil: "2020-12-31",
            currency: "KRW",
            salePrice: 37000 * 0.44,
            imgList: [
              {
                path: "/img/prdt3.png",
                alt: "상품 메인",
              },
              {
                path: "/img/prdt3-side.png",
                alt: "상품 상세",
              },
            ],
          },
          {
            prdtId: "PR003",
            prdtName: "Yes! Cap - Pink",
            originPrice: 37000,
            dscntRate: 0.66,
            dscntValidUntil: "2020-12-31",
            currency: "KRW",
            salePrice: 37000 * 0.44,
            imgList: [
              {
                path: "/img/prdt3.png",
                alt: "상품 메인",
              },
              {
                path: "/img/prdt3-side.png",
                alt: "상품 상세",
              },
            ],
          },
          {
            prdtId: "PR003",
            prdtName: "Yes! Cap - Pink",
            originPrice: 37000,
            dscntRate: 0.66,
            dscntValidUntil: "2020-12-31",
            currency: "KRW",
            salePrice: 37000 * 0.44,
            imgList: [
              {
                path: "/img/prdt3.png",
                alt: "상품 메인",
              },
              {
                path: "/img/prdt3-side.png",
                alt: "상품 상세",
              },
            ],
          },
          {
            prdtId: "PR003",
            prdtName: "Yes! Cap - Pink",
            originPrice: 37000,
            dscntRate: 0.66,
            dscntValidUntil: "2020-12-31",
            currency: "KRW",
            salePrice: 37000 * 0.44,
            imgList: [
              {
                path: "/img/prdt3.png",
                alt: "상품 메인",
              },
              {
                path: "/img/prdt3-side.png",
                alt: "상품 상세",
              },
            ],
          },
          {
            prdtId: "PR003",
            prdtName: "Yes! Cap - Pink",
            originPrice: 37000,
            dscntRate: 0.66,
            dscntValidUntil: "2020-12-31",
            currency: "KRW",
            salePrice: 37000 * 0.44,
            imgList: [
              {
                path: "/img/prdt3.png",
                alt: "상품 메인",
              },
              {
                path: "/img/prdt3-side.png",
                alt: "상품 상세",
              },
            ],
          },
        ],
      };

      this.getNumbers();
    },
    getNumbers() {
      this.numbers = [
        {
          cd: "OV008",
          figures: this.userInfo.payAccmAmout,
          unit: "KRW",
        },
        {
          cd: "OV009",
          figures: Math.ceil(
            this.userInfo.payAccmAmout / this.userInfo.orderCnt
          ),
          unit: "KRW",
        },
        {
          cd: "OV010",
          icon: "<i class='fas fa-coins'></i>",
          figures: this.userInfo.clubMoney,
          unit: "KRW",
        },
        {
          cd: "OV011",
          icon: "<i class='fas fa-heart'></i>",
          figures: this.userInfo.likeCnt,
        },
      ];

      this.$nextTick(() => {
        this.animateNumbers(this.$refs.counter);
      });
    },
    fetchOrderList() {
      // api
      this.userInfo.orderList = this.userInfo.orderList.concat(
        this.userInfo.orderList
      );
    },
    changeImage() {
      // 페이지 이동 ?
    },
    pastDays(val) {
      const today = new Date();
      const year = today.getFullYear();
      let month = today.getMonth() + 1;
      month = month >= 10 ? month : `0${month}`;
      let day = today.getDate();
      day = day >= 10 ? day : `0${day}`;

      val = val.split("-").join("");

      return parseInt(`${year}${month}${day}`) - parseInt(val);
    },
    goLikeList(evt) {
      const target = evt.path.filter(
        (item) => item.dataset && item.dataset.cd
      )[0];
      if (!(target && target.dataset.cd && target.dataset.cd === "OV011"))
        return;

      //   this.$router.push({ path: "user-likes" });
    },
    moveListRightward() {
      const toGoPage = this.page + 1;
      if (toGoPage > this.pageCnt) return;

      this.page = toGoPage;
      const boxWidth = +this.$refs.likeList.clientWidth;
      this.moveLeft = -(this.page - 1) * boxWidth;
    },
    moveListLeftward() {
      const toGoPage = this.page - 1;
      if (toGoPage < 1) return;

      this.page = toGoPage;
      const boxWidth = +this.$refs.likeList.clientWidth;
      this.moveLeft = -(this.page - 1) * boxWidth;
      console.log(this.page, this.moveLeft);
    },
    resizeListBox() {
      const boxWidth = +this.$refs.likeList.clientWidth;
      this.moveLeft = -(this.page - 1) * boxWidth;
    },
    goDeleteAcct() {
      this.$router.push({
        path: "/delete-account/reasons",
      });
    },
  },
  mounted() {
    window.addEventListener("resize", this.resizeListBox);

    const userId = this.$route.params.userId;
    if (userId) this.getUserDetails(userId);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeListBox);
  },
};
</script>

<style>
</style>