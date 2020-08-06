import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./../views/main/Home.vue";
import SetPassword from "./../views/main/SetPassword.vue";
import GoodsList from "./../views/main/GoodsList.vue";
import MyPage from "./../views/main/MyPage.vue";
import DeleteAccount from "./../views/main/DeleteAccount.vue";

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
			path: "/myPage",
			name: "myPage",
			component: MyPage,
		},
		{
			path: "/deleteAccount",
			name: "deleteAccount",
			component: DeleteAccount,
		},
		{
			path: "/goodsList",
			name: "goodsList",
			component: GoodsList,
		},
	],
});
