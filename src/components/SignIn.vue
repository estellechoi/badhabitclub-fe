<template>
  <div class="signin-box">
    <header class="signin-box__header">
      <h1 class="signin-box__title">로그인</h1>
    </header>

    <section class="section signin-box__body" tabindex="0">
      <div class="container">
        <div class="img-box" v-if="isMember">
          <div class="img-box__display">
            <img :src="img.src" :alt="img.title" :title="img.title" />
          </div>
        </div>

        <form action="#" method="post" id="signin-form">
          <div class="container">
            <fieldset class="signin-fieldset">
              <!-- isMember -->
              <label for="signin-email" class="signin-fieldset__item" v-if="!isMember">
                <input
                  type="email"
                  class="input--text"
                  id="signin-email"
                  aria-label="이메일"
                  autocomplete="off"
                  autocorrect="off"
                  spellcheck="false"
                  autocapitalize="none"
                  placeholder="이메일"
                />
              </label>

              <label for="signin-password" class="signin-fieldset__item">
                <input
                  type="password"
                  class="input--text"
                  id="signin-password"
                  aria-label="비밀번호"
                  autocomplete="off"
                  autocorrect="off"
                  spellcheck="false"
                  autocapitalize="none"
                  placeholder="비밀번호"
                />
              </label>
              <button type="submit" aria-busy="false" class="btn signin-fieldset__item">로그인하기</button>
            </fieldset>

            <div>
              <button type="button" aria-busy="false" class="btn btn--primary">비밀번호를 잊으셨나요?</button>
            </div>
          </div>
        </form>
      </div>
    </section>

    <footer class="signin-box__footer">
      <button typ="button" aria-busy="false" class="btn btn--primary">다른 계정 사용하기</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: "sign-in",
  data() {
    return {
      ariaBusy: false,
      img: {
        src: "./../static/brand.png",
        title: "유진",
      },
      isMember: false,
    };
  },
};
</script>

<style>
</style>