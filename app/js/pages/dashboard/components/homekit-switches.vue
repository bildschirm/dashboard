<template>
	<section class="mt-16">
		<span class="dashboard-title mb-2 w-full">Devices</span>
		<div class="flex">
			<template v-for="(service) in homekitState.services">
				 
				 <virtual-switch
					v-if="service.name !== 'Homebridge 4E81'"
					:key="service.uniqueId"
					:active="isServiceActive(service)"
					icon="home"
					@click="toggle(service.uniqueId, { On: !isServiceActive(service) })"
				>
					{{ service.name }}
				</virtual-switch>
			</template>
			
		</div>
	</section>
</template>
<script type="text/javascript">
import virtualSwitch from '@components/controls/switch';
import { callAction } from '@socket';

export default {
	components: {
		'virtual-switch': virtualSwitch
	},
	computed: {
		homekitState() {
			return this.$mcState('homekit', {
				services: {}
			});
		}
	},
	methods: {
		toggle(uniqueId, changes) {
			console.log('hey');
			callAction('HOMEKIT:MODIFY-CHARACTERISTICS', {
				uniqueId,
				changes
			});
		},

		isServiceActive(service) {
			console.log(service);
			return !!service.values.On;
		}
	}
};
</script>
