<template>
  <section>
    <div class="title-box">계정을 비활성화하시겠어요?</div>

    <div class="text-box-group">
      <div v-for="(item, index) in infoList" :key="index">
        <div class="icon--chk">
          <span class="checkbox"></span>
        </div>
        <div class="text-box">{{ item }}</div>
      </div>
    </div>

    <div class="space-bw-box">
      <button type="button" class="btn btn--link" @click="goBack">뒤로</button>
      <button type="button" class="btn" @click="deleteAccount">계정 비활성화</button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    storedReason: {
      type: Object,
    },
  },
  data() {
    return {
      infoList: [
        "이 계정과 관련한 프로필 정보가 삭제됩니다.",
        "향후 계정 정보나 이전 주문내역을 확인할 수 없습니다.",
      ],
    };
  },
  methods: {
    goHome() {
      this.$router.push({ path: "/" });
    },
    goBack() {
      this.$router.go(-1);
      //   this.$router.push({ name: "delete-reasons" });
    },
    deleteAccount() {
      console.log(this.storedReason);
      // POST api
      // then
      this.$router.push({ name: "delete-complete" });
    },
  },
  mounted() {},
};
</script>