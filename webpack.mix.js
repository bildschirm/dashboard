const path = require('path');
const fs = require('fs/promises');
const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');
const themeColors = require('tailwindcss/colors');
const autoprefixer = require('autoprefixer');


require('laravel-mix-polyfill');

const outputFolder =
	process.env.NODE_ENV === 'production'
		? 'dist/production'
		: 'dist/development';

mix.setPublicPath(outputFolder)
	.sass('app/css/index.scss', 'css')
	.options({
		processCssUrls: false,
		postCss: [tailwindcss, autoprefixer],
	})
	.js('app/js/index.js', 'js')
	.options({
		legacyNodePolyfills: true,
	})
	.sourceMaps(false, 'eval-source-map')
	.vue({ version: '2' })
	.version()
	// .browserSync('http://localhost:3000')
	.webpackConfig({
		output: {
			publicPath: '/assets/',
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'app'),
				'@components': path.resolve(__dirname, 'app/js/components'),
				'@form': path.resolve(__dirname, 'app/js/components/form'),
				'@socket': path.resolve(__dirname, 'app/js/socket'),
				'@vue': path.resolve(__dirname, 'app/js/vue'),
				'@pages': path.resolve(__dirname, 'app/js/pages'),
				'@helpers': path.resolve(__dirname, 'app/js/helpers'),
				'@config': path.resolve(__dirname, 'app/js/config'),
				'@api': path.resolve(__dirname, 'app/js/api'),
				'@plugin-api': path.resolve(__dirname, 'app/js/plugin-api'),
			},
			fallback: {
				buffer: require.resolve('buffer'),
				process: require.resolve('process/browser'),
			},
		},
	})
	// .polyfill({
	// 	enabled: true,
	// 	useBuiltIns: "entry",
	// 	entryPoints: 'stable',
	// 	corejs: 3,
	// 	targets: false,
	// 	"loose": true
	// })
	.after(async () => {
		await fs.copyFile('app/static/themes.json', path.resolve(outputFolder, './themes.json'));
	});
