<template>
	<aside
		:class="{
			'z-30 flex md:w-64 w-full h-full justify-center content-between flex-wrap fixed transition-transform': true,
			'transform-off-screen-left': hidden
		}"
	>
		<section class="w-full text-purple-100 text-base">
			<div class="flex justify-center items-center px-3 py-8">
				<img class="w-24"
					 src="https://raw.githubusercontent.com/Capevace/mission-control/master/resources/icon-web.png"
					 alt="Logo">
			</div>

<!--			<nav class="flex justify-between items-center px-5 py-4">-->
<!--				<button @click.prevent="toggleSidebar()" class="flex text-main">-->
<!--					<bars-icon class="w-5"></bars-icon>-->
<!--				</button>-->

<!--				<router-link class="w-5 relative flex text-main" to="/notifications">-->
<!--					<bell-icon-->
<!--						class="bell-router-link self-center"-->
<!--					></bell-icon>-->
<!--					<div-->
<!--						class="absolute w-1.5 h-1.5 bg-pink rounded-full pin-t pin-r"-->
<!--						v-if="hasUnreadNotifications"-->
<!--					></div>-->
<!--				</router-link>-->

<!--				<a class="text-xs w-5 text-main block md:hidden" href="/logout">-->
<!--					<sign-out-icon></sign-out-icon>-->
<!--				</a>-->
<!--			</nav>-->
		</section>

		<nav class="flex  font-medium p-3 flex-wrap">
			<router-link
				v-for="item of navigationItems"
				:key="item.label"
				class="flex items-center mb-3 w-full py-2 rounded-2xl text-purple-400"
				:to="item.to"
				active-class="bg-purple-700"
				:exact="item.exact"
				@click.native="hideSidebarOnMobile"
			>
				<component :is="item.icon" v-bind="item.itemOptions || {}" class="fill-current w-6 mr-2"></component>
				<h3 class="w-full text-purple-200">{{ item.label }}</h3>
			</router-link>
		</nav>

		<connection-status></connection-status>
	</aside>
</template>

<script type="text/javascript">
import barsIcon from '@components/icons/bars-icon';
import bellIcon from '@components/icons/bell-icon';
import homeIcon from '@components/icons/home-icon';
import youtubeIcon from '@components/icons/youtube-icon';
import spotifyIcon from '@components/icons/spotify-icon';
import filesIcon from '@components/icons/files-icon';
import deathStarIcon from '@components/icons/death-star-icon';
import signOutIcon from '@components/icons/sign-out-icon';


import connectionStatus from './connection-status';

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
		connectionStatus
	},
	computed: {
		navigationItems() {
			return [
				{ label: 'Dashboard', icon: 'home-icon', to: '/', exact: true },
				{ label: 'Spotify', icon: 'spotify-icon', to: '/spotify' },
				{ label: 'YouTube', icon: 'youtube-icon', to: '/youtube-downloader' },
				{ label: 'Files', icon: 'files-icon', to: '/files' },
				{ label: 'Statistics', icon: 'death-star-icon', iconOptions: { primary: 'text-main-dark', secondary: 'text-main'}, to: '/statistics' }
			];
		},
		hasUnreadNotifications() {
			return this.$store.state.mcState
				? this.$store.state.mcState.notifications.reduce(
						(hasUnread, notification) =>
							hasUnread || notification.unread,
						false
				  )
				: false;
		},
		systemInfo() {
			return this.$mcState('systemInfo', {
				version: ''
			});
		}
	},
	methods: {
		toggleSidebar() {
			this.$store.commit(
				'setShowSidebar',
				!this.$store.state.showSidebar
			);
		},
		hideSidebarOnMobile() {
			if (document.body.clientWidth < 768) {
				this.$store.commit(
					'setShowSidebar',
					false
				);
			}
		}
	}
};
</script>
