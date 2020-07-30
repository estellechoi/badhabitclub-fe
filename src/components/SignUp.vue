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
                <input
                  type="email"
                  class="input--text"
                  id="signup-email"
                  aria-label="이메일"
                  aria-required="true"
                  autocomplete="username"
                  autocorrect="off"
                  spellcheck="false"
                  autocapitalize="none"
                  placeholder="이메일"
                />
                <!-- autocomplete="email" idk which is more appropriate -->
              </label>

              <label for="signup-name--given" class="sign-fieldset__item">
                <input
                  type="text"
                  class="input--text"
                  id="signup-name--given"
                  aria-label="이름 (예: 길동)"
                  aria-required="true"
                  autocomplete="given-name"
                  autocorrect="off"
                  spellcheck="false"
                  autocapitalize="none"
                  placeholder="이름 (예: 길동)"
                />
              </label>

              <label for="signup-name--family" class="sign-fieldset__item">
                <input
                  type="email"
                  class="input--text"
                  id="signup-name--family"
                  aria-label="성 (예: 홍)"
                  aria-required="true"
                  autocomplete="family-name"
                  autocorrect="off"
                  spellcheck="false"
                  autocapitalize="none"
                  placeholder="성 (예: 홍)"
                />
              </label>

              <label for="signup-password" class="sign-fieldset__item">
                <input
                  type="password"
                  class="input--text"
                  id="signup-password"
                  aria-label="비밀번호 설정하기"
                  aria-required="true"
                  autocomplete="off"
                  autocorrect="off"
                  spellcheck="false"
                  autocapitalize="none"
                  placeholder="비밀번호 설정하기"
                />
              </label>

              <div class="sign-fieldset__item sign-fieldset__item--long">
                <p class="text-box">
                  배드해빗클럽의 회원 전용 할인, 추천 굿즈 정보, 프로모션 및 정책 변경사항을 이메일로 보내드립니다.
                  계정 관리의 환경설정에서 언제든지 메시지 수신을 거부할 수 있습니다.
                </p>

                <div class="sign-fieldset__child">
                  <label for="signup-agreement--recieve-promotional-email" class="text-box">
                    <span class="checkbox" ref="checkbox">
                      <input
                        type="checkbox"
                        class="input--checkbox"
                        id="signup-agreement--recieve-promotional-email"
                        aria-invalid="false"
                        @input="toggleCheckbox"
                      />
                    </span>
                    <span class="checkbox-label">마케팅 메시지를 받고 싶지 않습니다.</span>
                  </label>
                </div>
              </div>

              <button type="submit" aria-busy="false" class="btn sign-fieldset__item">가입하기</button>
            </fieldset>

            <div>
              <button type="button" aria-busy="false" class="btn btn--primary">이미 배드해빗클럽 계정이 있나요?</button>
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
  methods: {
    toggleCheckbox(evt) {
      evt.stopPropagation();
      const isChecked = evt.target.checked;
      const $checkbox = this.$refs.checkbox;

      if (isChecked) $checkbox.classList.add("checkbox--checked");
      else $checkbox.classList.remove("checkbox--checked");
    },
  },
};
</script>

<style>
</style>