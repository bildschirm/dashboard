<template>
	<!--  App Root	-->
	<div
		:class="{
			'flex w-full min-h-screen app-background': true,
			fullscreen: sidebarHidden,
			'justify-center': $store.state.mcState === null
		}"
	>
		<!--  Show Spinner when loading initial state	-->
		<template v-if="$store.state.mcState === null">
			<spinner-icon class="text-purple-900 fill-current w-16 animation-spin-infinite mt-24"></spinner-icon>
		</template>

		<!--	Render main app UI	-->
		<template v-else>
			<!--	Show Sidebar button	-->
<!--			<button-->
<!--				@click.prevent="showSidebar"-->
<!--				class="fixed w-12 bg-main-darkest h-screen justify-center hidden md:flex"-->
<!--			>-->
<!--				<chevron-double-right-icon-->
<!--					class="w-5 fill-current text-main self-center"-->
<!--				></chevron-double-right-icon>-->
<!--			</button>-->

			<!-- Sidebar -->
			<sidebar :hidden="sidebarHidden"></sidebar>

			<!-- Render mobile nav bar -->
			<mobile-nav-bar></mobile-nav-bar>

			<!--  Render main content	-->
			<router-multi-view
				:class="{
					'md:ml-64': !sidebarHidden,
					'md:ml-12': sidebarHidden,
					'w-full transition-margin-left overflow-hidden md:overflow-auto bg-black bg-opacity-30 rounded-tl-3xl mt-8': true
				}"
			/>
		</template>
	</div>
</template>

<script type="text/javascript">
import sidebar from './components/sidebar';
import mobileNavBar from './components/mobile-nav-bar';
import chevronDoubleRightIcon from '@components/icons/chevron-double-right-icon';
import spinnerIcon from '@components/icons/spinner-icon';

export default {
	components: {
		sidebar,
		spinnerIcon,
		chevronDoubleRightIcon,
		mobileNavBar
	},
	computed: {
		pageIsSpotify() {
			return this.$store.state.page === 'spotify';
		},
		sidebarHidden() {
			return !this.$store.state.showSidebar;
		}
	},
	methods: {
		showSidebar() {
			this.$store.commit('setShowSidebar', true);
		}
	}
};
</script>
