<template>
  <section>
    <div class="title-box">계정이 비활성화되었습니다</div>

    <div class="text-box-group">
      <div v-for="(item, index) in infoList" :key="index">
        <div class="icon--chk">
          <span class="checkbox"></span>
        </div>
        <div class="text-box">{{ item }}</div>
      </div>
    </div>

    <div class="centering-box">
      <button type="button" class="btn" @click="goHome">닫기</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      infoList: [
        "이제 프로필과 클럽 머니 정보를 확인하실 수 없습니다.",
        "향후 이 계정 또는 계정과 연결된 주문 내역을 확인하실 수 없습니다.",
      ],
    };
  },
  methods: {
    goHome() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style>
</style>