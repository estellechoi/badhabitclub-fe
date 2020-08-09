<template>
  <main role="main">
    <section class="section section--delete">
      <div class="container">
        <div class="title-box">계정을 비활성화하려는 이유가 무엇인가요?</div>

        <fieldset>
          <legend>
            <span class="blind-box">계정 비활성화 이유 선택지 그룹</span>
          </legend>

          <radio-group :list="reasonList" :id-prefix="'delete-reason'" @change="changeReason"></radio-group>

          <!-- additional textbox -->
          <div class="text-area" v-if="hasOtherReason">
            <label for="delete-reason-text">이유</label>
            <input
              type="text"
              id="delete-reason-text"
              placeholder="계정을 해지하려는 이유가 무엇인가요?"
              v-model="otherReason"
            />
          </div>
        </fieldset>

        <div class="centering-box">
          <button type="button" class="btn" @click="goConfirm">계속하기</button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import RadioGroup from "./../../components/RadioGroup.vue";

export default {
  components: {
    RadioGroup,
  },
  data() {
    return {
      reasonList: [
        {
          label: "사생활 보호에 관한 우려가 있어요.",
          value: "1",
        },
        {
          label: "배드해빗클럽의 서비스 약관을 준수할 수 없습니다.",
          value: "2",
        },
        {
          label: "기타",
          value: "0",
        },
      ],
      reason: null,
      otherReason: "",
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
    goConfirm() {
      this.$router.push("/delete-account-confirm");
    },
  },
};
</script>

<style>
</style>