<template>
  <section class="section section--prdt">
    <div class="container">
      <div>
        <h1 class="title title--center">상품 조회</h1>
      </div>

      <div></div>

      <custom-table
        head-class="table-head-row--black"
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
      ></custom-table>
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
};
</script>

<style>
</style>