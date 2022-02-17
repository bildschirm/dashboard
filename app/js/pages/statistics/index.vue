<template>
	<main class="dashboard-page p-5 md:p-12">
		<ServiceProvider service="telemetry" v-slot="{ stats }">
			<article class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-8">
				<InfoBlock label="Mission Control" class="col-span-1">
					{{stats.deviceName}}
				</InfoBlock>
				<InfoBlock label="Version" class="col-span-1">
					{{ stats.version }}
				</InfoBlock>
				<InfoBlock label="UI-Version" class="col-span-1">
					{{ stats.uiVersion }}
				</InfoBlock>
			</article>
			<article class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-8">
				<InfoBlock label="System" class="col-span-1">
					{{ stats.system.manufacturer }}
					{{ stats.system.model }}
				</InfoBlock>
				<InfoBlock label="Platform" class="col-span-1">
					{{ stats.os.platform }}
				</InfoBlock>
				<InfoBlock label="OS" class="col-span-1">
					{{ stats.os.distro }}
					{{ stats.os.version }}
				</InfoBlock>
				<InfoBlock label="Architecture" class="col-span-1">
					{{ stats.os.architecture }}
				</InfoBlock>
				<InfoBlock label="CPU Model" class="col-span-1">
					{{ stats.cpu.manufacturer }} {{ stats.cpu.brand }}
				</InfoBlock>
				<InfoBlock label="Internet Speed" class="col-span-1">
					{{ stats.network.speed }} MBit/s
				</InfoBlock>
				<InfoBlock label="Internal IPv4" class="col-span-1">
					{{ stats.network.internalIPv4 }}
				</InfoBlock>
				<InfoBlock label="Public IPv4" class="col-span-1">
					{{ stats.network.publicIPv4 }}
				</InfoBlock>
				<InfoBlock label="MAC Address" class="col-span-1">
					{{ stats.network.mac }}
				</InfoBlock>
			</article>
			<h2 class="text-xl text-purple-400 font-semibold mb-32 border-t-4 border-purple-800 pt-1 h-0 rounded-full relative shadow-lg opacity-70">
				<span class="bg-purple-800 rounded-b px-2 py-1 shadow-lg">Telemetry</span>
			</h2>

			<article class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-8">
				<InfoBlock label="CPU Temperature" class="col-span-1">
					{{ stats.cpu.mainTemperature }}°C
				</InfoBlock>
				<InfoBlock label="Total CPU Usage" class="col-span-1">
					{{ parseInt(stats.cpu.currentLoad) }}%
				</InfoBlock>
				<InfoBlock label="Memory Usage" class="col-span-1">
					{{ stats.memory.used | bytes }}/{{stats.memory.total | bytes}}
				</InfoBlock>
			</article>
			<h2 class="text-xl text-purple-400 font-semibold mb-32 border-t-4 border-purple-800 pt-1 h-0 rounded-full relative shadow-lg opacity-70">
				<span class="bg-purple-800 rounded-b px-2 py-1 shadow-lg">Metrics</span>
			</h2>

			<article class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 mb-8">
				<InfoBlock 
					v-for="(core, index) in stats.cpu.cores"
					:label="`CPU Core ${index + 1}`" 
					class="col-span-1"
					:key="`${core.load}`"
				>
					{{ parseInt(core.load) }}%
				</InfoBlock>
			</article>
			<h2 class="text-xl text-purple-400 font-semibold mb-32 border-t-4 border-purple-800 pt-1 h-0 rounded-full relative shadow-lg opacity-70">
				<span class="bg-purple-800 rounded-b px-2 py-1 shadow-lg">CPU Cores</span>
			</h2>

		</ServiceProvider>

		<top-bar-actions>
			<top-bar-button router-link="/telemetry/sync"
				>Sync Debugger</top-bar-button
			>
		</top-bar-actions>
	</main>
</template>
<style lang="scss">
.stat-block {
	@apply leading-tight font-semibold text-purple-50 text-lg mb-5 lg:mb-0;

	.stat-block-content {
		@apply block w-full truncate;
	}

	.stat-block-heading {
		@apply text-purple-400 text-xs truncate;
	}
}
</style>
<script type="text/javascript">
import formatBytes from '@helpers/format-bytes';

import topBarActions from '@components/portals/top-bar-actions.vue';
import topBarButton from '@components/controls/top-bar-button.vue';

import ServiceProvider from '@components/headless/ServiceProvider';
import SideContext from '@components/portals/SideContext';
import composeServiceComponent from '@helpers/compose-service-component';
import InfoBlock from '@components/common/InfoBlock';

export default {
	name: 'statistics-page',
	data: () => ({
	}),
	created() {
	},
	components: {
		topBarActions,
		topBarButton,
		ServiceProvider,
		SideContext,
		InfoBlock
	},
	filters: {
		bytes: formatBytes,
	},
};
</script>
