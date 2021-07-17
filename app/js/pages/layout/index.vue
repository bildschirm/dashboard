<template>
	<!--  App Root	-->
	<div
		class="flex w-full min-h-screen app-background"
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
				class="fixed top-0 transition-margin-left ease-in-out"
			/>

			<div class="w-full">
				<sidebar
					@toggle-sidebar="toggleSidebar"
					:hidden="sidebarHidden"
					class="max-h-without-header mt-10"
				/>

				<section
					class="h-full max-h-without-double-header md:max-h-without-header transition-margin-left ease-in-out overflow-hidden md:overflow-auto flex flex-col animate-fade-in mt-20 md:mt-10"
					:class="{ 'md:ml-64': !sidebarHidden }"
				>
					<main
						class="bg-black bg-opacity-30 md:rounded-tl-4xl flex-1 transition-margin-left ease-in-out relative overflow-hidden overflow-y-scroll"
						:class="{ 'md:ml-12': sidebarHidden }"
					>
						<SmoothCorner
							class="absolute top-0 left-0 z-0"
							start-color="#4a1b94"
							end-color="#4a1b94"
						/>

						<!--  Render main content	-->
						<router-view
							class="router-multi-view z-1 relative h-full"
						/>

						<portal-target
							name="side-context"
							:transition="slideInComponent"
						></portal-target>
					</main>
				</section>
			</div>
		</template>

		<remote-notifications />
	</div>
</template>
<script type="text/javascript">
import sidebar from './components/sidebar';
import topBar from './components/top-bar';
import mobileNavBar from './components/mobile-nav-bar';
import chevronDoubleRightIcon from '@components/icons/chevron-double-right-icon';
import loading from './components/loading';
import remoteNotifications from '@components/remote-notifications';

import SmoothCorner from '@components/common/SmoothCorner';

import composeSmoothClipPath from '@helpers/compose-smooth-clip-path';

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
		remoteNotifications,
		SmoothCorner,
		SlideIn,
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
