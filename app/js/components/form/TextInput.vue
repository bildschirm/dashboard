<template>
	<input
		:type="type"
		:name="name"
		:id="name"
		class="forms-input-text"
		:placeholder="placeholder"
		:aria-placeholder="placeholder"
		@blur="onBlur"
		v-bind="{ ...$props, ...$attrs }"
		v-on="listeners"
		:disabled="loading || disabled"
		:value="value"
	/>
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
		placeholder: {
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
