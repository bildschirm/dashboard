<template>
	<section class="justify-between items-center flex px-3 py-2 w-full">
		<span class="text-xs font-bold font-mono mr-2">{{ devModeLabel }}</span>
		<div
			:class="{
				'block w-2 h-2 rounded-full sm:mr-3 flex-shrink-0': true,
				[circleColor]: true,
			}"
		></div>
		<span class="text-xs hidden sm:_inline" v-if="status === 'connected'">
			Connected to <span class="font-semibold">Bildschirm</span>
			{{ version }}
			<span class="font-semibold">{{ devModeLabel }}</span>
		</span>
		<span class="text-xs hidden sm:_inline" v-else>
			{{ label }}
			<span class="font-semibold">{{ devModeLabel }}</span>
		</span>
	</section>
</template>

<script type="text/javascript">
import signOutIcon from '@components/icons/sign-out-icon';

export default {
	components: {
		signOutIcon,
	},
	props: {
		status: {
			type: String,
			required: true,
		},
	},
	computed: {
		devModeLabel() {
			switch (process.env.NODE_ENV) {
				case 'development':
					return 'DEV';
				case 'production':
				default:
					return '';
			}
		},
		version() {
			return 'UNABLE';
		},
		label() {
			switch (this.status) {
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
			switch (this.status) {
				case 'disconnected':
					return 'bg-red-500';
				case 'connected':
					return 'bg-green-500';
				case 'connecting':
				default:
					return 'bg-main-lightest';
			}
		},
	},
};
</script>
