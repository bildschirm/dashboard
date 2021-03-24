<template>
	<button class="dashboard-switch" :class="{ 'switch-active': active }" @click="click">
		<switch-background class="z-0" :active="false" />
		<switch-background class="z-0 transition-opacity" :active="true" :class="`opacity-${active ? 1 : 0}`" />

		<div class="dashboard-switch-content h-24">
			<span class="title">
				<slot></slot>
			</span>
			<figure class="icon" v-if="icon">
				<component :is="`${icon}-icon`" />
			</figure>
		</div>
	</button>
</template>
<style lang="scss">
	.dashboard-switch {
		@apply relative min-w-24 h-24 overflow-visible transform transition duration-75 active:scale-95;

		.dashboard-switch-content {
			@apply flex items-center justify-between px-5 py-4 font-semibold;

			.title {
				@apply relative block h-full flex flex-1 items-end text-purple-200 transition-colors;
			}

			.icon {
				@apply relative block h-full flex items-start w-8 text-purple-500 transition-colors;
			}
		}

		&.switch-active {
			.dashboard-switch-content {
				.title {
					@apply text-purple-100;
				}

				.icon {
					@apply text-purple-200;
				}
			}
		}
	}
</style>
<script type="text/javascript">
import homeIcon from '@components/icons/home-icon';
import heartIcon from '@components/icons/heart-icon';

import switchBackground from '@components/controls/switch-background';

export default {
	props: ['icon', 'active'],
	methods: {
		click(e) {
			this.$emit('click', e);
		}
	},
	computed: {
	},
	components: {
		homeIcon,
		heartIcon,
		switchBackground
	}
};
</script>
