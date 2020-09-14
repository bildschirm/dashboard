<template>
	<div class="bg-main-dark px-3 py-2 rounded text-sm">
		<a class="no-underline mb-3 block" href="#">
			<span class="block text-main-lightest">Homepage</span>
			<span class="text-sm text-main-light">https://mateffy.me</span>
		</a>

		<a class="no-underline block" href="#">
			<span class="block text-main-lightest">Hacker News</span>
			<span class="text-sm text-main-light">https://news.ycombinator.com</span>
		</a>

		
	</div>
</template>

<script type="text/javascript">
export default {
	computed: {
		systemInfo() {
			return this.$mcState('systemInfo', {
				system: {},
				os: {},
				cpu: {},
				memory: {},
				network: {
					publicIPv4: '-',
					internalIPv4: '-'
				}
			});
		}
	}
};
</script>