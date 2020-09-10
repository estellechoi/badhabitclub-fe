<template>
  <section class="section section--prdt">
    <div class="container">
      <h1 class="blind-box">상품 조회</h1>

      <div class="shadow-box admin-prdt-search-box">
        <h2 class="title title--min">상품 검색</h2>

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
              placeholder="상품ID / 상품명"
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
          caption="전체 상품 목록"
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
            title: '좋아요',
            data: 'likeCnt',
            type: 'number'
        },
        {
            title: '가격',
            data: 'salePrice',
            type: 'number'
        },
        {
            title: '판매량',
            data: 'sales',
            type: 'number'
        },
        {
            title: '재고',
            data: 'inventory',
            type: 'number'
        },

      ]"
          :row-data="goodsList"
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
      goodsList: [
        {
          prdtId: "BA001",
          prdtName: "Day Cap",
          salePrice: 100000,
          imgPath: "./img/prdt1.png",
          inventory: 10,
          sales: 6,
          likeCnt: 100,
        },
        {
          prdtId: "BA001",
          prdtName: "Day Cap",
          salePrice: 100000,
          imgPath: "./img/prdt1.png",
          inventory: 10,
          sales: 6,
          likeCnt: 102,
        },
        {
          prdtId: "BA001",
          prdtName: "Day Cap",
          salePrice: 100000,
          imgPath: "./img/prdt1.png",
          inventory: 10,
          sales: 6,
          likeCnt: 10,
        },
        {
          prdtId: "BA001",
          prdtName: "Day Cap",
          salePrice: 100000,
          imgPath: "./img/prdt1.png",
          inventory: 10,
          sales: 6,
          likeCnt: 103,
        },
        {
          prdtId: "BA001",
          prdtName: "Day Cap",
          salePrice: 100000,
          imgPath: "./img/prdt1.png",
          inventory: 10,
          sales: 6,
          likeCnt: 104,
        },
        {
          prdtId: "BA001",
          prdtName: "Day Cap",
          salePrice: 100000,
          imgPath: "./img/prdt1.png",
          inventory: 10,
          sales: 6,
          likeCnt: 108,
        },
        {
          prdtId: "BA001",
          prdtName: "Day Cap",
          salePrice: 100000,
          imgPath: "./img/prdt1.png",
          inventory: 10,
          sales: 6,
          likeCnt: 120,
        },
        {
          prdtId: "BA001",
          prdtName: "Day Cap",
          salePrice: 100000,
          imgPath: "./img/prdt1.png",
          inventory: 10,
          sales: 6,
          likeCnt: 100,
        },
        {
          prdtId: "BA001",
          prdtName: "Day Cap",
          salePrice: 100000,
          imgPath: "./img/prdt1.png",
          inventory: 10,
          sales: 6,
          likeCnt: 100,
        },
        {
          prdtId: "BA001",
          prdtName: "Day Cap",
          salePrice: 100000,
          imgPath: "./img/prdt1.png",
          inventory: 10,
          sales: 6,
          likeCnt: 100,
        },
        {
          prdtId: "BA001",
          prdtName: "Day Cap",
          salePrice: 100000,
          imgPath: "./img/prdt1.png",
          inventory: 10,
          sales: 6,
          likeCnt: 90,
        },
        {
          prdtId: "BA001",
          prdtName: "Day Cap",
          salePrice: 100000,
          imgPath: "./img/prdt1.png",
          inventory: 10,
          sales: 6,
          likeCnt: 1,
        },
        {
          prdtId: "BA001",
          prdtName: "Day Cap",
          salePrice: 100000,
          imgPath: "./img/prdt1.png",
          inventory: 10,
          sales: 6,
          likeCnt: 100,
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