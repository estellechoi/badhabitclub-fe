import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./../views/main/Home.vue";
import SetPassword from "./../views/main/SetPassword.vue";
import GoodsList from "./../views/main/GoodsList.vue";
import Goods from "./../views/main/Goods.vue";
import GoodsDetails from "./../views/main/goods/GoodsDetails.vue";

import MyPage from "./../views/main/MyPage.vue";
import Order from "./../views/main/Order.vue";
import Bag from "./../views/main/order/Bag.vue";
import Checkout from "./../views/main/order/Checkout.vue";
import OrderComplete from "./../views/main/order/OrderComplete.vue";

import DeleteAccount from "./../views/main/DeleteAccount.vue";
import DeleteReasons from "./../views/main/delete-account/DeleteReasons.vue";
import DeleteConfirm from "./../views/main/delete-account/DeleteConfirm.vue";
import DeleteComplete from "./../views/main/delete-account/DeleteComplete.vue";

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
			path: "/bag",
			name: "bag",
			component: Bag,
		},
		{
			path: "/delete-account",
			name: "delete-account",
			component: DeleteAccount,
			children: [
				{
					path: "reasons",
					name: "delete-reasons",
					component: DeleteReasons,
				},
				{
					path: "confirm",
					name: "delete-confirm",
					component: DeleteConfirm,
				},
				{
					path: "complete",
					name: "delete-complete",
					component: DeleteComplete,
				},
			],
		},
		{
			path: "/goods-list",
			name: "goods-list",
			component: GoodsList,
		},
		{
			path: "/goods/:id",
			name: "goods",
			component: Goods,
			children: [
				{
					path: "details",
					component: GoodsDetails,
				},
			],
		},
		{
			path: "/order",
			name: "order",
			component: Order,
			children: [
				{
					path: "bag",
					name: "bag",
					component: Bag,
				},
				{
					path: "checkout",
					name: "checkout",
					component: Checkout,
				},
				{
					path: "order-complete",
					name: "order-complete",
					component: OrderComplete,
				},
			],
		},
	],
	scrollBehavior() {
		// if (savedPosition) return savedPosition;
		return { x: 0, y: 0 };
	},
});

export default router;
