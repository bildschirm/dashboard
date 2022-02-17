<template>
	<!--  App Root	-->
	<div
		class="flex flex-col w-full overflow-hidden app-background"
		:style="iPhoneRootStyle"
		:class="{
			fullscreen: sidebarHidden,
			'justify-center items-center': !$store.state.firstConnectConfirmed,
		}"
	>
		<!--  Show Spinner when loading initial state	-->
		<loading
			v-if="!$store.state.firstConnectConfirmed"
			class="animate-fade-in text-purple-600 mb-10"
			icon-class="w-16"
		/>

		<!--	Render main app UI	-->
		<template v-else>
			<!-- Sidebar -->
			<top-bar
				@toggle-sidebar="toggleSidebar"
				class="ease-in-out sticky"
				:show-submenu="sidebarHidden"
			/>

			<div class="w-full flex-1 flex items-stretch overflow-hidden">
				<sidebar
					@toggle-sidebar="toggleSidebar"
					:hidden="sidebarHidden"
					:class="{ 'hidden': sidebarHidden }"
				/>


				<main
					class="bg-black bg-dotted bg-opacity-30 md:rounded-tl-4xl flex-1 transition-margin-left ease-in-out relative overflow-y-scroll"
					:class="{ 'hidden md:block': !sidebarHidden }"
				>
					<SmoothCorner
						class="absolute top-0 left-0 z-0"
						start-color="#4a1b94"
						end-color="#4a1b94"
					/>

					<!--  Render main content	-->
					<router-view
						class="router-multi-view z-1 relative"
					/>

					<portal-target
						name="side-context"
						:transition="slideInComponent"
					></portal-target>
				</main>
				<!-- <section
					class="transition-margin-left ease-in-out overflow-hidden md:overflow-auto flex flex-col animate-fade-in"
					:class="{ 'md:ml-64': !sidebarHidden }"
					style=""
				>
					
				</section> -->
			</div>

			<ServiceProvider
				service="notifications"
				v-slot="{ notifications }"
			>
				<NotificationGroup
					:remote-notifications="notifications"
				/>
			</ServiceProvider>
		</template>
	</div>
</template>
<script type="text/javascript">
import sidebar from './components/sidebar';
import topBar from './components/top-bar';
import mobileNavBar from './components/mobile-nav-bar';
import chevronDoubleRightIcon from '@components/icons/chevron-double-right-icon';
import loading from './components/loading';
import NotificationGroup from '@components/NotificationGroup';
import SmoothCorner from '@components/common/SmoothCorner';
import ServiceProvider from '@components/headless/ServiceProvider';

import composeSmoothClipPath from '@helpers/compose-smooth-clip-path';
import isIOS from '@helpers/is-ios';

const SlideIn = {
	template: `
		<transition name="slide">
			<slot></slot>
		</transition>
	`,
};



export default {
	components: {
		sidebar,
		topBar,
		loading,
		chevronDoubleRightIcon,
		mobileNavBar,
		NotificationGroup,
		SmoothCorner,
		SlideIn,
		ServiceProvider,
	},
	computed: {
		pageIsSpotify() {
			return this.$store.state.page === 'spotify';
		},
		sidebarHidden() {
			return !this.$store.state.showSidebar;
		},
		slideInComponent() {
			return SlideIn;
		},

		iPhoneRootStyle() {
			return !isIOS() ? 'height: 100vh' : 'height: calc(100vh - env(safe-area-inset-bottom))'
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
	},
};
</script>
<style type="text/css">
.bg-dotted {
	background-size: 8px 8px;
	background-attachment: local;
	background-image: radial-gradient(circle, #4c1d95b3 1px, rgba(0, 0, 0, 0) 1px);
}
</style>
