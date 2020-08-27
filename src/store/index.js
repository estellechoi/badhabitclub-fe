import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		bagList: [],
		orderList: [],
		userInfo: {
			userName: "최유진",
			email: "estele.choi@gmail.com",
			level: "LV001",
		},
	},
	getters: {
		bagList: (state) => state.bagList,
		orderList: (state) => state.orderList,
		userInfo: (state) => state.userInfo,
	},
	mutations: {
		ADD_BAG_LIST(state, payload) {
			state.bagList = state.bagList.concat(payload);
		},
		REMOVE_BAG_ITEM(state, payload) {
			let cnt = 0;
			state.bagList.some((item, index) => {
				if (payload.indexOf(item.bagId) > -1) {
					state.bagList.splice(index, 1);
					cnt += 1;
					if (cnt >= payload.length) return true;
				}
			});
		},
		ADD_ORDER_LIST(state, payload) {
			state.orderList.push(payload);
		},
		SET_USER_INFO(state, payload) {
			state.userInfo = payload;
		},
	},
	actions: {
		FETCH_BAG_LIST(context, param) {
			// api
			console.log(context, param);
		},
		FETCH_ORDER_INFO(context, param) {
			console.log(context, param);
		},
		FETCH_USER_INFO(context, param) {
			console.log(context, param);
			context.commit("SET_USER_INFO", param);
		},
	},
});
