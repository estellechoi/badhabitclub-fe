import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		bagList: [],
	},
	getters: {
		bagList(state) {
			return state.bagList;
		},
	},
	mutations: {
		ADD_BAG_LIST(state, payload) {
			state.bagList = state.bagList.concat(payload);
		},
	},
	actions: {
		FETCH_BAG_LIST(context, param) {
			// api
			console.log(context, param);
		},
	},
});
