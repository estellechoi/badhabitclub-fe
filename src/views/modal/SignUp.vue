<template>
  <div class="sign-box">
    <header class="sign-box__header">
      <h1 class="sign-box__title">회원가입</h1>
    </header>

    <section class="section sign-box__body" tabindex="0">
      <div class="container">
        <form action="#" method="post" id="signup-form">
          <div class="container">
            <fieldset class="sign-fieldset">
              <!-- aria-invalid attr value will be injected dynamically -->
              <label for="signup-email" class="sign-fieldset__item">
                <div class="text-input">
                  <input
                    type="email"
                    class="text-input__input"
                    id="signup-email"
                    aria-label="이메일"
                    aria-required="true"
                    autocomplete="username"
                    autocorrect="off"
                    spellcheck="false"
                    autocapitalize="none"
                    placeholder="이메일"
                    v-model="signUpInfo.email"
                  />
                </div>
                <!-- autocomplete="email" idk which is more appropriate -->
              </label>

              <label for="signup-name--given" class="sign-fieldset__item">
                <div class="text-input">
                  <input
                    type="text"
                    class="text-input__input"
                    id="signup-name--given"
                    aria-label="이름 (예: 길동)"
                    aria-required="true"
                    autocomplete="given-name"
                    autocorrect="off"
                    spellcheck="false"
                    autocapitalize="none"
                    placeholder="이름 (예: 길동)"
                    v-model="signUpInfo.name"
                  />
                </div>
              </label>

              <label for="signup-name--family" class="sign-fieldset__item">
                <div class="text-input">
                  <input
                    type="email"
                    class="text-input__input"
                    id="signup-name--family"
                    aria-label="성 (예: 홍)"
                    aria-required="true"
                    autocomplete="family-name"
                    autocorrect="off"
                    spellcheck="false"
                    autocapitalize="none"
                    placeholder="성 (예: 홍)"
                    v-model="signUpInfo.familyName"
                  />
                </div>
              </label>

              <label for="signup-password" class="sign-fieldset__item">
                <div class="text-input">
                  <input
                    :type="inputType"
                    class="text-input__input"
                    id="signup-password"
                    aria-label="비밀번호 설정하기"
                    aria-required="true"
                    autocomplete="off"
                    autocorrect="off"
                    spellcheck="false"
                    autocapitalize="none"
                    placeholder="비밀번호 설정하기"
                    v-model="signUpInfo.password"
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

              <div
                v-if="signUpInfo.password.length"
                class="sign-fieldset__item text-box"
                :class="inputStatus ? 'text-box--ok' : 'text-box--warning'"
              >{{ inputStatusLable }}</div>

              <div class="sign-fieldset__item sign-fieldset__item--auto-height">
                <p class="text-box">
                  배드해빗클럽의 회원 전용 할인, 추천 굿즈 정보, 프로모션 및 정책 변경사항을 이메일로 보내드립니다.
                  계정 관리의 환경설정에서 언제든지 메시지 수신을 거부할 수 있습니다.
                </p>

                <div class="sign-fieldset__child">
                  <checkbox
                    label="마케팅 메시지를 받고 싶지 않습니다."
                    id="signup-agreement--recieve-promotional-email"
                    @change="togglePromoEmail"
                  ></checkbox>
                </div>
              </div>

              <button type="submit" aria-busy="false" class="btn sign-fieldset__item">가입하기</button>
            </fieldset>

            <div class="esc-btn-box">
              <button
                type="button"
                aria-busy="false"
                class="btn btn--primary"
                :class="{ 'btn--disabled' : isLoading }"
                :disabled="isLoading"
                :aria-disabled="isLoading"
                @click="goSignIn"
              >이미 배드해빗클럽 계정이 있나요?</button>
            </div>
          </div>
        </form>
      </div>
    </section>

    <footer class="sign-box__footer">
      <!-- <button typ="button" aria-busy="false" class="btn btn--primary">로그인</button> -->
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      signUpInfo: {
        email: "",
        name: "",
        familyName: "",
        password: "",
        rcvPromoEmail: false,
      },
      showPassword: false,
      isLoading: false,
    };
  },
  computed: {
    inputType() {
      return this.showPassword ? "text" : "password";
    },
    inputStatus() {
      return this.signUpInfo.password.length >= 5;
    },
    inputStatusLable() {
      return this.inputStatus ? "보안 강함" : "보안 약함";
    },
  },
  methods: {
    goSignIn() {
      this.$emit("close", "signin");
    },
    togglePromoEmail(val) {
      this.signUpInfo.rcvPromoEmail = val;
    },
  },
};
</script>

<style>
</style>