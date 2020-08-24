<template>
  <div>
    <progress-header :list="progressList"></progress-header>

    <main role="main">
      <section class="section section--order">
        <div class="container">
          <router-view @select-list="selectList" :bag-info="bagInfo"></router-view>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "order",
  data() {
    return {
      progressList: [
        { label: "쇼핑백", path: "bag" },
        { label: "주문정보 및 결제", path: "checkout" },
        { label: "완료", path: "complete" },
      ],
      bagInfo: null,
    };
  },
  methods: {
    selectList(val) {
      this.bagInfo = val;
    },
  },
};
</script>

<style>
</style>