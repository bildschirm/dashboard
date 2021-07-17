<template>
	<main class="dashboard-page p-5 md:p-12">
		<ServiceProvider service="telemetry" v-slot="{ stats }">
			<article class="flex mb-10 flex-wrap lg:flex-nowrap items-end">
				<!-- OS Info -->
				<section class="stat-block w-1/2 md:w-1/3">
					<span class="stat-block-content">{{
						stats.deviceName
					}}</span>
					<span class="stat-block-heading">Mission Control</span>
				</section>
				<div class="flex w-2/3">
					<section class="stat-block w-1/2 md:w-1/4">
						<span class="stat-block-content">
							{{ stats.system.manufacturer }}
							{{ stats.system.model }}
						</span>
						<span class="stat-block-heading">System</span>
					</section>
					<section class="stat-block w-1/2 md:w-1/4">
						<span class="stat-block-content">
							{{ stats.os.platform }}
						</span>
						<span class="stat-block-heading">Platform</span>
					</section>
					<!-- <section class="stat-block w-1/3 hidden md:block lg:hidden"></section> -->
					<section class="stat-block w-1/2 md:w-1/4">
						<span class="stat-block-content">
							{{ stats.os.architecture }}
						</span>
						<span class="stat-block-heading">Architecture</span>
					</section>
					<section class="stat-block w-1/2 md:w-1/4">
						<span class="stat-block-content">
							{{ stats.os.distro }}
							{{ stats.os.version }}
						</span>
						<span class="stat-block-heading">OS</span>
					</section>
				</div>
			</article>

			<!-- CPU Info & Memory -->
			<article class="flex mb-8">
				<section class="stat-block w-1/3">
					<span class="stat-block-content">
						{{ stats.cpu.manufacturer }} {{ stats.cpu.brand }}
					</span>
					<span class="stat-block-heading">CPU Model</span>
				</section>

				<section class="stat-block w-1/6">
					<span class="stat-block-content"
						>{{ stats.cpu.mainTemperature }}°C</span
					>
					<span class="stat-block-heading">CPU Temperature</span>
				</section>

				<section class="stat-block w-1/6">
					<span class="stat-block-content">
						{{ parseInt(stats.cpu.currentLoad) }}%
					</span>
					<span class="stat-block-heading">Total CPU Usage</span>
				</section>

				<section class="stat-block w-1/6">
					<span class="stat-block-content"
						>{{ stats.memory.used | bytes }}/{{
							stats.memory.total | bytes
						}}</span
					>
					<span class="stat-block-heading">Memory Usage</span>
				</section>
			</article>

			<!-- CPU Cores -->
			<article class="flex mb-10">
				<template v-for="(core, index) in stats.cpu.cores">
					<div
						class="w-1/3"
						v-if="index % stats.cpu.cores.length === 0"
					></div>
					<section class="stat-block w-1/6" :key="`${core.load}`">
						<span class="stat-block-content"
							>{{ parseInt(core.load) }}%</span
						>
						<span class="stat-block-heading"
							>CPU Core {{ index + 1 }}</span
						>
					</section>
				</template>
			</article>

			<!-- Network Info -->
			<article class="flex mb-8">
				<div class="w-1/3"></div>
				<section class="stat-block w-1/6">
					<span class="stat-block-content">{{
						stats.network.internalIPv4
					}}</span>
					<span class="stat-block-heading">Internal IP Address</span>
				</section>
				<section class="stat-block w-1/6">
					<span class="stat-block-content">{{
						stats.network.publicIPv4
					}}</span>
					<span class="stat-block-heading">Public IP Address</span>
				</section>
				<section class="stat-block w-1/6">
					<span class="stat-block-content">{{
						stats.network.mac
					}}</span>
					<span class="stat-block-heading">MAC Address</span>
				</section>
				<section class="stat-block w-1/6">
					<span class="stat-block-content"
						>{{ stats.network.speed }} MBit/s</span
					>
					<span class="stat-block-heading">Speed</span>
				</section>
			</article>
		</ServiceProvider>

		<ColorInput value="#f1f1f1" />

		<top-bar-actions>
			<top-bar-button router-link="/telemetry/sync"
				>Inspect State</top-bar-button
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
import ColorInput from '@components/form/ColorInput';
import composeServiceComponent from '@helpers/compose-service-component';

export default {
	name: 'statistics-page',
	data: () => ({
		test: 'asdasdas!',
	}),
	created() {
		setTimeout(() => {
			this.test = 'asdasdas!';
		}, 2000);
	},
	components: {
		topBarActions,
		topBarButton,
		ServiceProvider,
		SideContext,
		ColorInput,
	},
	filters: {
		bytes: formatBytes,
	},
};
</script>
