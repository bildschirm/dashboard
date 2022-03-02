<template>
	<div class="flex flex-col items-center justify-center ">
		<spinner-icon 
			class="text-primary-600 fill-current w-16 animate-spin mb-10"
		/>

		<div class="text-primary-600 font-web-safe-mono">
			&nbsp;&nbsp;&nbsp;Booting Bildschirm<span v-html="dots"></span>
		</div>
	</div>
</template>
<script type="text/javascript">
	import spinnerIcon from '@components/icons/spinner-icon';

	export default {
		components: {
			spinnerIcon
		},
		data: () => ({
			dots: '&nbsp;&nbsp;&nbsp;'
		}),
		created() {
			this.interval = setInterval(() => {
				if (this.dots === '...') {
					this.dots = '&nbsp;&nbsp;&nbsp;';
				} else {
					this.dots = this.dots.replace(/&nbsp;/, '.');
				}
			}, 600);
		},
		destroy() {
			clearInterval(this.interval);
		}
	};
</script>