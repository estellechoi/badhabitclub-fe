<template>
  <div class="sign-box sign-box--short">
    <header class="sign-box__header">
      <h1 class="sign-box__title">{{ title }}</h1>
    </header>

    <section class="section sign-box__body" tabindex="0">
      <sign-in v-if="!isForgotMode" @close="close"></sign-in>
      <forgot-password v-if="isForgotMode" @close="close"></forgot-password>
    </section>

    <footer class="sign-box__footer">
      <!-- <button typ="button" aria-busy="false" class="btn btn--primary" v-if="isMember">다른 계정 사용하기</button> -->
    </footer>
  </div>
</template>

<script>
import SignIn from "./SignIn.vue";
import ForgotPassword from "./ForgotPassword.vue";

export default {
  name: "sign-in-box",
  components: {
    SignIn,
    ForgotPassword,
  },
  data() {
    return {
      isForgotMode: false,
    };
  },
  computed: {
    title() {
      return this.isForgotMode ? "비밀번호 변경 링크 보내기" : "로그인";
    },
  },
  methods: {
    close(res) {
      if (res === "forgotPassword") return (this.isForgotMode = true);
      if (res === "backToSignIn") return (this.isForgotMode = false);
      this.$emit("close", res);
    },
  },
};
</script>
