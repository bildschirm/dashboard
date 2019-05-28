/**
 * The config module is just a simple config file.
 *
 * @module @config
 */

/**
 * The config that is exported.
 * @property {string} missionControlUrl The URL where Mission Control is accessible by.
 * @property {string} socketUrl The URL the socket should connect to, most likely the same as missionControlUrl.
 */
export default {
	missionControlUrl:
		process.env.NODE_ENV === 'production'
			? 'http://home.mateffy.test:3000'
			: 'http://home.mateffy.test:3000',
	socketUrl:
		process.env.NODE_ENV === 'production'
			? 'http://home.mateffy.test:3000'
			: 'http://home.mateffy.test:3000'
};
