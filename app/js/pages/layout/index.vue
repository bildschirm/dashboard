<template>
	<!--  App Root	-->
	<div
		class="flex w-full min-h-screen app-background"
		:class="{
			fullscreen: sidebarHidden,
			'justify-center items-center': !$store.state.firstConnectConfirmed
		}"
	>
		<!--  Show Spinner when loading initial state	-->
		<loading v-if="!$store.state.firstConnectConfirmed" class="animate-fade-in" />

		<!--	Render main app UI	-->
		<template v-else>
			<!-- Sidebar -->
			<sidebar @toggle-sidebar="toggleSidebar" :hidden="sidebarHidden"></sidebar>

			<main 
				class="w-full transition-margin-left ease-in-out overflow-hidden md:overflow-auto flex flex-col animate-fade-in" 
				:class="{ 'md:ml-64': !sidebarHidden }"
			>
				<top-bar @toggle-sidebar="toggleSidebar" class="transition-margin-left ease-in-out" :class="{ 'md:ml-3 ': sidebarHidden }"></top-bar>

				<article 
					class="bg-black bg-opacity-30 md:rounded-tl-4xl flex-1 transition-margin-left ease-in-out relative overflow-hidden overflow-y-scroll" 
					:class="{ 'md:ml-12': sidebarHidden }"
				>
					<switch-corner 
						class="absolute top-0 left-0 z-0"
						start-color="#4a1b94"
						end-color="#4a1b94"
					/>

					<!--  Render main content	-->
					<router-view 
						class="router-multi-view z-1 relative h-full" 
						
					/>
				</article>
			</main>
		</template>
	</div>
</template>
<script type="text/javascript">
import sidebar from './components/sidebar';
import topBar from './components/top-bar';
import mobileNavBar from './components/mobile-nav-bar';
import chevronDoubleRightIcon from '@components/icons/chevron-double-right-icon';
import switchCorner from '@components/controls/switch-corner';
import loading from './components/loading';

import composeSmoothClipPath from '@helpers/compose-smooth-clip-path';

export default {
	components: {
		sidebar,
		topBar,
		loading,
		chevronDoubleRightIcon,
		mobileNavBar,
		switchCorner
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
		},
		toggleSidebar() {
			this.$store.commit(
				'setShowSidebar',
				!this.$store.state.showSidebar
			);
		},
	}
};
</script>
