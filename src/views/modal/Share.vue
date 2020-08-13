<template>
  <div class="share-box">
    <header class="share-box__header">
      <h1 class="share-box__title">
        <span>{{ title }}</span>
      </h1>
    </header>
    <section class="section share-box__body">
      <ul class="share-mtd-list">
        <li class="share-mtd-item" v-for="(item, index) in methodList" :key="index">
          <a>
            <span class="share-mtd-item__icon" v-html="item.icon"></span>
            {{ item.label }}
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: " 가족, 친구들과 이 상품을 공유하세요",
      methodList: [
        {
          label: "링크복사",
          icon: '<i class="fas fa-copy"></i>',
          value: "0",
        },
        {
          label: "Instagram",
          icon: '<i class="fab fa-instagram"></i>',
          value: "1",
        },
        {
          label: "Facebook",
          icon: '<i class="fab fa-facebook-f"></i>',
          value: "2",
        },
      ],
    };
  },
};
</script>

<style>
</style>