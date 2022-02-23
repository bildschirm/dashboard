<template>
	<article
		class="relative bg-transparent border border-primary-800 px-5 py-4 rounded-xl rounded-2xl  overflow-hidden"
	>
		<div class="absolute -inset-3 bg-primary-900 opacity-70 filter blur-lg" style="z-index: -1;"></div>
		<slot />
	</article>
</template>

<script>
export default {};
</script>
