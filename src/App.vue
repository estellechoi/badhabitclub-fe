<template>
  <div id="app">
    <div class="body__container">
      <app-header v-if="showOnlyMain"></app-header>
      <router-view></router-view>
      <app-footer v-if="showOnlyMain"></app-footer>
    </div>
  </div>
</template>

<script>
import AppHeader from "./views/common/AppHeader.vue";
import AppFooter from "./views/common/AppFooter.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      showOnlyMain: true,
    };
  },
  watch: {
    $route(to) {
      if ("delete-account order admin".indexOf(to.matched[0].name) > -1)
        this.showOnlyMain = false;
      else this.showOnlyMain = true;
    },
  },
};
</script>
