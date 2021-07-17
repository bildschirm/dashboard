<template>
	<div
		class="relative w-full min-h-24 h-40 font-mono rounded-lg bg-purple-700 border-2 border-purple-700 hover:border-purple-500 overflow-hidden focus-within:border-purple-500 px-2 py-1"
		ref="jsonEditor"
	></div>
</template>
<script type="text/javascript">
import CodeFlask from 'codeflask';
import Prism from 'prismjs';

export default {
	props: {
		lang: {
			type: String,
			default: 'json',
		},
		value: {
			type: String,
			default: '',
		},
		readonly: {
			type: Boolean,
			default: false,
		},
	},
	mounted() {
		this.flask = new CodeFlask(this.$refs.jsonEditor, {
			language: this.lang,
			defaultTheme: false,
			readonly: this.readonly,
		});
		this.flask.addLanguage('html', Prism.languages.html);
		this.flask.addLanguage('json', {
			property: {
				pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
				lookbehind: true,
				greedy: true,
			},
			string: {
				pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
				lookbehind: true,
				greedy: true,
			},
			comment: {
				pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
				greedy: true,
			},
			number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
			punctuation: /[{}[\],]/,
			operator: /:/,
			boolean: /\b(?:true|false)\b/,
			null: {
				pattern: /\bnull\b/,
				alias: 'keyword',
			},
		});

		this.flask.onUpdate((code) => {
			this.$emit('input', code);
		});

		this.flask.updateCode(this.value);
	},
	watch: {
		value() {
			this.flask.updateCode(this.value);
		},
	},
};
</script>
<style lang="scss"></style>
