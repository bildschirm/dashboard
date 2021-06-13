module.exports = {
	mode: 'jit',
	purge: [
		'./app/**/*.html',
		'./app/**/*.js',
		'./app/**/*.vue',
		'../mission-control/app/**/*.html',
		'../mission-control/app/**/*.js',
		'../mission-control/app/**/*.vue',
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			width: {
				'1/10': '10%'
			},
			colors: {
				main: {
					darkest: '#252436',
					darker: '#2c2b3f',
					dark: '#3d3c5a',
					DEFAULT: '#56547f',
					light: '#9592de',
					lighter: '#bab7ec',
					lightest: '#e6e8ff',
				},
				purple: {
					'750': 'rgb(200, 37, 200)'
				}
			},
			fontFamily: {
				sans: [
					'Open Sans',
					'system-ui',
					'BlinkMacSystemFont',
					'-apple-system',
					'Segoe UI',
					'Roboto',
					'Oxygen',
					'Ubuntu',
					'Cantarell',
					'Droid Sans',
					'Helvetica Neue',
					'sans-serif'
				],
				mono: [
					'Jetbrains Mono',
					'Menlo',
					'Monaco',
					'Consolas',
					'Liberation Mono',
					'Courier New',
					'monospace'
				],
				'web-safe-mono': [
					'Menlo',
					'Monaco',
					'Consolas',
					'Liberation Mono',
					'Courier New',
					'monospace'
				]
			},
			minWidth: {
				'2': '.75rem'
			},
			height: {
				'1/2': '50%',
				'1/3': '33.33333%'
			},
			margin: {
				'px': '1px',
				'1/10': '10%'
			},
			borderWidth: {
				'3': '3px',
			},
			borderRadius: {
				'4xl': '3rem'
			},
			rotate: {
				'270': '270deg'
			},
			minWidth: {
				'24': '6rem'
			},
			minHeight: {
				'24': '6rem'
			},
			boxShadow: {
				'active-glow': '0 2px 20px -3px rgba(139, 92, 246, 0.63)'
			},
			animation: {
				'fade-in': 'fade-in 1s ease-out'
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				}
			}
		},
	},
	variants: {
		extend: {
			'backgroundColor': ['responsive', 'hover', 'focus', 'active'],
			'borderColor': ['responsive', 'hover', 'focus'],
			'opacity': ['responsive', 'hover', 'group-hover'],
			'fontWeight': ['responsive', 'hover', 'focus'],
			'boxShadow': ['responsive', 'hover', 'focus'],
			'textColor': ['responsive', 'hover', 'focus'],
			scale: ['responsive', 'active', 'group-hover']
		},
	},
	plugins: [],
};
