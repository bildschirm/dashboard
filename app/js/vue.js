import config from '@config';
import Vue from 'vue';
import store from './store';
import { router } from './router';
import { client } from '@socket';

// import VueRouterMultiView from 'vue-router-multi-view';
import VueObserveVisibility from 'vue-observe-visibility';
import PortalVue from 'portal-vue'

import missionControlUi from '@pages/layout/index.vue';

Vue.use(VueObserveVisibility);
Vue.use(PortalVue);

Vue.mixin({
	methods: {
		$mcState(key, defaultValue = {}) {
			return this.$store.state.mcState
				? Array.isArray(defaultValue)
					? this.$store.state.mcState[key]
					: { ...defaultValue, ...this.$store.state.mcState[key] }
				: defaultValue;
		}
	},
	computed: {
		$sync() {
			return client;
		},
		$config() {
			return config;
		}
	}
});

const app = new Vue({
	el: '#app',
	router,
	store,
	components: {
		missionControlUi
	}
});
export default { app, store, Vue };
