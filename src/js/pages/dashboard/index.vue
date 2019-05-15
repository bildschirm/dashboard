<template>
	<main class="page p-5 md:p-12">
		<header class="flex">
			<section class="info-block w-1/3">
				<span class="content">Lukas's Home</span>
				<span class="dashboard-title">Dashboard</span>
			</section>

			<section class="info-block w-1/6">
				<span class="content">Movie Night</span>
				<span class="dashboard-title">Current Scene</span>
			</section>

			<section class="info-block w-1/6">
				<span class="content">
					{{
						parseInt(
							$store.state.mcState.systemInfo.cpu.currentLoad
						)
					}}%
				</span>
				<span class="dashboard-title">Total CPU Load</span>
			</section>

			<section class="info-block w-1/6">
				<span class="content">
					{{ $store.state.mcState.systemInfo.network.internalIPv4 }}
				</span>
				<span class="dashboard-title">Internal IP Address</span>
			</section>

			<section class="info-block w-1/6">
				<span class="content">
					{{ $store.state.mcState.systemInfo.network.publicIPv4 }}
				</span>
				<span class="dashboard-title">Public IP Address</span>
			</section>
		</header>

		<scene-switches></scene-switches>

		<slider-switch>Light</slider-switch>
		<color-switch :color="color" @color="onColor">Lamp</color-switch>
	</main>
</template>
<script type="text/javascript">
import sceneSwitches from './components/scene-switches';
import sliderSwitch from '@components/controls/slider-switch';
import colorSwitch from '@components/controls/color-switch';

export default {
	name: 'dashboard-page',
	data: () => ({
		color: { r: 0, g: 255, b: 255 }
	}),
	methods: {
		onColor(color) {
			this.color = color;
		}
	},
	components: {
		sceneSwitches,
		sliderSwitch,
		colorSwitch
	}
};
</script>
