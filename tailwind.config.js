module.exports = {
	purge: [
		'./app/**/*.html',
		'./app/**/*.js',
		'../mission-control/app/**/*.html',
		'../mission-control/app/**/*.js'
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
				]
			},
			minWidth: {
				"2": ".75rem"
			},
			height: {
				"1/2": "50%",
				"1/3": "33.33333%"
			},
			margin: {
				"px": "1px",
				"1/10": "10%"
			},
			borderWidth: {
				'3': '3px',
			}
		},
	},
	variants: {
		extend: {
			"backgroundColor": ["responsive", "hover", "focus"],
			"borderColor": ["responsive", "hover", "focus"],
			"opacity": ["responsive", "hover", "group-hover"],
			"fontWeight": ["responsive", "hover", "focus"],
			"boxShadow": ["responsive", "hover", "focus"],
			"textColor": ["responsive", "hover", "focus"],
			"width": ["responsive"]
		},
	},
	plugins: [],
};
