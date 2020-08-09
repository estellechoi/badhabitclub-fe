import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./../views/main/Home.vue";
import SetPassword from "./../views/main/SetPassword.vue";
import GoodsList from "./../views/main/GoodsList.vue";
import MyPage from "./../views/main/MyPage.vue";
import DeleteAccount from "./../views/main/DeleteAccount.vue";
import DeleteAccountConfirm from "./../views/main/DeleteAccountConfirm.vue";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location) {
	return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const router = new VueRouter({
	mode: "history",
	routes: [
		{
			path: "/",
			name: "home",
			component: Home,
		},
		{
			path: "/set-password",
			name: "set-password",
			component: SetPassword,
		},
		{
			path: "/my-page",
			name: "my-page",
			component: MyPage,
		},
		{
			path: "/delete-account",
			name: "delete-account",
			component: DeleteAccount,
		},
		{
			path: "/delete-account-confirm",
			name: "delete-account-confirm",
			component: DeleteAccountConfirm,
		},
		{
			path: "/goods",
			name: "goods",
			component: GoodsList,
		},
	],
});

export default router;
