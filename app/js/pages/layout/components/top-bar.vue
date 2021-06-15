<template>
	<header
		class="w-full "
	>
		<section class="flex items-center justify-between w-full h-10">
			<div class="flex items-center h-full px-3">
				<button class="w-5 mr-5 text-purple-500 flex-shrink-0" @click="toggleSidebar">
					<bars-icon></bars-icon>
				</button>
				<h1 class="text-purple-100 font-semibold text-sm cursor-default mr-5 transition flex-shrink-0">
					{{title}}
					<span 
						class="text-purple-300 transition-all inline-block transform"
						:class="subtitleClass"
					>
						{{subtitle}}
					</span>
				</h1>

				<div class="overflow-x-scroll hidden md:block">
					<portal-target 
						name="top-bar-actions" 
						class="flex items-center h-full max-w-none" 
					/>
				</div>
			</div>
			<div class="flex text-purple-300 flex-shrink-0">
				<connection-status></connection-status>
			</div>
		</section>
		<section class="fixed top-0 mt-10 w-full overflow-x-scroll sm:pl-10 md:hidden">
			<portal-target name="top-bar-actions-bottom" class="flex flex-grow items-center max-w-none"></portal-target>
		</section>
	</header>
</template>
<style lang="scss" scoped>
	.top-bar-button-group {
		@apply flex items-center justify-center text-xs font-semibold text-purple-400 hover:text-purple-300 hover:bg-purple-800 transition-colors h-full px-3 cursor-pointer;

		&.is-link {

		}
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
