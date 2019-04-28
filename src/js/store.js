import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		connectionStatus: 'connecting', // connecting, connected, disconnected
		page: 'dashboard',
		showSidebar: true,
		mcState: null,
		booting: true
	},
	mutations: {
		setConnectionStatus(state, status) {
			state.connectionStatus = status;
		},
		fullUpdateMcState(state, newMcState) {
			state.mcState = newMcState;
		},
		updateMcState(state, newMcState) {
			state.mcState = {
				...state.mcState,
				...newMcState
			};
		},
		setPage(state, page) {
			state.page = page;
		},
		setShowSidebar(state, showSidebar) {
			state.showSidebar = showSidebar;
		}
	},
	actions: {
		navigate(context, to) {
			context.commit('setPage', to);

			// if (to === 'spotify') {
			// 	context.commit('setShowSidebar', false);
			// }
		}
	}
});

export default store;
