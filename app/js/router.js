import Vue from 'vue';
import VueRouter from 'vue-router';

import loading from '@pages/loading/index.vue';
import dashboard from '@pages/dashboard/index.vue';
import spotify from '@pages/spotify/index.vue';
import statistics from '@pages/statistics/index.vue';
import statisticsStateBrowser from '@pages/statistics-state-browser/index.vue';
import notifications from '@pages/notifications/index.vue';
import kodi from '@pages/kodi/index.vue';
import files from '@pages/files/index.vue';
import youtubeDownloader from '@pages/youtube-downloader/index.vue';
import settings from '@pages/settings/index.vue';

export const routes = [
	{ 
		path: '/', 
		component: dashboard, 
		name: 'dashboard', 
		meta: { title: 'Dashboard', icon: 'home-icon', menu: 100, exact: true }
	},
	{ 
		path: '/kodi',
		component: kodi,
		meta: { title: 'Kodi' }
	},
	{
		path: '/files', 
		component: files, 
		name: 'files', 
		meta: { title: 'Filebrowser', icon: 'files-icon', menu: 400 }
	},
	{ 
		path: '/youtube-downloader', 
		component: youtubeDownloader, 
		name: 'youtube-downloader', 
		meta: { title: 'YouTube Downloader', icon: 'youtube-icon', menu: 300 }
	},
	{ 
		path: '/telemetry', 
		component: statistics, 
		name: 'telemetry', 
		meta: { title: 'Telemetry', icon: 'death-star-icon', menu: 1000, iconOptions: { primary: 'text-main-dark', secondary: 'text-main' } }
	},
	{ 
		path: '/telemetry/inspect-state',
		component: statisticsStateBrowser,
		name: 'statistics-state-browser',
		meta: { title: 'Telemetry', subtitle: 'Inspect State' } 
	},
	{ 
		path: '/notifications',
		component: notifications,
		name: 'notifications',
		meta: { title: 'Notifications' }
	},
	{ 
		path: '/settings',
		component: settings,
		name: 'settings',
		meta: { title: 'Settings', subtitle: 'Profile' }
	}
];

Vue.use(VueRouter);

export const router = new VueRouter({
	routes
});
