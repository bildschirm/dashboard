<template>
	<main class="dashboard-page">
		<iframe ref="iframe" class="w-full h-screen" :src="url"></iframe>

		<top-bar-actions>
			<top-bar-button @click="clicked">Refresh</top-bar-button>
		</top-bar-actions>
	</main>
</template>
<script type="text/javascript">
import config from '@config';

import topBarActions from '@components/portals/top-bar-actions.vue';
import topBarButton from '@components/controls/top-bar-button.vue';

export default {
	name: 'spotify-page',
	computed: {
		url() {
			return config.missionControlUrl + '/spotify/';
		}
	},
	methods: {
		clicked() {
			// Reload iframe (hacky)
			this.$refs.iframe.src = this.$refs.iframe.src;
		}
	},
	components: {
		topBarActions,
		topBarButton
	}
};
</script>
