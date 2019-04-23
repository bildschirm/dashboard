import Vue from 'vue';
import store from './store';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueRouterMultiView from 'vue-router-multi-view';
Vue.use(VueRouterMultiView);

import VueObserveVisibility from 'vue-observe-visibility';
Vue.use(VueObserveVisibility);

import icon from '@components/icon';
Vue.component('icon', icon);

import formatBytes from '@helpers/format-bytes';
Vue.filter('bytes', function(value) {
	return formatBytes(value);
});

import missionControlUi from '@components/mission-control-ui';
Vue.component('mission-control-ui', missionControlUi);

import loading from '@pages/loading';
import dashboard from '@pages/dashboard';
import spotify from '@pages/spotify';
import statistics from '@pages/statistics';
import statisticsStateBrowser from '@pages/statistics-state-browser';
import notifications from '@pages/notifications';

const routes = [
	{ path: '/', component: dashboard },
	{ path: '/spotify', component: spotify },
	{ path: '/statistics', component: statistics },
	{ path: '/statistics/browse', component: statisticsStateBrowser },
	{ path: '/notifications', component: notifications }
];

const router = new VueRouter({
	routes
});

Vue.mixin({
	methods: {
		$mcState(key, defaultValue = {}) {
			return this.$store.state.mcState
				? this.$store.state.mcState[key]
				: defaultValue;
		}
	}
});

const app = new Vue({
	el: '#app',
	router,
	store
});
export default { app, store, Vue };
