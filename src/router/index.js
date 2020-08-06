import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./../views/main/Home.vue";
import SetPassword from "./../views/main/SetPassword.vue";
import GoodsList from "./../views/main/GoodsList.vue";
import MyPage from "./../views/main/MyPage.vue";

Vue.use(VueRouter);

export const router = new VueRouter({
	mode: "history",
	routes: [
		{
			path: "/",
			name: "home",
			component: Home,
		},
		{
			path: "/setPassword",
			name: "setPassword",
			component: SetPassword,
		},
		{
			path: "/mypage",
			name: "mypage",
			component: MyPage,
		},
		{
			path: "/goodsList",
			name: "goodsList",
			component: GoodsList,
		},
	],
});
