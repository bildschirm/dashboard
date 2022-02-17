<template>
	<ServiceProvider service="dashboards" v-slot="{ main, invokeAction }">
		<DashboardGrid
			class="p-5 md:p-12"
			v-if="main"
			:layouts="main"
			:invoke-action="invokeAction"
		/>
	</ServiceProvider>
</template>
<script type="text/javascript">
import ServiceProvider from '@components/headless/ServiceProvider';

import DashboardGrid from './DashboardGrid';

export default {
	components: {
		ServiceProvider,
		DashboardGrid,
	},
};
</script>
