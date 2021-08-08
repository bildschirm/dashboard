<template>
	<aside
		:class="{
			'z-30 flex md:w-64 w-full h-full justify-center content-between flex-wrap fixed transition-transform ease-in-out app-background md:bg-transparent': true,
			'transform-off-screen-left': hidden,
			'sidebar-visible': !hidden,
		}"
	>
		<section class="w-full text-purple-100 text-base sidebar-header">
			<div class="flex justify-center items-center px-10 py-6">
				<img src="/resources/globe-icon.png" class="w-28" alt="Logo" />
			</div>

			<h1 class="w-full text-center text-xl font-bold">
				Mission Control
			</h1>
		</section>

		<NavigationItemsProvider v-slot="{ items }">
			<nav class="sidebar-navigation-container">
				<div
					v-for="(item, index) of items"
					:key="item.label"
					class="sidebar-navigation-item"
					:style="{ 'transition-delay': `${100 + index * 50}ms` }"
				>
					<router-link
						class="sidebar-navigation-link"
						:to="item.to"
						active-class="sidebar-navigation-link-active"
						:exact="item.exact"
						@click.native="hideSidebarOnMobile"
					>
						<component
							:is="item.icon"
							v-bind="item.itemOptions || {}"
							class="sidebar-navigation-link-icon"
						></component>
						<h3 class="sidebar-navigation-link-label">
							{{ item.label }}
						</h3>
					</router-link>
				</div>
			</nav>
		</NavigationItemsProvider>

		<UserProvider v-slot="{ user }">
			<profile class="sidebar-profile" :user="user"></profile>
		</UserProvider>
	</aside>
</template>
<style lang="scss">
.sidebar-header {
	@apply transition-opacity opacity-0 duration-500 delay-100;
}

.sidebar-navigation-container {
	@apply flex font-medium p-3 flex-wrap;

	.sidebar-navigation-item {
		@apply mb-4 w-full transition ease-out opacity-0 duration-300;

		.sidebar-navigation-link {
			@apply flex items-center transition-colors text-purple-300 font-semibold rounded-2xl hover:bg-purple-700 active:bg-purple-800 px-3 py-3 w-full;

			.sidebar-navigation-link-icon {
				@apply text-purple-500 fill-current w-6 h-6 mr-2;
			}

			.sidebar-navigation-link-label {
				@apply flex-1 text-sm;
			}
		}

		.sidebar-navigation-link-active {
			@apply bg-purple-700 text-purple-100;

			.sidebar-navigation-link-icon {
				@apply text-purple-400;
			}
		}
	}
}

.sidebar-profile {
	@apply transition-opacity opacity-0 duration-700;
}

.sidebar-visible {
	.sidebar-header {
		@apply opacity-100;
	}

	.sidebar-navigation-item {
		@apply opacity-100;
	}

	.sidebar-profile {
		@apply opacity-100 delay-200;
	}
}
</style>
<script type="text/javascript">
import barsIcon from '@components/icons/bars-icon';
import bellIcon from '@components/icons/bell-icon';
import homeIcon from '@components/icons/home-icon';
import youtubeIcon from '@components/icons/youtube-icon';
import spotifyIcon from '@components/icons/spotify-icon';
import filesIcon from '@components/icons/files-icon';
import deathStarIcon from '@components/icons/death-star-icon';
import signOutIcon from '@components/icons/sign-out-icon';
import terminalIcon from '@components/icons/terminal-icon';

import NavigationItemsProvider from '@components/headless/NavigationItemsProvider';
import UserProvider from '@components/headless/UserProvider';

import profile from './profile';

export default {
	props: ['hidden'],
	components: {
		barsIcon,
		bellIcon,
		homeIcon,
		youtubeIcon,
		spotifyIcon,
		filesIcon,
		deathStarIcon,
		signOutIcon,
		terminalIcon,
		profile,
		NavigationItemsProvider,
		UserProvider,
	},
	computed: {
		hasUnreadNotifications() {
			return this.$store.state.mcState
				? this.$store.state.mcState.notifications.reduce(
						(hasUnread, notification) =>
							hasUnread || notification.unread,
						false
				  )
				: false;
		},
	},
	methods: {
		hideSidebarOnMobile() {
			if (document.body.clientWidth < 768) {
				this.$store.commit('setShowSidebar', false);
			}
		},
		toggleSidebar() {
			this.$emit('toggle-sidebar');
		},
	},
};
</script>
