<template>
	<div 
		class="relative" 
		ref="jsonEditor"
	></div>
</template>
<script type="text/javascript">
	import CodeFlask from 'codeflask';

	export default {
		props: {
			value: {
				type: String,
				default: ''
			}
		},
		mounted() {
			this.flask = new CodeFlask(this.$refs.jsonEditor, { language: 'json', defaultTheme: false });
			this.flask.addLanguage('json', {
				'property': {
					pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
					lookbehind: true,
					greedy: true
				},
				'string': {
					pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
					lookbehind: true,
					greedy: true
				},
				'comment': {
					pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
					greedy: true
				},
				'number': /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
				'punctuation': /[{}[\],]/,
				'operator': /:/,
				'boolean': /\b(?:true|false)\b/,
				'null': {
					pattern: /\bnull\b/,
					alias: 'keyword'
				}
			});

			this.flask.onUpdate(code => {
				this.$emit('input', code);
			});

			this.flask.updateCode(this.value);
		},
		watch: {
			value() {
				this.flask.updateCode(this.value);
			}
		},
	}
</script>
<style lang="scss">

</style>