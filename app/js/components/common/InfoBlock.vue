<template>
	<section class="font-semibold">
		<div class="text-primary-50 text-lg truncate">
			<slot></slot>
		</div>
		<div class="text-primary-400 text-xs">
			{{ label }}
		</div>
	</section>
</template>
<script>
export default {
	props: {
		label: {
			type: String,
			required: true,
		},
	},
};
</script>
