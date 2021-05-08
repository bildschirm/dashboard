<template>
	<main class="dashboard-page p-5 md:p-12">
		<span class="block text-lg font-semibold text-purple-100 mb-2 flex">State Browser</span>

		<state-browser
			class="w-full md:w-1/2"
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
