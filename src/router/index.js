import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./../views/main/Home.vue";
import SetPassword from "./../views/main/SetPassword.vue";
import GoodsList from "./../views/main/GoodsList.vue";
import MyPage from "./../views/main/MyPage.vue";
import DeleteAccount from "./../views/main/DeleteAccount.vue";

// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
// 	return originalPush.call(this, location).catch((err) => err);
// };

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
			path: "/goods",
			name: "goods",
			component: GoodsList,
		},
	],
});

// router.beforeEach((to, from, next) => {
// 	console.log(to, from);
// 	if (from.name && to.path === from.path) return console.log("pending");
// 	next();
// });

export default router;
