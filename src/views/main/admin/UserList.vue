<template>
  <section class="section section--prdt">
    <div class="container">
      <h1 class="blind-box">회원 목록 조회</h1>
      <div class="admin-overview-box">
        <div>
          <h2 class="title title--min">회원 현황</h2>
        </div>

        <div>
          <ul class="admin-overview-list">
            <li
              class="admin-overview-item shadow-box"
              v-for="(item, index) in overviewList"
              :key="index"
            >
              <div class="admin-overview-item__label">{{ item.cd | codeLabel }}</div>
              <div class="admin-overview-item__value">
                <span class="admin-overview-item__unit" v-if="item.unit">{{ item.unit }}</span>
                <span class="blind-box">{{ item.value }}</span>
                <span ref="counter" :data-target="item.value" aria-hidden="true">0</span>
              </div>
              <div class="admin-overview-item__desc">{{ item.desc }}</div>
            </li>
          </ul>
        </div>
      </div>

      <div class="shadow-box admin-prdt-search-box">
        <h2 class="title title--min">회원 검색</h2>

        <label class="input-field">
          <div class="input-label blind-box">
            <span id="admin-prdt-search-text">검색어</span>
          </div>

          <div class="text-input">
            <input
              type="text"
              class="text-input__input"
              aria-labelledby="admin-prdt-search-text"
              aria-required="true"
              autocomplete="off"
              autocorrect="off"
              spellcheck="false"
              autocapitalize="none"
              placeholder="이메일 / 이름 / 회원등급"
            />
          </div>

          <button type="button" class="btn btn--primary" aria-label="검색">
            <i class="fas fa-search"></i>
          </button>
        </label>
      </div>

      <div class="shadow-box">
        <custom-table
          :has-filters="true"
          :has-hover-style="true"
          table-class="table--light-line"
          caption="전체 클레임 상품 목록"
          caption-class="blind-box"
          :columns="[
            {
              title: '프로필',
              data: 'userProfImgPath',
              type: 'image',
              alt: 'userName',
              size: 40,
              cannotReorder: true
            },
            {
                title: '회원 ID',
                data: 'userId',
            },
             {
                title: '이름',
                data: 'userName',
            },
            {
                title: '이메일',
                data: 'email'
            },
            {
                title: '등급',
                data: 'level',
                type: 'code',
                formatter: (val, originVal) => levelFormat(val, originVal)
            },
            {
                title: `누적
                        주문금액 (₩)`,
                data: 'payAccmAmout',
                type: 'number'
            },
            {
              title: '리뷰',
              data: 'reviewCnt',
              type: 'number'
            },
            {
              title: '좋아요',
              data: 'likeCnt',
              type: 'number'
            },
            {
              title: '활성유무',
              data: 'status',
              type: 'code',
              formatter: (val, originVal) => statusFormat(val, originVal)
            }
          ]"
          :row-data="userList"
          @reorder="reorderTable"
          @click-row="goItemPage"
        ></custom-table>
      </div>

      <div class="unfold-btn-box" @click="fetchList">
        <span class="btn btn--primary">
          <span class="unfold-btn">
            <i class="fas fa-chevron-down"></i>
          </span>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      overviewList: [
        { cd: "OV005", value: 20, desc: "전일대비 10% 증가" }, // 신규가입
        { cd: "OV004", value: 90, desc: "전일대비 10% 증가" }, // 방문자수
        { cd: "OV006", value: 9, desc: "전일대비 10% 증가" }, // 비활성회원
        { cd: "OV007", value: 300, desc: "전일대비 10% 증가" }, // 누적 회원수
      ],
      userList: [
        {
          userId: "US001",
          userName: "김보민",
          email: "bomnie.kim@gmail.com",
          userProfImgPath: "/img/profile.png",
          level: "LV001",
          payAccmAmout: 2000000,
          reviewCnt: 12,
          likeCnt: 49,
          status: "UT001", // 활성 (최근 1달내 접속)
        },
        {
          userId: "US002",
          userName: "최유진",
          email: "estele.choi@gmail.com",
          userProfImgPath: "/img/user.jpeg",
          level: "LV002",
          payAccmAmout: 5000000,
          reviewCnt: 12,
          likeCnt: 120,
          status: "UT001", // 활성 (최근 1달내 접속)
        },
        {
          userId: "US003",
          userName: "백형우",
          email: "hyungwoo@gmail.com",
          userProfImgPath: "/img/user2.png",
          level: "LV003",
          payAccmAmout: 10000000,
          reviewCnt: 62,
          likeCnt: 50,
          status: "UT001", // 활성 (최근 1달내 접속)
        },
        {
          userId: "US004",
          userName: "채영빈",
          email: "yb@naver.com",
          userProfImgPath: "/img/user3.png",
          level: "LV001",
          payAccmAmout: 43000,
          reviewCnt: 0,
          likeCnt: 0,
          status: "UT001", // 활성 (최근 1달내 접속)
        },
        {
          userId: "US005",
          userName: "전형률",
          email: "ryul@naver.com",
          userProfImgPath: "/img/user4.png",
          level: "LV001",
          payAccmAmout: 98000,
          reviewCnt: 1,
          likeCnt: 6,
          status: "UT002", // 활성 (최근 1달내 접속)
        },
        {
          userId: "US006",
          userName: "염선아",
          email: "carina@naver.com",
          userProfImgPath: "/img/user5.png",
          level: "LV003",
          payAccmAmout: 12200000,
          reviewCnt: 32,
          likeCnt: 900,
          status: "UT003", // 활성 (최근 1달내 접속)
        },
      ],
    };
  },
  methods: {
    levelFormat(val, originVal) {
      return `<span class='user-level-icon ${this.levelClass(
        originVal
      )}'><span class='blind-box'>${val}</span><i class='fas fa-certificate' aria-hidden='true'></i></span>`;
    },
    statusFormat(val, originVal) {
      return `<span class='user-status-icon ${this.statusClass(
        originVal
      )}'><span class='blind-box'>${val}</span></span>`;
    },
    reorderTable(val) {
      console.log("reorderTable", val);
      // api + val.orderBy val.col
    },
    goItemPage(item) {
      this.$router.push({ path: `user/${item.userId}` });
    },
    fetchList() {
      // api
      // 아래는 임시 코드
      this.userList = this.userList.concat(this.userList);
    },
  },
  mounted() {
    this.animateNumbers(this.$refs.counter);
  },
};
</script>

<style>
</style>