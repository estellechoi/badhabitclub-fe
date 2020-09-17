import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";

import componentMixins from "./components/componentMixins";
import CONST from "./const.js";
import mixins from "./mixins.js";

Vue.mixin({ ...componentMixins, ...CONST, ...mixins });

import filter from "./filter.js";
filter.init(Vue);

Vue.config.productionTip = false;

new Vue({
	render: (h) => h(App),
	router,
	store,
}).$mount("#app");
