<template>
	<ServiceProvider
		service="dashboards"
		v-slot="{ main, componentProps, invokeAction }"
	>
		<DashboardGrid
			class="md:p-12 "
			v-if="main"
			:layouts="main"
			:component-props="componentProps"
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
