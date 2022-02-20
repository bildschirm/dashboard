#!/usr/bin/env node
const path = require('path');
const fs = require('fs/promises');
const colors = require('tailwindcss/colors');

let themes = {
	...colors,
};

delete themes['black'];
delete themes['white'];

for (const theme of Object.keys(themes)) {
	themes[`${theme}-light`] = darkToLightTheme(themes[theme]);
}

function darkToLightTheme(theme) {
	let newTheme = {};

	const lookup = {
		'50': '900',
		'100': '800',
		'200': '700',
		'300': '600',
		'400': '500',
		'500': '400',
		'600': '300',
		'700': '200',
		'800': '100',
		'900': '50',
	};

	for (const shade of Object.keys(theme)) {
		console.log(shade, lookup[shade], theme[shade]);
		newTheme[lookup[shade]] = theme[shade];
	}

	return newTheme;
}

function colorToTheme(color, name) {
	let css = '';

	for (const num in color) {
		css += `	--theme-${name}-${num}: ${color[num]}; \n`;
	}

	return css;
}

function generateThemesCSS(colors) {
	let css = '';

	for (const theme in themes) {
		css += `.theme-toggler.theme-${theme} {\n${colorToTheme(
			colors[theme],
			'primary'
		)}\n}\n\n`;
	}

	return css;
}

async function main() {
	const themeFile = path.resolve(__dirname, '../app/css/theme-colors.scss');
	const themeListFile = path.resolve(__dirname, '../app/static/themes.json');

	console.log('Writing ' + themeFile);
	await fs.writeFile(themeFile, generateThemesCSS(themes));

	console.log('Writing ' + themeListFile);
	await fs.writeFile(themeListFile, JSON.stringify(themes, null, 2));
}

main().catch(console.error.bind(console));
