<template>
  <div class="container">
    <form action="#" method="post" id="forgot-password-form">
      <div class="container">
        <fieldset class="sign-fieldset">
          <div class="airlock airlock--mar-bot"></div>

          <div class="sign-fieldset__item sign-fieldset__item--auto-height">
            <p class="text-box">배드해빗클럽 계정으로 사용하는 이메일 주소를 입력하시면, 비밀번호 변경 링크를 전송해 드립니다.</p>
          </div>

          <!-- aria-invalid attr value will be injected dynamically -->
          <label for="forgot-password-email" class="sign-fieldset__item">
            <input
              type="email"
              class="input--text"
              id="forgot-password-email"
              aria-label="이메일"
              aria-required="true"
              autocomplete="off"
              autocorrect="off"
              spellcheck="false"
              autocapitalize="none"
              placeholder="이메일"
            />
          </label>

          <button type="submit" aria-busy="false" class="btn sign-fieldset__item">변경 링크 전송하기</button>
        </fieldset>

        <div class="esc-btn-box">
          <button type="button" aria-busy="false" class="btn btn--primary" @click="goBack">로그인</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "sign-in",
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$emit("close", "backToSignIn");
    },
  },
};
</script>
<style>
.sign-fieldset__item---mar-top {
  margin-top: 30px;
}
</style>
