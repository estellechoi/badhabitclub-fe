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
                :data-id="item.id"
                itemprop="image"
              />

              <span
                aria-hidden="true"
                tabindex="-1"
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
          id: 1,
          prdtName: "Day Cap",
          price: 100000,
          imgPath: "./img/prdt1.png",
        },
        {
          id: 2,
          prdtName: "Day Cap",
          price: 100000,
          imgPath: "./img/prdt1.png",
        },
        {
          id: 3,
          prdtName: "Day Cap",
          price: 100000,
          imgPath: "./img/prdt1.png",
        },
        {
          id: 4,
          prdtName: "Day Cap",
          price: 100000,
          imgPath: "./img/prdt1.png",
        },
        {
          id: 5,
          prdtName: "Day Cap",
          price: 100000,
          imgPath: "./img/prdt1.png",
        },
        {
          id: 6,
          prdtName: "Day Cap",
          price: 100000,
          imgPath: "./img/prdt1.png",
        },
        {
          id: 7,
          prdtName: "Day Cap",
          price: 100000,
          imgPath: "./img/prdt1.png",
        },
        {
          id: 8,
          prdtName: "Day Cap",
          price: 100000,
          imgPath: "./img/prdt1.png",
        },
        {
          id: 9,
          prdtName: "Day Cap",
          price: 100000,
          imgPath: "./img/prdt1.png",
        },
        {
          id: 10,
          prdtName: "Day Cap",
          price: 100000,
          imgPath: "./img/prdt1.png",
        },
        {
          id: 11,
          prdtName: "Day Cap",
          price: 100000,
          imgPath: "./img/prdt1.png",
        },
        {
          id: 12,
          prdtName: "Day Cap",
          price: 100000,
          imgPath: "./img/prdt1.png",
        },
        {
          id: 13,
          prdtName: "Day Cap",
          price: 100000,
          imgPath: "./img/prdt1.png",
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
        path: `/goods/${target.dataset.id}/details`,
      });
    },
  },
};
</script>

<style></style>
