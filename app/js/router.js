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

const routes = [
	{ path: '/', component: dashboard },
	{ path: '/spotify', component: spotify },
	{ path: '/statistics', component: statistics },
	{ path: '/statistics/browse', component: statisticsStateBrowser },
	{ path: '/notifications', component: notifications },
	{ path: '/kodi', component: kodi },
	{ path: '/files', component: files },
	{ path: '/youtube-downloader', component: youtubeDownloader }
];

Vue.use(VueRouter);

export default new VueRouter({
	routes
});
