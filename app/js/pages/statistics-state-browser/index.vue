<template>
	<main class="dashboard-page p-5 md:p-12">
		<span class="dashboard-title mb-2">State Browser</span>

		<state-browser
			class="w-full"
			:state="$store.state.mcState"
		></state-browser>

		<top-bar-actions>
			<top-bar-button router-link="/telemetry">Back to Statistics</top-bar-button>
		</top-bar-actions>
	</main>
</template>
<script type="text/javascript">
import stateBrowser from './components/state-browser';

import topBarActions from '@components/portals/top-bar-actions.vue';
import topBarButton from '@components/controls/top-bar-button.vue';

export default {
	name: 'statistics-browse-page',
	components: {
		stateBrowser,
		topBarActions,
		topBarButton
	}
};
</script>
