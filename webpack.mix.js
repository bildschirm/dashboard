const path = require('path');
const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer');

const outputFolder =
	process.env.NODE_ENV === 'production'
		? 'dist/production'
		: 'dist/development';

mix.sass('app/css/index.scss', outputFolder)
	.options({
		processCssUrls: false,
		postCss: [tailwindcss, autoprefixer]
	})
	.js('app/js/index.js', outputFolder)
	.options({
		legacyNodePolyfills: true
	})
	.sourceMaps(false, 'eval-source-map')
	.vue({ version: '2' })
	.webpackConfig({
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'app/js'),
				'@components': path.resolve(__dirname, 'app/js/components'),
				'@socket': path.resolve(__dirname, 'app/js/socket'),
				'@vue': path.resolve(__dirname, 'app/js/vue'),
				'@pages': path.resolve(__dirname, 'app/js/pages'),
				'@helpers': path.resolve(__dirname, 'app/js/helpers'),
				'@config': path.resolve(__dirname, 'app/js/config'),
				'@api': path.resolve(__dirname, 'app/js/api')
			},
			fallback: {
				buffer: require.resolve('buffer'),
				process: require.resolve('process/browser')
			}
		}
	});
