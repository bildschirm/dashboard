<template>
	<section
		class="justify-between items-center flex border-t-2 border-main-darker px-3 py-2 w-full"
	>
		<div class="flex-1 flex items-center">
			<span
				:class="{
					'block w-2 h-2 rounded-full mr-3': true,
					[circleColor]: true
				}"
			></span>
			<span class="text-xs">{{ label }}</span>
		</div>
		<a class="text-main-dark text-xs w-3 h-3" href="/logout">
			<sign-out-icon></sign-out-icon>
		</a>
	</section>
</template>

<script type="text/javascript">
import signOutIcon from '@components/icons/sign-out-icon';

export default {
	components: {
		signOutIcon
	},
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
