<template>
  <section class="section section--prdt">
    <div class="container">
      <h1 class="blind-box">회원 목록 조회</h1>

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
                title: '이메일',
                data: 'email'
            },
            {
                title: '등급',
                data: 'level',
            },
            {
                title: `주문
                        누적금액 (₩)`,
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
              title: '상태',
              data: 'status'
            }
          ]"
          :row-data="userList"
          @reorder="reorderTable"
        ></custom-table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      userList: [
        {
          userId: "US001",
          email: "bomnie.kim@gmail.com",
          userProfImgPath: "/img/profile.png",
          level: "LV001",
          payAccmAmout: 2000000,
          reviewCnt: 12,
          likeCnt: 49,
          status: "UT001", // 활성 (최근 1달내 접속)
        },
        {
          userId: "US001",
          email: "bomnie.kim@gmail.com",
          userProfImgPath: "/img/profile.png",
          level: "LV001",
          payAccmAmout: 2000000,
          reviewCnt: 12,
          likeCnt: 49,
          status: "UT001", // 활성 (최근 1달내 접속)
        },
        {
          userId: "US001",
          email: "bomnie.kim@gmail.com",
          userProfImgPath: "/img/profile.png",
          level: "LV001",
          payAccmAmout: 2000000,
          reviewCnt: 12,
          likeCnt: 49,
          status: "UT001", // 활성 (최근 1달내 접속)
        },
        {
          userId: "US001",
          email: "bomnie.kim@gmail.com",
          userProfImgPath: "/img/profile.png",
          level: "LV001",
          payAccmAmout: 2000000,
          reviewCnt: 12,
          likeCnt: 49,
          status: "UT001", // 활성 (최근 1달내 접속)
        },
        {
          userId: "US001",
          email: "bomnie.kim@gmail.com",
          userProfImgPath: "/img/profile.png",
          level: "LV001",
          payAccmAmout: 2000000,
          reviewCnt: 12,
          likeCnt: 49,
          status: "UT001", // 활성 (최근 1달내 접속)
        },
        {
          userId: "US001",
          email: "bomnie.kim@gmail.com",
          userProfImgPath: "/img/profile.png",
          level: "LV001",
          payAccmAmout: 2000000,
          reviewCnt: 12,
          likeCnt: 49,
          status: "UT001", // 활성 (최근 1달내 접속)
        },
        {
          userId: "US001",
          email: "bomnie.kim@gmail.com",
          userProfImgPath: "/img/profile.png",
          level: "LV001",
          payAccmAmout: 2000000,
          reviewCnt: 12,
          likeCnt: 49,
          status: "UT001", // 활성 (최근 1달내 접속)
        },
      ],
    };
  },
  methods: {
    reorderTable(val) {
      console.log("reorderTable", val);
      // api + val.orderBy val.col
    },
  },
};
</script>

<style>
</style>