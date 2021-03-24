<template>
	<section
		class="justify-between items-center flex px-3 py-2 w-full"
	>
		<span
			:class="{
				'block w-2 h-2 rounded-full mr-3': true,
				[circleColor]: true
			}"
		></span>
		<span class="text-xs" v-if="$store.state.connectionStatus === 'connected'">
			Connected to <span class="font-semibold">Mission Control</span> {{ systemInfo.version }}
		</span>
		<span class="text-xs" v-else>
			{{ label }}
		</span>
	</section>
</template>

<script type="text/javascript">
import signOutIcon from '@components/icons/sign-out-icon';

export default {
	components: {
		signOutIcon
	},
	computed: {
		systemInfo() {
			return this.$mcState('systemInfo', {
				version: ''
			});
		},
		label() {
			switch (this.$store.state.connectionStatus) {
				case 'disconnected':
					return 'Disconnected';
				case 'connected':
					return 'Connected';
				case 'connecting':
				default:
					return 'Reconnecting...';
			}
		},
		circleColor() {
			switch (this.$store.state.connectionStatus) {
				case 'disconnected':
					return 'bg-red-500';
				case 'connected':
					return 'bg-green-500';
				case 'connecting':
				default:
					return 'bg-main-lightest';
			}
		}
	}
};
</script>
