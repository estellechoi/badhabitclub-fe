<template>
  <main role="main">
    <div class="sign-box sign-box--full-page">
      <header class="sign-box__header">
        <h1 class="sign-box__title sign-box__title--text">비밀번호 변경하기</h1>
      </header>

      <section class="section sign-box__body sign-box__body--full-page" tabindex="0">
        <div class="container">
          <form action="#" method="post" id="set-password-form">
            <div class="container">
              <fieldset class="sign-fieldset">
                <div class="sign-fieldset__item sign-fieldset__item--auto-height">
                  <p class="text-box">{{ label }}</p>
                </div>

                <!-- aria-invalid attr value will be injected dynamically -->
                <label for="new-password" class="sign-fieldset__item">
                  <div class="text-input">
                    <input
                      :type="inputType"
                      class="text-input__input"
                      id="new-password"
                      aria-label="비밀번호"
                      aria-required="true"
                      autocomplete="off"
                      autocorrect="off"
                      spellcheck="false"
                      autocapitalize="none"
                      placeholder="비밀번호"
                      v-model="password"
                    />

                    <button
                      type="button"
                      class="text-input__btn"
                      tabindex="-1"
                      @click="showPassword = !showPassword"
                    >
                      <i
                        class="far"
                        :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                        :aria-label="showPassword ? '비밀번호 숨기기' : '비밀번호 표시하기'"
                      ></i>
                    </button>
                  </div>
                </label>

                <label for="new-password-confirm" class="sign-fieldset__item">
                  <div class="text-input">
                    <input
                      :type="inputType"
                      class="text-input__input"
                      id="new-password-confirm"
                      aria-label="비밀번호 재입력"
                      aria-required="true"
                      autocomplete="off"
                      autocorrect="off"
                      spellcheck="false"
                      autocapitalize="none"
                      placeholder="비밀번호 재입력"
                      v-model="passwordConfirm"
                    />
                  </div>
                </label>

                <div
                  v-if="password.length"
                  class="sign-fieldset__item text-box"
                  :class="inputStatus ? 'text-box--ok' : 'text-box--warning'"
                >{{ inputStatusLable }}</div>

                <button
                  type="submit"
                  aria-busy="false"
                  class="btn sign-fieldset__item"
                  :class="{ 'btn--disabled' : isLoading }"
                  :disabled="isLoading"
                  :aria-disabled="isLoading"
                  @click="saveData"
                >변경하기</button>
              </fieldset>
            </div>
          </form>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      label: `비밀번호에 이메일 아이디를 포함할 수 없습니다.
              특수문자나 숫자를 1자 이상 포함하고 최소 8자여야 합니다.`,
      showPassword: false,
      password: "",
      passwordConfirm: "",
      isLoading: false,
    };
  },
  computed: {
    inputType() {
      return this.showPassword ? "text" : "password";
    },
    inputStatus() {
      return this.password === this.passwordConfirm ? true : false;
    },
    inputStatusLable() {
      return this.inputStatus
        ? "비밀번호가 일치합니다"
        : "비밀번호가 일치하지 않습니다";
    },
  },
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    saveData(evt) {
      evt.preventDefault();
      this.isLoading = true;
      // 1) 비밀번호 검증
      // 2) api
    },
  },
};
</script>

<style>
</style>