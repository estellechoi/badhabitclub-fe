<template>
  <section>
    <div class="title-box">계정을 비활성화하려는 이유가 무엇인가요?</div>

    <fieldset>
      <legend>
        <span class="blind-box">계정 비활성화 이유 선택지 그룹</span>
      </legend>
      <radio-group
        :list="reasonList"
        :id-prefix="'delete-reason'"
        v-model="reason"
        @change="changeReason"
      ></radio-group>

      <!-- additional textbox -->
      <div class="text-area" v-if="hasOtherReason">
        <label for="delete-reason-text">이유</label>
        <input
          type="text"
          id="delete-reason-text"
          placeholder="계정을 해지하려는 이유가 무엇인가요?"
          v-model="desc"
        />
      </div>
    </fieldset>

    <div class="centering-box">
      <button
        type="button"
        class="btn"
        :class="{ 'btn--disabled' : !reason }"
        :disabled="!reason"
        @click="goConfirm"
      >계속하기</button>
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
      desc: "",
    };
  },
  computed: {
    hasOtherReason() {
      return this.reason === "0";
    },
  },
  watch: {
    reason(newVal) {
      if (newVal !== "0") {
        this.desc = "";
      }
    },
  },
  methods: {
    changeReason(val) {
      this.reason = val;
    },
    goConfirm() {
      this.$emit("select-reason", {
        reason: this.reason,
        desc: this.desc,
      });
      this.$router.push({ name: "delete-confirm" });
    },
  },
  mounted() {
    if (this.storedReason) {
      this.reason = this.storedReason.reason;
      this.desc = this.storedReason.desc;
    }
  },
};
</script>

<style>
</style>