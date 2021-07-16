<template>
	<div
		class="absolute w-full h-full rounded-full bg-gradient-to-b"
		:class="backgroundClasses"
	>
		<SmoothCorner
			class="absolute top-0 left-0"
			rotation="0"
			:active="active || false"
			:start-color="colors.start"
			:end-color="colors.mid"
		/>
		<SmoothCorner
			class="absolute top-0 right-0"
			rotation="90"
			:active="active || false"
			:start-color="colors.start"
			:end-color="colors.mid"
		/>
		<SmoothCorner
			class="absolute bottom-0 right-0"
			rotation="180"
			:active="active || false"
			:start-color="colors.mid"
			:end-color="colors.end"
		/>
		<SmoothCorner
			class="absolute bottom-0 left-0"
			rotation="270"
			:active="active || false"
			:start-color="colors.mid"
			:end-color="colors.end"
		/>
	</div>
</template>
<script type="text/javascript">
import SmoothCorner from '@components/common/SmoothCorner';

export default {
	props: ['color', 'active'],
	components: {
		SmoothCorner,
	},
	computed: {
		colors() {
			return this.active
				? { start: '#8B5CF6', mid: '#844BF1', end: '#7C3AED' }
				: { start: '#6D28D9', mid: '#6424C7', end: '#5B21B6' };
		},
		backgroundClasses() {
			return {
				'from-purple-700 to-purple-800 shadow-lg': !this.active,
				'from-purple-500 to-purple-600 shadow-active-glow': this.active,
			};
		},
	},
};
</script>
