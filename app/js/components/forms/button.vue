<template>
	<button class="forms-button relative" :disabled="loading">
		<loading v-if="loading" class="absolute inset-0 text-purple-400" icon-class="w-5" />
		<div :class="{ 'opacity-0': loading }">
			<slot />
		</div>
	</button>
</template>
<script type="text/javascript">
export default {
	props: {
		loading: {
			type: Boolean,
			default: false
		}
	}
}
</script>