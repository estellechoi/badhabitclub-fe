<template>
  <div>
    <!-- BANNER -->
    <aside class="banner" v-if="banner.use" ref="banner">
      <a href="#">
        <div class="banner__content">
          {{ banner.title }}
          <span class="banner__due">{{ banner.msg }}</span>
        </div>
      </a>
    </aside>

    <!--HEADER-->
    <header class="section" ref="header">
      <div class="container">
        <div class="menu-group clearfix">
          <div class="logo float--left">
            <a href="#">{{ logo.alt }}</a>
          </div>

          <nav class="sign-box float--right" aria-hidden="false" ref="signBox">
            <a href="#" class="sign-box__btn btn btn--primary">
              <i class="fas fa-sign-in-alt"></i>
              <span class="menu-label">JOIN</span>
            </a>

            <a href="#" class="sign-box__btn btn btn--primary">
              <i class="fas fa-user"></i>
              <span class="menu-label">MY PAGE</span>
            </a>

            <a href="#" class="sign-box__btn btn btn--primary">
              <i class="fas fa-shopping-bag"></i>
              <span class="menu-label">BAG</span>
            </a>
          </nav>
        </div>

        <div class="nav-group">
          <button
            type="button"
            aria-label="메뉴토글"
            id="nav-toggle-btn"
            class="btn btn--primary"
            @click="toggleNavBar"
          >
            <i class="fas fa-bars"></i>
          </button>

          <nav>
            <ul class="nav--list" ref="navList">
              <li v-for="(item, index) in navList" :key="index">
                <a :href="item.url">{{ item.label }}</a>
              </li>
            </ul>
          </nav>

          <form id="home-search-form" action method="get" role="search">
            <label for="home-search-box__input" class="search-box">
              <button
                type="button"
                aria-label="검색"
                id="home-search-box__btn"
                class="btn btn--primary search-box__btn"
                @click="toggleInputField"
              >
                <i class="fas fa-search"></i>
              </button>

              <div>
                <div id="home-search-box__input" class="search-box__input-box" ref="searchInput">
                  <input
                    type="text"
                    aria-label="검색어 입력"
                    autocomplete="off"
                    autocorrect="off"
                    spellcheck="false"
                    aria-autocomplete="list"
                    aria-expanded="false"
                    role="combobox"
                    placeholder="상품명을 입력하세요."
                    class="search-box__input--text"
                  />
                </div>
              </div>
            </label>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner: {
        use: true,
        title: "카카오 친구 추가하고 3,000 절약해요!",
        msg: "7.31 까지",
      },
      logo: {
        alt:
          "브랜드 로고 이미지, 클릭하면 홈 화면으로 돌아갑니다. (Brand logo image, if clicked, which gets you move back to home)",
      },
      navList: [
        {
          label: "ALL",
          url: "#",
        },
        {
          label: "TOP",
          url: "#",
        },
        {
          label: "ACCESSORIES",
          url: "#",
        },
        {
          label: "ARCHIVE",
          url: "#",
        },
      ],
    };
  },
  methods: {
    toggleInputField() {
      const $searchInput = this.$refs.searchInput;
      $searchInput.classList.toggle("full-width");
    },
    toggleNavBar() {
      const $navList = this.$refs.navList;
      $navList.classList.toggle("toggled");
    },
    getScrollY() {
      const pageYOffset = window.pageYOffset; // IE 10
      const $header = this.$refs.header;

      if (pageYOffset > 45) {
        $header.classList.add("scrolled");
        // this.$refs.banner.classList.add("banner--hidden");
        this.$refs.searchInput.classList.remove("full-width");
      } else {
        $header.classList.remove("scrolled");
        // this.$refs.banner.classList.remove("banner--hidden");
      }
    },
    checkScroll() {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight;
      const isAllScrolled = scrollY + innerHeight >= docHeight;

      const $signBox = this.$refs.signBox;

      if (isAllScrolled) $signBox.classList.add("hidden");
      else $signBox.classList.remove("hidden");
    },
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.getScrollY();
      this.checkScroll();
    });
  },
};
</script>

<style>
</style>