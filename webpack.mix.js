const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

const outputFolder =
	process.env.NODE_ENV === 'production'
		? 'dist/production'
		: 'dist/development';

mix.sass('app/css/index.scss', outputFolder)
	.options({
		processCssUrls: false,
		postCss: [tailwindcss('./tailwind.js')]
	})
	.js('app/js/index.js', outputFolder)
	.webpackConfig({
		resolve: {
			alias: {
				'@components': path.resolve(__dirname, 'app/js/components'),
				'@socket': path.resolve(__dirname, 'app/js/socket'),
				'@vue': path.resolve(__dirname, 'app/js/vue'),
				'@pages': path.resolve(__dirname, 'app/js/pages'),
				'@helpers': path.resolve(__dirname, 'app/js/helpers'),
				'@config': path.resolve(__dirname, 'app/js/config')
			}
		}
	});
