<template>
	<button
		class="smart-button"
		:class="{ active }"
		v-bind="{ ...$props, ...$attrs }"
		v-on="$listeners"
	>
		<Background class="z-0" :active="false" />
		<Background
			class="z-0 transition-opacity"
			:active="true"
			:class="`opacity-${active ? 1 : 0}`"
		/>

		<div class="smart-button-content h-24">
			<span class="title">
				<slot></slot>
			</span>
			<figure class="icon" v-if="icon">
				<DynamicIcon :icon="icon" :style="iconColorStyle" />
			</figure>
		</div>
	</button>
</template>
<style lang="scss">
.smart-button {
	@apply relative min-w-24 h-24 overflow-visible transform transition duration-75 active:scale-95 outline-none focus:outline-none;

	.smart-button-content {
		@apply flex items-center justify-between px-5 py-4 font-semibold;

		.title {
			@apply relative block h-full flex flex-1 items-end text-purple-200 transition-colors;
		}

		.icon {
			@apply relative block h-full flex items-start w-6 opacity-40 transition-colors;
		}
	}

	&.active {
		.smart-button-content {
			.title {
				@apply text-purple-100;
			}

			.icon {
				@apply text-purple-200 opacity-100;
			}
		}
	}
}
</style>
<script type="text/javascript">
import DynamicIcon from '@components/icons/DynamicIcon';
import Background from './Background';

export default {
	props: {
		icon: {
			type: String,
			default: '',
		},
		active: {
			type: Boolean,
			default: false,
		},
		color: {
			type: String,
			default: '#f5f3ff',
		},
		shadow: {
			type: Boolean,
			default: true,
		},
	},
	computed: {
		iconColorStyle() {
			const grayscale = !this.active ? 'grayscale(100%)' : '';
			const dropShadow = `drop-shadow(0px 1px 15px ${this.color}) drop-shadow(0px 1px 1000px ${this.color})`;

			return `color: ${this.color}; filter: ${
				this.shadow ? dropShadow : ''
			} ${grayscale};`;
		},
	},
	components: {
		DynamicIcon,
		Background,
	},
};
</script>
