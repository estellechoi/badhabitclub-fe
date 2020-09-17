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
    <header class="section section--header" :class="{ scrolled: isScrolledMode }" ref="header">
      <div class="container">
        <div class="menu-group clearfix">
          <div class="logo float--left">
            <a @click="$router.push({ path: '/' })">
              <span class="blind-box">{{ logo.alt }}</span>
            </a>
          </div>

          <nav
            class="sign-icon-box float--right"
            :class="{ 'hidden' : isAllScrolled }"
            aria-hidden="false"
            ref="signBox"
          >
            <a class="sign-icon-box__btn btn btn--primary" v-if="isOnline" @click="signOut">
              <i class="fas fa-sign-out-alt" aria-hidden="true"></i>
              <span class="menu-label">SIGN OUT</span>
            </a>

            <a class="sign-icon-box__btn btn btn--primary" v-else @click="pullSignUpModal">
              <i class="fas fa-sign-in-alt" aria-hidden="true"></i>
              <span class="menu-label">JOIN</span>
            </a>

            <a
              class="sign-icon-box__btn btn btn--primary"
              @click="isOnline ? goMyPage() : pullSignInModal()"
            >
              <i class="fas fa-user" aria-hidden="true"></i>
              <span class="menu-label">MY PAGE</span>
            </a>

            <a class="sign-icon-box__btn btn btn--primary" ref="bag" @click="goShoppingBag">
              <i class="fas fa-shopping-bag" :class="{ bounce: isBagChanging }"></i>
              <span class="menu-label" aria-hidden="true">BAG</span>
              <span class="menu-label__cnt">{{ bagCnt }}</span>
            </a>

            <a class="sign-icon-box__btn btn btn--primary" @click="goAdmin" v-if="isAdmin">
              <i class="fas fa-cog" aria-hidden="true"></i>
              <span class="menu-label">ADMIN</span>
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
            <ul class="nav--list" :class="{ 'toggled' : isNavToggled }" @click="goMenu">
              <li v-for="(item, index) in navList" :key="index">
                <a :data-path="item.path">
                  {{
                  item.label
                  }}
                </a>
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
                <div
                  id="home-search-box__input"
                  class="search-box__input-box"
                  :class="{ 'full-width' : showSearchBox }"
                >
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
                    v-model="searchText"
                  />
                </div>
              </div>
            </label>
          </form>
        </div>
      </div>
    </header>

    <!--MODAL-->
    <modal v-if="showSignUp" :ariaLabel="'회원가입'" @close="closeSignUp">
      <sign-up slot="body" @close="closeSignUp"></sign-up>
    </modal>

    <modal v-if="showSignIn" :ariaLabel="'로그인'" @close="closeSignIn">
      <sign-in-box slot="body" @close="closeSignIn"></sign-in-box>
    </modal>
  </div>
</template>

<script>
import SignInBox from "./../modal/SignInBox";
import SignUp from "./../modal/SignUp";
import bus from "./../../utils/bus.js";

export default {
  components: {
    SignInBox,
    SignUp,
  },
  data() {
    return {
      isAdmin: true,
      isNavToggled: false,
      banner: {
        use: false,
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
          path: "/goods-list",
        },
        {
          label: "TOP",
          path: "/goods-list",
        },
        {
          label: "ACCESSORIES",
          path: "/goods-list",
        },
        {
          label: "ARCHIVE",
          path: "/goods-list",
        },
      ],
      showSignIn: false,
      showSignUp: false,
      searchText: "",
      isOnline: true,
      isScrolledMode: false,
      isAllScrolled: false,
      isHome: true,
      isBagChanging: false,
      showSearchBox: false,
    };
  },
  computed: {
    bagCnt() {
      return this.$store.getters.bagList.length;
    },
  },
  watch: {
    $route(to) {
      console.log(to);
      if (to.name === "home") {
        this.isHome = true;
        this.isScrolledMode = false;
      } else {
        this.isHome = false;
        this.isScrolledMode = true;
      }
    },
  },
  methods: {
    toggleInputField() {
      this.showSearchBox = !this.showSearchBox;
    },
    toggleNavBar() {
      this.isNavToggled = !this.isNavToggled;
    },
    goMenu(evt) {
      const target = evt.target;
      if (target.tagName !== "A") return evt.stopPropagation();

      this.isNavToggled = false;
      this.$router.push({ path: target.dataset.path });
    },
    getScrollY() {
      const pageYOffset = window.pageYOffset; // IE 10

      if (pageYOffset > 45) {
        this.isScrolledMode = true;
        // this.$refs.banner.classList.add("banner--hidden");
        this.showSearchBox = false;
        this.searchText = "";
      } else {
        this.isScrolledMode = false;
        // this.$refs.banner.classList.remove("banner--hidden");
      }
    },
    checkScroll() {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight;
      this.isAllScrolled = scrollY + innerHeight >= docHeight;
    },
    goMyPage() {
      this.$router.push("/my-page");
    },
    pullSignInModal() {
      this.showSignIn = true;
    },
    pullSignUpModal() {
      this.showSignUp = true;
    },
    closeSignIn(res) {
      this.showSignIn = false;

      if (!res) return;
      if (res === "signIn") return (this.isOnline = true);
      this.pullSignUpModal();
    },
    closeSignUp(res) {
      this.showSignUp = false;

      if (!res) return;
      this.pullSignInModal();
    },
    goShoppingBag() {
      if (!this.isOnline) return this.pullSignInModal();
      this.$router.push({ path: "/order/bag" });
    },
    signOut() {
      // signout api
      this.isOnline = false;
    },
    goAdmin() {
      this.$router.push({ path: "/admin/dashboard" });
    },
    callScrollFuncs() {
      if (this.isHome) this.getScrollY();
      this.checkScroll();
    },
    getRotatingIcon() {
      this.isBagChanging = true;
      window.setTimeout(() => (this.isBagChanging = false), 2000);
    },
  },
  created() {
    bus.$on("change-bag", this.getRotatingIcon);
  },
  mounted() {
    window.addEventListener("scroll", this.callScrollFuncs);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.callScrollFuncs);
    bus.$off("change-bag", this.getRotatingIcon);
  },
};
</script>

<style></style>
