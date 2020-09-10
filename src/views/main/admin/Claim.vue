<template>
  <section class="section section--prdt">
    <div class="container">
      <h1 class="blind-box">클레임 목록 조회</h1>

      <div class="shadow-box admin-prdt-search-box">
        <h2 class="title title--min">클레임 검색</h2>

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
              placeholder="클레임 번호 / 클레임 구분 / 상세내용 / 상태 / 상품 ID / 상품명"
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
            title: '상품 ID',
            data: 'prdtId'
        },
        {
            title: '상품명',
            data: 'prdtName'
        },
        {
            title: '클레임 번호',
            data: 'claimId',
        },
        {
            title: '클레임 구분',
            data: 'claimCd',
        },
        {
          title: '상세 내용',
          data: 'claimContent',
        },
        {
          title: '상태',
          data: 'claimStatus'
        }
      ]"
          :row-data="claimList"
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
      claimList: [
        {
          prdtId: "BA001",
          prdtName: "Day Cap",
          imgPath: "./img/prdt1.png",
          claimId: "CL200910PR001US001",
          claimCd: "CL001", // 상품불량
          claimContent: "길이 이상",
          claimStatus: "CS001", // 대기중
        },
        {
          prdtId: "BA002",
          prdtName: "Original Logo T-shirts White/Red",
          imgPath: "./img/prdt2.png",
          claimId: "CL200910PR002US001",
          claimCd: "CL002", // 배송지연
          claimContent: "7일 이상 배송지연",
          claimStatus: "CS002", // 이슈 발생
        },
        {
          prdtId: "BA001",
          prdtName: "Day Cap",
          imgPath: "./img/prdt1.png",
          claimId: "CL200910PR001US001",
          claimCd: "CL001", // 상품불량
          claimContent: "길이 이상",
          claimStatus: "CS003", // 확인중
        },
        {
          prdtId: "BA001",
          prdtName: "Day Cap",
          imgPath: "./img/prdt1.png",
          claimId: "CL200910PR001US001",
          claimCd: "CL001", // 상품불량
          claimContent: "길이 이상",
          claimStatus: "CS003", // 처리완료
        },
        {
          prdtId: "BA001",
          prdtName: "Day Cap",
          imgPath: "./img/prdt1.png",
          claimId: "CL200910PR001US001",
          claimCd: "CL001", // 상품불량
          claimContent: "길이 이상",
          claimStatus: "CS001", // 대기중
        },
        {
          prdtId: "BA001",
          prdtName: "Day Cap",
          imgPath: "./img/prdt1.png",
          claimId: "CL200910PR001US001",
          claimCd: "CL001", // 상품불량
          claimContent: "길이 이상",
          claimStatus: "CS001", // 대기중
        },
        {
          prdtId: "BA001",
          prdtName: "Day Cap",
          imgPath: "./img/prdt1.png",
          claimId: "CL200910PR001US001",
          claimCd: "CL001", // 상품불량
          claimContent: "길이 이상",
          claimStatus: "CS001", // 대기중
        },
        {
          prdtId: "BA001",
          prdtName: "Day Cap",
          imgPath: "./img/prdt1.png",
          claimId: "CL200910PR001US001",
          claimCd: "CL001", // 상품불량
          claimContent: "길이 이상",
          claimStatus: "CS001", // 대기중
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