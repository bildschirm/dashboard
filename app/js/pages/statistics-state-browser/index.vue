<template>
	<main class="dashboard-page p-5 md:p-12">
		<sync-debugger />

		<top-bar-actions>
			<top-bar-button router-link="/telemetry">Back to Statistics</top-bar-button>
		</top-bar-actions>
	</main>
</template>
<script type="text/javascript">
import syncDebugger from './components/sync-debugger';

import topBarActions from '@components/portals/top-bar-actions.vue';
import topBarButton from '@components/controls/top-bar-button.vue';

export default {
	name: 'statistics-browse-page',
	components: {
		syncDebugger,
		topBarActions,
		topBarButton
	}
};
</script>
