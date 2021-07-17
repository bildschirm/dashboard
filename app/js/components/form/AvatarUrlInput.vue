<template>
	<div class="flex gap-3">
		<TextInput
			type="url"
			v-bind="{
				...$props,
				...$attrs,
			}"
			v-on="listeners"
			:loading="loading"
		/>
		<div
			class="flex-shrink-0 w-10 h-10 bg-purple-700  rounded-full overflow-hidden"
		>
			<img :src="value" />
		</div>
	</div>
</template>

<script>
import TextInput from './TextInput';

export default {
	components: {
		TextInput,
	},
	props: {
		value: {
			type: String,
			default: '',
		},
		loading: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		listeners() {
			return {
				...this.$listeners,
			};
		},
	},
	methods: {},
};
</script>

<style></style>
