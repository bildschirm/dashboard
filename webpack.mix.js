const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

const outputFolder = process.env.NODE_ENV === 'production' ? 'dist' : 'public';

mix.sass('src/css/index.scss', outputFolder)
	.options({
		processCssUrls: false,
		postCss: [tailwindcss('./tailwind.js')]
	})
	.js('src/js/index.js', outputFolder)
	.webpackConfig({
		resolve: {
			alias: {
				'@components': path.resolve(__dirname, 'src/js/components'),
				'@socket': path.resolve(__dirname, 'src/js/socket'),
				'@vue': path.resolve(__dirname, 'src/js/vue'),
				'@pages': path.resolve(__dirname, 'src/js/pages'),
				'@helpers': path.resolve(__dirname, 'src/js/helpers'),
				'@config': path.resolve(__dirname, 'src/js/config')
			}
		}
	});
