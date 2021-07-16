<template>
	<label :for="name" class="forms-label">
		<span class="block mb-2">{{ label }}</span>

		<slot :class="'mt-2'"> </slot>
	</label>
</template>

<script>
export default {
	props: {
		label: {
			type: String,
		},
		name: {
			type: String,
		},
	},
};
</script>
