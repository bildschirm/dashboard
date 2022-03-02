/**
 * The config module is just a simple config file.
 *
 * @module @config
 */

/**
 * The config that is exported.
 * @property {string} bildschirmUrl The URL where Bildschirm is accessible by.
 * @property {string} socketUrl The URL the socket should connect to, most likely the same as bildschirmUrl.
 */
export default {
	bildschirmUrl: window.BILDSCHIRM_URL,
	socketUrl: window.BILDSCHIRM_URL
};
