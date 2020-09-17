<template>
  <main role="main">
    <section class="section section--list">
      <div class="container">
        <ul class="goods-item-list" @mouseover="showLabel" @mouseout="hideLabel" @click="goDetails">
          <li
            class="goods-item"
            v-for="(item, index) in goodsList"
            :key="index"
            itemscope
            itemprop="productListItem"
            itemtype="http://schema.org/ListItem"
          >
            <meta itemprop="position" :content="index + 1" />
            <meta itemprop="url" :content="`/goods/${item.id}/details`" />
            <a class="goods-item__img-box" :aria-label="`${item.prdtName} 상품 상세 페이지로 이동하기`">
              <img
                :src="item.imgPath"
                :alt="`Main image of ${item.prdtName}`"
                :data-index="index"
                :data-prdt-id="item.prdtId"
                itemprop="image"
              />

              <span
                class="goods-item__label"
                :class="{ 'goods-item__label--visible': item.showLabel }"
              >
                <span class="goods-item__name" itemprop="name">{{ item.prdtName }}</span>
                <span class="goods-item__price">
                  {{
                  item.price | addCommas
                  }}
                </span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      goodsList: [
        {
          prdtId: "PR001",
          prdtName: "Day Cap",
          price: 37000,
          imgPath: "./img/prdt1.png",
        },
        {
          prdtId: "PR002",
          prdtName: "Original Logo T-shirts White/Red",
          price: 50000,
          imgPath: "./img/prdt2.png",
        },
        {
          prdtId: "PR003",
          prdtName: "Yes! Cap- Pink",
          price: 37000,
          imgPath: "./img/prdt3.png",
        },
        {
          prdtId: "PR004",
          prdtName: "Jelly iphone case - X/XS",
          price: 100000,
          imgPath: "./img/prdt4.png",
        },
        {
          prdtId: "PR005",
          prdtName: "Every Damn Day Beanie - Black",
          price: 37000,
          imgPath: "./img/prdt5.png",
        },
        {
          prdtId: "PR006",
          prdtName: "Every Damn Day Beanie - Orange",
          price: 37000,
          imgPath: "./img/prdt6.png",
        },
        {
          prdtId: "PR007",
          prdtName: "Every Damn Day Beanie - Blue",
          price: 37000,
          imgPath: "./img/prdt7.png",
        },
        {
          prdtId: "PR008",
          prdtName: "Poster T-shirts - White",
          price: 44000,
          imgPath: "./img/prdt8.png",
        },
        {
          prdtId: "PR009",
          prdtName: "Poster T-shirts - Grey",
          price: 44000,
          imgPath: "./img/prdt9.png",
        },
        {
          prdtId: "PR010",
          prdtName: "Kompakt X Balansa Every Damn Lie",
          price: 43000,
          imgPath: "./img/prdt10.png",
        },
        {
          prdtId: "PR011",
          prdtName: "KRB X Campaign Trademark 'Every Fuckin Day' - Figure",
          price: 298000,
          imgPath: "./img/prdt11.png",
        },
        {
          prdtId: "PR012",
          prdtName: "The World Is Invited T-shirts - Black",
          price: 42000,
          imgPath: "./img/prdt12.png",
        },
        {
          prdtId: "PR013",
          prdtName: "The World Is Invited Crewneck - White",
          price: 98000,
          imgPath: "./img/prdt13.png",
        },
      ],
    };
  },
  methods: {
    showLabel(evt) {
      if (evt.target.tagName !== "IMG") return;
      this.goodsList = this.goodsList.map((item, index) => {
        if (index === parseInt(evt.target.dataset.index)) item.showLabel = true;
        return item;
      });
    },
    hideLabel(evt) {
      if (evt.target.tagName !== "IMG") return;
      this.goodsList = this.goodsList.map((item, index) => {
        if (index === parseInt(evt.target.dataset.index))
          item.showLabel = false;
        return item;
      });
    },
    goDetails(evt) {
      console.log(evt);
      const target = evt.target;
      if (target.tagName !== "IMG") return;
      this.$router.push({
        path: `/goods/${target.dataset.prdtId}/details`,
      });
    },
  },
};
</script>

<style></style>
