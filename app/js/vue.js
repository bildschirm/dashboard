import config from '@config';
import Vue from 'vue';
import { store } from './store';
import { router } from './router';
import { client } from '@socket';

// import VueRouterMultiView from 'vue-router-multi-view';
import Notifications from 'vue-notification';
import VueObserveVisibility from 'vue-observe-visibility';
import PortalVue from 'portal-vue';

import bildschirmUi from '@/js/layout/index.vue';
import spinnerIcon from '@components/icons/spinner-icon';

Vue.use(Notifications);
Vue.use(VueObserveVisibility);
Vue.use(PortalVue);

Vue.component('loading', {
	props: {
		iconClass: {
			type: String,
			default: '',
		},
	},
	template: `
		<section class="flex justify-center items-center">
			<spinner-icon 
				class="fill-current animate-spin"
				:class="iconClass"
			/>
		</section>
	`,
	components: {
		spinnerIcon,
	},
});

Vue.mixin({
	methods: {
		$mcState(key, defaultValue = {}) {
			return this.$store.state.mcState
				? Array.isArray(defaultValue)
					? this.$store.state.mcState[key]
					: { ...defaultValue, ...this.$store.state.mcState[key] }
				: defaultValue;
		},
	},
	computed: {
		$sync() {
			return client;
		},
		$config() {
			return config;
		},
		$user() {
			return this.$store.state.user;
		},
	},
});

setInterval(() => {
	// Update timer for clock
	store.commit('updateNowDate');
}, 1000);

const app = new Vue({
	el: '#app',
	router,
	store,
	components: {
		'bildschirm-ui': bildschirmUi,
	},
});
export default { app, store, Vue };
