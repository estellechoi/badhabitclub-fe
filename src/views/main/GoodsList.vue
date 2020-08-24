<template>
  <main role="main">
    <section class="section section--list">
      <div class="container">
        <ul class="goods-item-list" @mouseover="showLabel" @mouseout="hideLabel" @click="goDetails">
          <li class="goods-item" v-for="(item, index) in goodsList" :key="index">
            <a class="goods-item__img-box">
              <img :src="item.imgPath" :alt="item.imgAlt" :data-index="index" :data-id="item.id" />
            </a>

            <span
              class="goods-item__label"
              :class="{ 'goods-item__label--visible' : item.showLabel }"
            >
              <span class="goods-item__name">{{ item.prdtName }}</span>
              <span class="goods-item__price">{{ item.price | addCommas }}</span>
            </span>
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
          imgAlt: "",
        },
        {
          id: 2,
          prdtName: "Day Cap",
          price: 100000,
          imgPath: "./img/prdt1.png",
          imgAlt: "",
        },
        {
          id: 3,
          prdtName: "Day Cap",
          price: 100000,
          imgPath: "./img/prdt1.png",
          imgAlt: "",
        },
        {
          id: 4,
          prdtName: "Day Cap",
          price: 100000,
          imgPath: "./img/prdt1.png",
          imgAlt: "",
        },
        {
          id: 5,
          prdtName: "Day Cap",
          price: 100000,
          imgPath: "./img/prdt1.png",
          imgAlt: "",
        },
        {
          id: 6,
          prdtName: "Day Cap",
          price: 100000,
          imgPath: "./img/prdt1.png",
          imgAlt: "",
        },
        {
          id: 7,
          prdtName: "Day Cap",
          price: 100000,
          imgPath: "./img/prdt1.png",
          imgAlt: "",
        },
        {
          id: 8,
          prdtName: "Day Cap",
          price: 100000,
          imgPath: "./img/prdt1.png",
          imgAlt: "",
        },
        {
          id: 9,
          prdtName: "Day Cap",
          price: 100000,
          imgPath: "./img/prdt1.png",
          imgAlt: "",
        },
        {
          id: 10,
          prdtName: "Day Cap",
          price: 100000,
          imgPath: "./img/prdt1.png",
          imgAlt: "",
        },
        {
          id: 11,
          prdtName: "Day Cap",
          price: 100000,
          imgPath: "./img/prdt1.png",
          imgAlt: "",
        },
        {
          id: 12,
          prdtName: "Day Cap",
          price: 100000,
          imgPath: "./img/prdt1.png",
          imgAlt: "",
        },
        {
          id: 13,
          prdtName: "Day Cap",
          price: 100000,
          imgPath: "./img/prdt1.png",
          imgAlt: "",
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

<style>
</style>