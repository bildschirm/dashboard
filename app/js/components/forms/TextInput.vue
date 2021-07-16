<template>
	<input
		:type="type"
		class="forms-input-text"
		:placeholder="placeholder"
		:aria-placeholder="placeholder"
		v-model="value"
		:disabled="loading || disabled"
		required="required"
		@blur="onBlur"
		v-bind="{ ...$props, ...$attrs }"
		v-on="$listeners"
	/>
</template>

<script>
import Label from './Label';

export default {
	components: {
		Label,
	},
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
			required: true,
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
	methods: {
		onBlur(e) {
			e.target.reportValidity();
		},
	},
};
</script>

<style></style>
