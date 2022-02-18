<template>
	<select class="forms-select" :name="name" :id="name" :value="value" @input="onInput">
		<slot></slot>
	</select>
</template>

<script>
export default {
	props: {
		value: {
			type: String,
			default: '',
		},
		type: {
			type: String,
			default: 'text',
		},
		value: {
			type: String,
		},
		name: {
			type: String,
		},
		loading: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		required: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		listeners() {
			return {
				...this.$listeners,
				input: this.onInput.bind(this),
			};
		},
	},
	methods: {
		onBlur(e) {
			e.target.reportValidity();
		},
		onInput(e) {
			this.$emit('input', e.target.value);
		},
	},
};
</script>

<style></style>
