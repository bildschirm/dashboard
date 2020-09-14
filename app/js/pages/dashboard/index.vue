<template>
	<main class="page p-5 md:p-12">
		<!-- <header class="flex">
			<section class="info-block w-1/3">
				<span class="content">Datenregal</span>
				<span class="dashboard-title">Dashboard</span>
			</section>

			<section class="info-block w-1/6">
				<span class="content">
					{{ systemInfo.cpu.mainTemperature }}°C
				</span>
				<span class="dashboard-title">CPU Temperature</span>
			</section>

			<section class="info-block w-1/6">
				<span class="content">
					{{ parseInt(systemInfo.cpu.currentLoad) }}%
				</span>
				<span class="dashboard-title">Total CPU Load</span>
			</section>

			<section class="info-block w-1/6">
				<span class="content">
					{{ systemInfo.network.internalIPv4 }}
				</span>
				<span class="dashboard-title">Internal IP Address</span>
			</section>

			<section class="info-block w-1/6">
				<span class="content">
					{{ systemInfo.network.publicIPv4 }}
				</span>
				<span class="dashboard-title">Public IP Address</span>
			</section>
		</header> -->

		<custom-grid></custom-grid>

		<!-- <scene-switches></scene-switches>
		<homekit-switches></homekit-switches>

		<bahn></bahn>

		<slider-switch icon="home">Light</slider-switch>
		<color-switch :color="color" @color="onColor">
			Lamp
			<template v-slot:more>
				<p>Copyright 2016 Evan You</p>
			</template>
		</color-switch> -->
	</main>
</template>
<script type="text/javascript">
import customGrid from './components/custom-grid';
import homekitSwitches from './components/homekit-switches';
import bahn from './components/bahn';

export default {
	name: 'dashboard-page',
	computed: {
		
	},
	components: {
		homekitSwitches,
		customGrid,
		bahn
	}
};
</script>
