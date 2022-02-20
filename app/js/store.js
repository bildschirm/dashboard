/**
 * @module store
 */

import Vue from 'vue';
import Vuex from 'vuex';

// TODO: Don't import all of tailwindcss/colors
import themeList from '@/static/themes.json';

Vue.use(Vuex);

/**
 * @typedef ConnectionStatus
 * @property {string} connecting The client is currently trying to connect to the server.
 * @property {string} connected The client is connected to and authenticated with the server.
 * @property {string} disconnected The client is disconnected from the server.
 * @enum {string}
 */

/**
 * The Vuex Store used.
 *
 * @property {User} user The logged in user
 *
 * @property {Object} state The state object.
 * @property {ConnectionStatus} state.connectionStatus The status of the connection to Mission Control.
 * @property {string} state.page The current ID / slug of the page.
 * @property {bool} state.showSidebar Wether or not the sidebar is visible / extended.
 * @property {Object} state.mcState The Mission Control state object.
 *
 * @property {Object} mutations All the state mutation functions. Type of properties in this case refers to the type of data to pass along with `store.commit('mutationName', data)`.
 * @property {ConnectionStatus} mutations.setConnectionStatus Update the connection status.
 * @property {Object} mutations.fullUpdateMcState Fully replace the Mission Control state object in the store.
 * @property {Object} mutations.updateMcState Partially update the Mission Control state object in the store.
 * @property {string} mutations.setPage Set the currently active page. Used for navigation.
 * @property {bool} mutations.setShowSidebar Change visibility of the sidebar.
 *
 * @property {Object} actions All the state action functions. Type of properties in this case refers to the type of data to pass along with `store.dispatch('mutationName', data)`.
 * @property {string} actions.navigate Navigate to the given page.
 *
 * @property {Function} commit Commit a mutation to the state object.
 * @property {Function} dispatch Dispatch an action to the state object.
 */
export const store = new Vuex.Store({
	state: {
		ready: false,
		now: new Date(),
		user: window.MISSION_CONTROL_USER,
		firstConnectConfirmed: false,
		connectionStatus: 'connecting', // connecting, connected, disconnected
		page: 'dashboard',
		showSidebar: document.body.clientWidth >= 768,
		mcState: window.MISSION_CONTROL_INITIAL_STATE,

		componentPropTypes: {},

		theme: window.MISSION_CONTROL_THEME || 'purple',
		services: {
			core: {
				status: 'requested' || 'subscribed',
				state: {},
			},
		},
	},
	mutations: {
		setConnectionStatus(state, status) {
			state.connectionStatus = status;
		},
		updateNowDate(state) {
			state.now = new Date();
		},
		fullUpdateMcState(state, newMcState) {
			state.mcState = newMcState;
		},
		updateMcState(state, newMcState) {
			state.mcState = {
				...state.mcState,
				...newMcState,
			};
		},
		setPage(state, page) {
			state.page = page;
		},
		setShowSidebar(state, showSidebar) {
			state.showSidebar = showSidebar;
		},
		setUser(state, user) {
			state.user = user;
		},

		confirmFirstConnection(state) {
			state.firstConnectConfirmed = true;
		},
		setAppReady(state, ready) {
			state.ready = ready;
		},
		setTheme(state, theme) {
			state.theme = theme;

			for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
				meta.content = themeList[theme]['700'];
			}
		},
		setComponentPropType(state, { componentType, props }) {
			state.componentPropTypes[componentType] = props;
		}
	},
	actions: {
		navigate(context, to) {
			context.commit('setPage', to);

			// if (to === 'spotify') {
			// 	context.commit('setShowSidebar', false);
			// }
		},
	},
});
