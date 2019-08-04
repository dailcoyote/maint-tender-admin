import Vue from "vue";
import Vuex from "vuex";
import jwt from "jsonwebtoken"
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: null,
        token: null,
		tokenEXP: null,
		current_supplier: null,
		action: null
	},
	plugins: [createPersistedState()],
	mutations: {
		login(state, payload) {
			state.token = payload.accessToken;
			state.tokenEXP = jwt.decode(payload.accessToken).exp;
            state.user = {
				userID: payload.userID,
				fullname: payload.fullname,
				username: payload.username,
				role: payload.role,
				accessControls: payload.accessControls,
				adminControls: payload.adminControls
			}
		},
		logout(state){
            state.user = null;
            state.token = null;
            state.tokenEXP = null;
		},
		setCurrentSupplier(state, supplier){
			state.current_supplier = supplier;
		},
		setAction(state, action){
			state.action = action
		}
	},
	actions: {
		login({ commit }, payload){
            commit('login', payload);
        }
	}
});
