<template>
	<header
		class="w-full h-10 flex justify-between items-center px-3"
	>
		<section class="flex items-center h-full">
			<button class="w-5 mr-5 text-purple-500" @click="toggleSidebar">
				<bars-icon></bars-icon>
			</button>
			<h1 class="text-purple-100 font-semibold text-sm cursor-default mr-5 transition">
				{{title}}
				<span 
					class="text-purple-300 transition-all inline-block transform"
					:class="subtitleClass"
				>
					{{subtitle}}
				</span>
			</h1>
			<portal-target name="top-bar-actions" class="flex items-center h-full"></portal-target>
		</section>
		<section class="flex text-purple-300">
			<connection-status></connection-status>
		</section>
	</header>
</template>
<style lang="scss">
	.link {
		@apply hover:text-purple-300;
	}
</style>
<script type="text/javascript">
import connectionStatus from './connection-status';
import barsIcon from '@components/icons/bars-icon';

export default {
	components: {
		connectionStatus,
		barsIcon
	},
	methods: {
		toggleSidebar() {
			this.$emit('toggle-sidebar');
		}
	},
	computed: {
		title() {
			return this.$route.meta.title;
		},
		subtitle() {
			return this.$route.meta.subtitle;
		},
		subtitleClass() {
			return {
				'-translate-x-8 opacity-0 w-0 ml-0': !this.subtitle,
				'ml-2': !!this.subtitle
			};
		}
	}
};
</script>
