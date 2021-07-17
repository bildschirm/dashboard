<template>
	<section class="font-semibold">
		<div class="text-purple-50 text-lg">
			<slot></slot>
		</div>
		<div class="text-purple-400 text-xs">
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
