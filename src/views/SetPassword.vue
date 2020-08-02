<template>
  <main role="main">
    <div class="sign-box sign-box--full-page">
      <header class="sign-box__header">
        <h1 class="sign-box__title sign-box__title--text">비밀번호 변경하기</h1>
      </header>

      <section class="section sign-box__body" tabindex="0">
        <div class="container">
          <form action="#" method="post" id="set-password-form">
            <div class="container">
              <fieldset class="sign-fieldset">
                <div class="sign-fieldset__item sign-fieldset__item--auto-height">
                  <p class="text-box text-box--important">{{ label }}</p>
                </div>

                <div class="sign-fieldset__item sign-fieldset__item--auto-height">
                  <checkbox
                    label="비밀번호 표시하기"
                    id="signin-check-keep-online"
                    @change="toggleShowPassword"
                  ></checkbox>
                </div>

                <!-- aria-invalid attr value will be injected dynamically -->
                <label for="new-password" class="sign-fieldset__item">
                  <input
                    :type="inputType"
                    class="input--text"
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
                </label>

                <label for="new-password-confirm" class="sign-fieldset__item">
                  <input
                    :type="inputType"
                    class="input--text"
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
                </label>

                <div
                  class="sign-fieldset__item text-box"
                  :class="inputStatusClass"
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
      const hasLeng = this.password.length;
      const isSame = this.password === this.passwordConfirm;
      return !hasLeng ? null : isSame ? true : false;
    },
    inputStatusLable() {
      return this.inputStatus === null
        ? "비밀번호를 입력하세요"
        : this.inputStatus
        ? "비밀번호가 일치합니다"
        : "비밀번호가 일치하지 않습니다";
    },
    inputStatusClass() {
      return this.inputStatus === null
        ? "text-box--warning"
        : this.inputStatus
        ? "text-box--ok"
        : "text-box--warning";
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