import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";

import filter from "./filter.js";
filter.init(Vue);

import componentMixins from "./components/componentMixins";
Vue.mixin(componentMixins);

Vue.config.productionTip = false;

new Vue({
	render: (h) => h(App),
	router,
	store,
}).$mount("#app");
