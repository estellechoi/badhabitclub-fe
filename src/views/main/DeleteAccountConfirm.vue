<template>
  <main role="main">
    <section class="section section--delete">
      <div class="container">
        <div class="title-box">계정을 비활성화하시겠어요?</div>

        <div class="text-box-group">
          <div v-for="(item, index) in list" :key="index" class="text-box">
            <div class="text-box-icon">
              <span class="checkbox"></span>
            </div>
            <div>{{ item }}</div>
          </div>
        </div>

        <div class="centering-box">
          <button type="button" class="btn">계정 비활성화</button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      list: [
        "이 계정과 관련한 프로필 정보가 삭제됩니다.",
        "향후 계정 정보나 이전 주문내여을 확인할 수 없습니다.",
      ],
    };
  },
  watch: {
    reason(newVal) {
      if (newVal === "0") {
        this.otherReason = "";
      }
    },
  },
  computed: {
    hasOtherReason() {
      return this.reason === "0";
    },
  },
  methods: {
    changeReason(val) {
      this.reason = val;
    },
  },
};
</script>

<style>
</style>