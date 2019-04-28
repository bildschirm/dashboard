<template>
	<section
		class="justify-start items-center flex border-t-2 border-main-darker p-5 w-full"
	>
		<span
			:class="{
				'block w-2 h-2 rounded-full mr-3': true,
				[circleColor]: true
			}"
		></span>
		<span>{{ label }}</span>
	</section>
</template>

<script type="text/javascript">
export default {
	computed: {
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
					return 'bg-red';
				case 'connected':
					return 'bg-green';
				case 'connecting':
				default:
					return 'bg-main-lightest';
			}
		}
	}
};
</script>
