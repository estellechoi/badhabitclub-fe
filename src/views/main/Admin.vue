<template>
  <main role="main">
    <section class="section section--admin">
      <div class="container">
        <header class="admin-menu-box">
          <div>
            <div class="logo logo--elip">
              <a @click="$router.push({ path: '/' })">
                <span class="blind-box">배드해빗클럽 로고 이미지, 클릭하면 홈으로 이동합니다.</span>
              </a>
            </div>
          </div>

          <ul class="admin-menu-list" @click="goMenu">
            <li class="admin-menu-item" v-for="(item, index) in adminMenuList" :key="index">
              <a
                class="admin-menu-item__link"
                :class="{ 'admin-menu-item__link--active' : routeName === item.path }"
                :data-route-name="item.path"
              >{{ item.label }}</a>
            </li>
          </ul>
        </header>

        <router-view></router-view>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      adminMenuList: [
        {
          label: "상품조회",
          value: "",
          path: "prdt-list",
        },
        {
          label: "상품등록",
          value: "",
          path: "prdt",
        },
        {
          label: "리뷰",
          value: "",
          path: "review",
        },
        {
          label: "클레임 관리",
          value: "",
          path: "claim",
        },
        {
          label: "프로모션 관리",
          value: "",
          path: "promotion",
        },
        {
          label: "회원 관리",
          value: "",
          path: "user-list",
        },
        {
          label: "검색엔진최적화",
          value: "",
          path: "seo",
        },
        {
          label: "쇼핑몰 설정",
          value: "",
          path: "settings",
        },
      ],
    };
  },
  computed: {
    routeName() {
      return this.$route.name;
    },
  },
  methods: {
    goMenu(evt) {
      const target = evt.target;
      if (target.tagName !== "A") return evt.stopPropagation();

      console.log(evt);
      this.$router.push({ name: target.dataset.routeName });
    },
  },
};
</script>

<style>
</style>