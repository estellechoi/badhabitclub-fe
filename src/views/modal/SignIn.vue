<template>
  <div class="container">
    <div class="img-box" v-if="isMember">
      <div class="img-box__display">
        <img :src="img.src" :alt="img.title" :title="img.title" />
      </div>
    </div>

    <form action="#" method="post" id="signin-form">
      <div class="container">
        <fieldset class="sign-fieldset">
          <!-- aria-invalid attr value will be injected dynamically -->
          <label for="signin-email" class="sign-fieldset__item" v-if="!isMember">
            <div class="text-input">
              <input
                type="email"
                class="text-input__input"
                id="signin-email"
                aria-label="이메일"
                aria-required="true"
                autocomplete="off"
                autocorrect="off"
                spellcheck="false"
                autocapitalize="none"
                placeholder="이메일"
                v-model="signInInfo.email"
              />
            </div>
          </label>

          <label for="signin-password" class="sign-fieldset__item">
            <div class="text-input">
              <input
                :type="inputType"
                class="text-input__input"
                id="signin-password"
                aria-label="비밀번호"
                aria-required="true"
                autocomplete="off"
                autocorrect="off"
                spellcheck="false"
                autocapitalize="none"
                placeholder="비밀번호"
                v-model="signInInfo.password"
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

          <div class="sign-fieldset__item sign-fieldset__item--auto-height">
            <checkbox label="로그인 상태 유지" id="signin-check-keep-online" @change="toggleKeepOnline"></checkbox>
          </div>

          <button
            type="submit"
            aria-busy="false"
            class="btn sign-fieldset__item"
            @click="signIn"
          >로그인하기</button>
        </fieldset>

        <div class="esc-btn-box">
          <button
            type="button"
            aria-busy="false"
            class="btn btn--primary"
            :class="{ 'btn--disabled' : isLoading }"
            :disabled="isLoading"
            :aria-disabled="isLoading"
            @click="goForgotPassword"
          >비밀번호를 잊으셨나요?</button>

          <button typ="button" aria-busy="false" class="btn btn--primary" @click="goSignUp">회원가입</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "sign-in",
  data() {
    return {
      signInInfo: {
        email: "",
        password: "",
        keepOnline: false,
      },
      ariaBusy: false,
      img: {
        src: "./img/brand.png",
        title: "유진",
      },
      isMember: false,
      isLoading: false,
      showPassword: false,
    };
  },
  computed: {
    inputType() {
      return this.showPassword ? "text" : "password";
    },
  },
  methods: {
    toggleKeepOnline(val) {
      console.log(val);
      this.signInInfo.keepOnline = val;
    },
    goSignUp() {
      this.$emit("close", "signUp");
    },
    goForgotPassword() {
      this.$emit("close", "forgotPassword");
    },
    signIn(evt) {
      evt.preventDefault();
      this.$emit("close", "signIn");
    },
  },
};
</script>
